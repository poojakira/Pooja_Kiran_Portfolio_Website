import argparse
import json
import math
import os
from pathlib import Path

import bpy
from mathutils import Vector


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-dir", required=True)
    parser.add_argument("--output-dir", required=True)
    return parser.parse_args(__import__("sys").argv[__import__("sys").argv.index("--") + 1:])


ARGS = parse_args()
SRC = Path(ARGS.source_dir)
OUT = Path(ARGS.output_dir)
OUT.mkdir(parents=True, exist_ok=True)


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def smooth_meshes():
    for obj in bpy.context.scene.objects:
        if obj.type == "MESH":
            for poly in obj.data.polygons:
                poly.use_smooth = True


def import_fbx(path: Path):
    try:
        bpy.ops.import_scene.fbx(filepath=str(path))
    except Exception:
        bpy.ops.wm.fbx_import(filepath=str(path))


def bbox_world(objects):
    points = []
    for obj in objects:
        if obj.type != "MESH":
            continue
        for corner in obj.bound_box:
            points.append(obj.matrix_world @ Vector(corner))
    if not points:
        return Vector((0, 0, 0)), Vector((1, 1, 1))
    lo = Vector((min(p.x for p in points), min(p.y for p in points), min(p.z for p in points)))
    hi = Vector((max(p.x for p in points), max(p.y for p in points), max(p.z for p in points)))
    return lo, hi


def fit_root(root, objects, target_height):
    bpy.context.view_layer.update()
    lo, hi = bbox_world(objects)
    height = max(0.001, hi.z - lo.z)
    scale = target_height / height
    root.scale = (scale, scale, scale)
    bpy.context.view_layer.update()
    lo2, hi2 = bbox_world(objects)
    center_x = (lo2.x + hi2.x) * 0.5
    center_y = (lo2.y + hi2.y) * 0.5
    root.location.x -= center_x
    root.location.y -= center_y
    root.location.z -= lo2.z
    bpy.context.view_layer.update()


def parent_top_level(root, objects):
    for obj in objects:
        if obj == root:
            continue
        if obj.parent is None:
            world = obj.matrix_world.copy()
            obj.parent = root
            obj.matrix_world = world


def select_hierarchy(root):
    bpy.ops.object.select_all(action="DESELECT")
    stack = [root]
    while stack:
        obj = stack.pop()
        obj.select_set(True)
        stack.extend(list(obj.children))
    bpy.context.view_layer.objects.active = root


def resize_images(max_size=1024):
    for image in list(bpy.data.images):
        if not image or image.size[0] <= 0 or image.size[1] <= 0:
            continue
        w, h = image.size[0], image.size[1]
        if max(w, h) <= max_size:
            continue
        factor = max_size / max(w, h)
        image.scale(max(1, int(w * factor)), max(1, int(h * factor)))


def new_neutral_material(name, color=(0.08, 0.09, 0.095, 1)):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Metallic"].default_value = 0.25
    bsdf.inputs["Roughness"].default_value = 0.38
    return mat


def remove_car_branding():
    neutral = new_neutral_material("TrustNeutralBrandPanel", (0.055, 0.065, 0.07, 1))
    for obj in bpy.context.scene.objects:
        if obj.type != "MESH":
            continue
        for idx, slot in enumerate(obj.material_slots):
            mat = slot.material
            if not mat:
                continue
            name = mat.name.lower()
            branded = any(token in name for token in ("khronos", "license", "logo", "badge", "plate"))
            if mat.use_nodes:
                for node in list(mat.node_tree.nodes):
                    if node.type == "TEX_IMAGE" and node.image:
                        iname = node.image.name.lower()
                        if any(token in iname for token in ("khronos", "logo", "license")):
                            branded = True
            if branded:
                obj.material_slots[idx].material = neutral
                continue

            if "paint" in name:
                bsdf = mat.node_tree.nodes.get("Principled BSDF") if mat.use_nodes else None
                if bsdf:
                    bsdf.inputs["Base Color"].default_value = (0.035, 0.045, 0.05, 1)
                    bsdf.inputs["Metallic"].default_value = 0.72
                    bsdf.inputs["Roughness"].default_value = 0.18
                    if "Coat Weight" in bsdf.inputs:
                        bsdf.inputs["Coat Weight"].default_value = 0.85
                    if "Coat Roughness" in bsdf.inputs:
                        bsdf.inputs["Coat Roughness"].default_value = 0.08


def render_preview(root, output_path, target=(0, 0, 0.9), camera=(5.2, -7.8, 3.2)):
    bpy.ops.mesh.primitive_plane_add(size=30, location=(0, 0, -0.01))
    floor = bpy.context.object
    floor.name = "PreviewFloor"
    floor_mat = new_neutral_material("PreviewFloorMat", (0.06, 0.065, 0.065, 1))
    floor.data.materials.append(floor_mat)

    bpy.ops.object.light_add(type="AREA", location=(4, -4, 7))
    key = bpy.context.object
    key.data.energy = 1100
    key.data.shape = "DISK"
    key.data.size = 5
    key.data.color = (1.0, 0.86, 0.68)

    bpy.ops.object.light_add(type="AREA", location=(-4, -1, 4))
    fill = bpy.context.object
    fill.data.energy = 650
    fill.data.size = 4
    fill.data.color = (0.55, 0.72, 0.92)

    bpy.ops.object.light_add(type="AREA", location=(0, 5, 3))
    rim = bpy.context.object
    rim.data.energy = 700
    rim.data.size = 3
    rim.data.color = (0.72, 0.82, 1.0)

    bpy.ops.object.camera_add(location=camera)
    cam = bpy.context.object
    direction = Vector(target) - cam.location
    cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    cam.data.lens = 58
    bpy.context.scene.camera = cam

    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE"
    scene.render.resolution_x = 1200
    scene.render.resolution_y = 900
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.filepath = str(output_path)
    scene.view_settings.look = "AgX - Medium High Contrast"
    bpy.ops.render.render(write_still=True)

    bpy.data.objects.remove(floor, do_unlink=True)
    bpy.data.objects.remove(key, do_unlink=True)
    bpy.data.objects.remove(fill, do_unlink=True)
    bpy.data.objects.remove(rim, do_unlink=True)
    bpy.data.objects.remove(cam, do_unlink=True)


def export_glb(root, output_path):
    select_hierarchy(root)
    bpy.ops.export_scene.gltf(
        filepath=str(output_path),
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_animations=True,
        export_yup=True,
    )


def build_car():
    reset_scene()
    car_source = SRC / "CarConcept.glb"
    bpy.ops.import_scene.gltf(filepath=str(car_source))
    imported = list(bpy.context.scene.objects)
    root = bpy.data.objects.new("TrustGrandTourer", None)
    bpy.context.collection.objects.link(root)
    parent_top_level(root, imported)

    remove_car_branding()
    resize_images(1024)
    smooth_meshes()
    fit_root(root, imported, 1.42)

    preview = OUT / "trust-grand-tourer-preview.png"
    render_preview(root, preview, target=(0, 0, 0.65), camera=(5.7, -8.8, 3.1))
    export_glb(root, OUT / "trust-grand-tourer.glb")


def configure_human_materials(texture_dir: Path):
    texture_paths = {
        "body_color": texture_dir / "f001_body_color.tga",
        "body_normal": texture_dir / "f001_body_normal.tga",
        "head_color": texture_dir / "f001_head_color.tga",
        "head_normal": texture_dir / "f001_head_normal.tga",
        "opacity": texture_dir / "f001_opacity_color.tga",
    }
    images = {}
    for key, path in texture_paths.items():
        if path.exists():
            images[key] = bpy.data.images.load(str(path), check_existing=True)
            if max(images[key].size) > 1024:
                w, h = images[key].size
                factor = 1024 / max(w, h)
                images[key].scale(max(1, int(w * factor)), max(1, int(h * factor)))

    for mat in bpy.data.materials:
        name = mat.name.lower()
        mat.use_nodes = True
        nodes = mat.node_tree.nodes
        links = mat.node_tree.links
        bsdf = nodes.get("Principled BSDF")
        if not bsdf:
            continue
        bsdf.inputs["Roughness"].default_value = 0.48
        if "Coat Weight" in bsdf.inputs:
            bsdf.inputs["Coat Weight"].default_value = 0.08

        if "head" in name and "head_color" in images:
            tex = nodes.new("ShaderNodeTexImage")
            tex.image = images["head_color"]
            links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
            if "head_normal" in images:
                normal_tex = nodes.new("ShaderNodeTexImage")
                normal_tex.image = images["head_normal"]
                normal_tex.image.colorspace_settings.name = "Non-Color"
                normal = nodes.new("ShaderNodeNormalMap")
                normal.inputs["Strength"].default_value = 0.45
                links.new(normal_tex.outputs["Color"], normal.inputs["Color"])
                links.new(normal.outputs["Normal"], bsdf.inputs["Normal"])

        elif "body" in name and "body_color" in images:
            tex = nodes.new("ShaderNodeTexImage")
            tex.image = images["body_color"]
            links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
            if "body_normal" in images:
                normal_tex = nodes.new("ShaderNodeTexImage")
                normal_tex.image = images["body_normal"]
                normal_tex.image.colorspace_settings.name = "Non-Color"
                normal = nodes.new("ShaderNodeNormalMap")
                normal.inputs["Strength"].default_value = 0.5
                links.new(normal_tex.outputs["Color"], normal.inputs["Color"])
                links.new(normal.outputs["Normal"], bsdf.inputs["Normal"])

        elif any(token in name for token in ("hair", "opacity", "lash", "brow")) and "opacity" in images:
            tex = nodes.new("ShaderNodeTexImage")
            tex.image = images["opacity"]
            links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
            if "Alpha" in tex.outputs and "Alpha" in bsdf.inputs:
                links.new(tex.outputs["Alpha"], bsdf.inputs["Alpha"])
            try:
                mat.surface_render_method = "DITHERED"
            except Exception:
                pass


def build_human():
    reset_scene()
    model_path = SRC / "Female_Adult_01.fbx"
    idle_path = SRC / "f_idle_breathe_01.max.fbx"

    import_fbx(model_path)
    model_objects = list(bpy.context.scene.objects)
    human_armature = next((o for o in model_objects if o.type == "ARMATURE"), None)

    configure_human_materials(SRC)
    resize_images(1024)
    smooth_meshes()

    imported_before_anim = set(bpy.context.scene.objects)
    import_fbx(idle_path)
    animation_objects = [o for o in bpy.context.scene.objects if o not in imported_before_anim]
    anim_armature = next((o for o in animation_objects if o.type == "ARMATURE" and o.animation_data and o.animation_data.action), None)

    if human_armature and anim_armature and anim_armature.animation_data and anim_armature.animation_data.action:
        action = anim_armature.animation_data.action.copy()
        action.name = "Idle"
        if not human_armature.animation_data:
            human_armature.animation_data_create()
        human_armature.animation_data.action = action

    for obj in animation_objects:
        bpy.data.objects.remove(obj, do_unlink=True)

    root = bpy.data.objects.new("RealisticFemaleGuide", None)
    bpy.context.collection.objects.link(root)
    parent_top_level(root, model_objects)
    fit_root(root, model_objects, 1.65)

    if human_armature and human_armature.animation_data and human_armature.animation_data.action:
        frame_start, frame_end = human_armature.animation_data.action.frame_range
        bpy.context.scene.frame_start = int(frame_start)
        bpy.context.scene.frame_end = int(frame_end)

    preview = OUT / "realistic-female-guide-preview.png"
    render_preview(root, preview, target=(0, 0, 0.9), camera=(2.5, -4.4, 1.75))
    export_glb(root, OUT / "realistic-female-guide.glb")


def write_manifest():
    manifest = {
        "vehicle": {
            "file": "trust-grand-tourer.glb",
            "source": "KhronosGroup/glTF-Sample-Assets CarConcept",
            "license": "CC-BY-4.0",
            "modifications": [
                "removed/replaced brand and license/logo materials",
                "dark graphite paint treatment",
                "web texture downscale",
            ],
        },
        "human": {
            "file": "realistic-female-guide.glb",
            "source": "Microsoft Rocketbox Female_Adult_01",
            "license": "MIT",
            "animation": "Rocketbox f_idle_breathe_01",
            "note": "Generic realistic female baseline; not a likeness of Pooja Kiran.",
        },
    }
    (OUT / "realistic-assets-manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")


build_car()
build_human()
write_manifest()
print("Built realistic web assets:", sorted(p.name for p in OUT.iterdir()))
