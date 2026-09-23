import bpy
import math
import os
import sys
import json
from mathutils import Vector

BLENDER_VERSION = bpy.app.version_string
REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
REF_IMAGE = os.path.join(REPO_ROOT, "public", "pooja-kiran.png")

def parse_args():
    args = sys.argv
    out = os.path.join(REPO_ROOT, "build", "avatar")
    if "--" in args:
        extra = args[args.index("--") + 1:]
        for i, value in enumerate(extra):
            if value == "--output-dir" and i + 1 < len(extra):
                out = os.path.abspath(extra[i + 1])
    os.makedirs(out, exist_ok=True)
    return out

OUT = parse_args()

def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablocks in (bpy.data.meshes, bpy.data.curves, bpy.data.materials, bpy.data.cameras, bpy.data.lights):
        pass

def mat(name, color, roughness=0.5, metallic=0.0):
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    return m

SKIN = mat("Skin", (0.50, 0.29, 0.20), 0.56, 0.0)
HAIR = mat("Hair", (0.045, 0.025, 0.02), 0.78, 0.0)
CLOTH = mat("SecurityCharcoal", (0.045, 0.055, 0.065), 0.62, 0.03)
CLOTH2 = mat("SecuritySlate", (0.10, 0.12, 0.14), 0.58, 0.02)
SHOE = mat("Shoes", (0.02, 0.024, 0.028), 0.45, 0.08)
WHITE = mat("Badge", (0.72, 0.78, 0.81), 0.44, 0.06)
EYE_WHITE = mat("EyeWhite", (0.75, 0.72, 0.68), 0.34, 0.0)
IRIS = mat("Iris", (0.075, 0.045, 0.03), 0.3, 0.0)
LIP = mat("Lips", (0.35, 0.11, 0.10), 0.5, 0.0)
ACCENT = mat("Accent", (0.10, 0.42, 0.68), 0.4, 0.12)

def smooth(obj):
    if hasattr(obj.data, "polygons"):
        for p in obj.data.polygons:
            p.use_smooth = True

def uv_sphere(name, loc, scale, material, segments=40, rings=24):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=rings, location=loc)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    smooth(obj)
    obj.data.materials.append(material)
    return obj

def rounded_box(name, loc, scale, material, bevel=0.08):
    bpy.ops.mesh.primitive_cube_add(location=loc)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    mod = obj.modifiers.new("SoftEdges", "BEVEL")
    mod.width = bevel
    mod.segments = 4
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=mod.name)
    obj.data.materials.append(material)
    return obj

def cylinder(name, loc, radius, depth, material, rotation=(0,0,0), vertices=32):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=loc, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    smooth(obj)
    obj.data.materials.append(material)
    return obj

def parent_bone(obj, arm_obj, bone_name):
    obj.parent = arm_obj
    obj.parent_type = "BONE"
    obj.parent_bone = bone_name
    obj.matrix_parent_inverse = arm_obj.matrix_world.inverted()

def add_reference_board():
    if not os.path.exists(REF_IMAGE):
        return None
    try:
        image = bpy.data.images.load(REF_IMAGE, check_existing=True)
        obj = bpy.data.objects.new("REFERENCE_PoojaPortrait", None)
        obj.empty_display_type = "IMAGE"
        obj.data = image
        obj.empty_display_size = 0.95
        obj.location = (1.35, 0.65, 1.28)
        obj.rotation_euler = (math.radians(90), 0, math.radians(180))
        obj.hide_render = True
        bpy.context.collection.objects.link(obj)
        return obj
    except Exception as exc:
        print("Reference board skipped:", exc)
        return None

def build_armature():
    arm = bpy.data.armatures.new("PoojaRig")
    rig = bpy.data.objects.new("PoojaRig", arm)
    bpy.context.collection.objects.link(rig)
    rig.show_in_front = True
    bpy.context.view_layer.objects.active = rig
    rig.select_set(True)
    bpy.ops.object.mode_set(mode="EDIT")

    bones = {}
    def eb(name, head, tail, parent=None, connected=False):
        b = arm.edit_bones.new(name)
        b.head = head
        b.tail = tail
        if parent:
            b.parent = bones[parent]
            b.use_connect = connected
        bones[name] = b
        return b

    eb("root", (0,0,0), (0,0,0.14))
    eb("pelvis", (0,0,0.84), (0,0,1.02), "root")
    eb("spine", (0,0,1.02), (0,0,1.25), "pelvis", True)
    eb("chest", (0,0,1.25), (0,0,1.42), "spine", True)
    eb("neck", (0,0,1.42), (0,0,1.50), "chest", True)
    eb("head", (0,0,1.50), (0,0,1.66), "neck", True)

    eb("upper_arm.L", (0.22,0,1.38), (0.44,0,1.17), "chest")
    eb("forearm.L", (0.44,0,1.17), (0.46,0,0.94), "upper_arm.L", True)
    eb("hand.L", (0.46,0,0.94), (0.46,0,0.84), "forearm.L", True)
    eb("upper_arm.R", (-0.22,0,1.38), (-0.44,0,1.17), "chest")
    eb("forearm.R", (-0.44,0,1.17), (-0.46,0,0.94), "upper_arm.R", True)
    eb("hand.R", (-0.46,0,0.94), (-0.46,0,0.84), "forearm.R", True)

    eb("thigh.L", (0.12,0,0.92), (0.14,0,0.53), "pelvis")
    eb("shin.L", (0.14,0,0.53), (0.14,0,0.14), "thigh.L", True)
    eb("foot.L", (0.14,0,0.14), (0.14,-0.12,0.07), "shin.L", True)
    eb("thigh.R", (-0.12,0,0.92), (-0.14,0,0.53), "pelvis")
    eb("shin.R", (-0.14,0,0.53), (-0.14,0,0.14), "thigh.R", True)
    eb("foot.R", (-0.14,0,0.14), (-0.14,-0.12,0.07), "shin.R", True)

    bpy.ops.object.mode_set(mode="POSE")
    for pb in rig.pose.bones:
        pb.rotation_mode = "XYZ"
    bpy.ops.object.mode_set(mode="OBJECT")
    return rig

def build_body(rig):
    parts = []

    pelvis = uv_sphere("Pelvis", (0,0,0.96), (0.20,0.15,0.17), CLOTH2)
    parent_bone(pelvis, rig, "pelvis"); parts.append(pelvis)

    torso = rounded_box("Torso", (0,0,1.22), (0.21,0.135,0.25), CLOTH, 0.12)
    torso.rotation_euler = (0,0,0)
    parent_bone(torso, rig, "spine"); parts.append(torso)

    chest = rounded_box("Chest", (0,0,1.38), (0.245,0.15,0.16), CLOTH, 0.10)
    parent_bone(chest, rig, "chest"); parts.append(chest)

    neck = cylinder("Neck", (0,0,1.48), 0.07, 0.11, SKIN)
    parent_bone(neck, rig, "neck"); parts.append(neck)

    head = uv_sphere("Head", (0,-0.005,1.61), (0.155,0.13,0.195), SKIN, 48, 32)
    parent_bone(head, rig, "head"); parts.append(head)

    # Hair cap and back volume
    hair_top = uv_sphere("HairTop", (0,0.013,1.69), (0.166,0.142,0.13), HAIR, 40, 24)
    parent_bone(hair_top, rig, "head"); parts.append(hair_top)
    hair_back = uv_sphere("HairBack", (0,0.085,1.56), (0.17,0.105,0.24), HAIR, 36, 22)
    parent_bone(hair_back, rig, "head"); parts.append(hair_back)

    # Facial features point toward negative Y (camera front)
    eye_z = 1.635
    for side, x in (("L", 0.054), ("R", -0.054)):
        ew = uv_sphere(f"EyeWhite.{side}", (x,-0.125,eye_z), (0.030,0.012,0.017), EYE_WHITE, 24, 16)
        parent_bone(ew, rig, "head"); parts.append(ew)
        iris = uv_sphere(f"Iris.{side}", (x,-0.138,eye_z), (0.010,0.006,0.010), IRIS, 18, 12)
        parent_bone(iris, rig, "head"); parts.append(iris)

    nose = uv_sphere("Nose", (0,-0.145,1.595), (0.024,0.028,0.037), SKIN, 24, 16)
    parent_bone(nose, rig, "head"); parts.append(nose)
    lips = rounded_box("Lips", (0,-0.144,1.548), (0.040,0.010,0.010), LIP, 0.012)
    parent_bone(lips, rig, "head"); parts.append(lips)

    # Arms
    for side, sign in (("L", 1), ("R", -1)):
        ua = uv_sphere(f"UpperArm.{side}", (0.33*sign,0,1.22), (0.09,0.085,0.25), CLOTH, 28, 18)
        ua.rotation_euler[1] = math.radians(-6*sign)
        parent_bone(ua, rig, f"upper_arm.{side}"); parts.append(ua)

        fa = uv_sphere(f"Forearm.{side}", (0.455*sign,0,1.02), (0.072,0.068,0.22), SKIN, 28, 18)
        parent_bone(fa, rig, f"forearm.{side}"); parts.append(fa)

        hand = uv_sphere(f"Hand.{side}", (0.46*sign,-0.005,0.88), (0.075,0.055,0.095), SKIN, 28, 18)
        parent_bone(hand, rig, f"hand.{side}"); parts.append(hand)

    # Legs
    for side, sign in (("L", 1), ("R", -1)):
        thigh = uv_sphere(f"Thigh.{side}", (0.13*sign,0,0.72), (0.125,0.115,0.30), CLOTH2, 30, 20)
        parent_bone(thigh, rig, f"thigh.{side}"); parts.append(thigh)

        shin = uv_sphere(f"Shin.{side}", (0.14*sign,0,0.34), (0.105,0.095,0.27), CLOTH2, 30, 20)
        parent_bone(shin, rig, f"shin.{side}"); parts.append(shin)

        foot = rounded_box(f"Foot.{side}", (0.14*sign,-0.075,0.075), (0.11,0.18,0.065), SHOE, 0.04)
        parent_bone(foot, rig, f"foot.{side}"); parts.append(foot)

    badge = rounded_box("SecurityBadge", (-0.10,-0.148,1.34), (0.040,0.010,0.060), WHITE, 0.01)
    parent_bone(badge, rig, "chest"); parts.append(badge)
    stripe = rounded_box("BadgeAccent", (-0.10,-0.161,1.355), (0.028,0.005,0.008), ACCENT, 0.004)
    parent_bone(stripe, rig, "chest"); parts.append(stripe)

    return parts

def key(pb, frame, rot=None, loc=None):
    if rot is not None:
        pb.rotation_euler = rot
        pb.keyframe_insert("rotation_euler", frame=frame)
    if loc is not None:
        pb.location = loc
        pb.keyframe_insert("location", frame=frame)

def make_action(rig, name, end_frame):
    action = bpy.data.actions.new(name)
    rig.animation_data_create()
    rig.animation_data.action = action
    bpy.context.scene.frame_start = 1
    bpy.context.scene.frame_end = end_frame
    return action

def animate(rig):
    # Idle
    idle = make_action(rig, "Idle", 60)
    chest = rig.pose.bones["chest"]
    head = rig.pose.bones["head"]
    key(chest, 1, (0,0,0))
    key(chest, 30, (math.radians(1.4),0,0))
    key(chest, 60, (0,0,0))
    key(head, 1, (0,0,math.radians(-1.0)))
    key(head, 30, (0,0,math.radians(1.0)))
    key(head, 60, (0,0,math.radians(-1.0)))

    # Walk
    walk = make_action(rig, "Walk", 25)
    for f, phase in ((1,1),(7,0),(13,-1),(19,0),(25,1)):
        a = 0.42 * phase
        l = 0.50 * phase
        key(rig.pose.bones["upper_arm.L"], f, (a,0,0))
        key(rig.pose.bones["upper_arm.R"], f, (-a,0,0))
        key(rig.pose.bones["thigh.L"], f, (-l,0,0))
        key(rig.pose.bones["thigh.R"], f, (l,0,0))
        key(rig.pose.bones["shin.L"], f, (0.22*max(0, phase),0,0))
        key(rig.pose.bones["shin.R"], f, (0.22*max(0, -phase),0,0))
        key(rig.pose.bones["pelvis"], f, loc=(0,0,0.012 if phase == 0 else 0))

    # Turn left/right
    left = make_action(rig, "TurnLeft", 30)
    key(rig.pose.bones["root"], 1, (0,0,0))
    key(rig.pose.bones["root"], 30, (0,0,math.radians(90)))

    right = make_action(rig, "TurnRight", 30)
    key(rig.pose.bones["root"], 1, (0,0,0))
    key(rig.pose.bones["root"], 30, (0,0,math.radians(-90)))

    # Stash actions in NLA so all clips export.
    rig.animation_data.action = None
    for action in (idle, walk, left, right):
        track = rig.animation_data.nla_tracks.new()
        track.name = action.name
        strip = track.strips.new(action.name, 1, action)
        strip.action_frame_start = 1
        strip.action_frame_end = action.frame_range[1]
        track.mute = False

def add_stage():
    floor_mat = mat("PreviewFloor", (0.028,0.032,0.038), 0.72, 0.08)
    bpy.ops.mesh.primitive_plane_add(size=8, location=(0,0,0))
    floor = bpy.context.object
    floor.name = "PreviewFloor"
    floor.data.materials.append(floor_mat)

    bpy.ops.object.light_add(type="AREA", location=(2.2,-2.0,3.4))
    key_light = bpy.context.object
    key_light.data.energy = 850
    key_light.data.shape = "DISK"
    key_light.data.size = 2.5
    key_light.rotation_euler = (math.radians(28),0,math.radians(38))

    bpy.ops.object.light_add(type="AREA", location=(-2.2,-0.8,2.2))
    fill = bpy.context.object
    fill.data.energy = 420
    fill.data.size = 2.0
    fill.rotation_euler = (math.radians(65),0,math.radians(-55))

    bpy.ops.object.light_add(type="AREA", location=(0,1.8,2.5))
    rim = bpy.context.object
    rim.data.energy = 500
    rim.data.size = 1.6
    rim.rotation_euler = (math.radians(-55),0,math.radians(180))

    bpy.ops.object.camera_add(location=(2.55,-4.0,1.72))
    cam = bpy.context.object
    bpy.context.scene.camera = cam
    direction = Vector((0,0,1.0)) - cam.location
    cam.rotation_euler = direction.to_track_quat("-Z","Y").to_euler()
    cam.data.lens = 58

def save_outputs(rig):
    blend_path = os.path.join(OUT, "pooja-avatar.blend")
    glb_path = os.path.join(OUT, "pooja-avatar.glb")
    preview_path = os.path.join(OUT, "pooja-avatar-preview.png")
    manifest_path = os.path.join(OUT, "pooja-avatar-manifest.json")

    bpy.context.scene.render.engine = "BLENDER_EEVEE"
    bpy.context.scene.render.resolution_x = 768
    bpy.context.scene.render.resolution_y = 1024
    bpy.context.scene.render.resolution_percentage = 100
    bpy.context.scene.render.image_settings.file_format = "PNG"
    bpy.context.scene.render.filepath = preview_path
    bpy.context.scene.render.film_transparent = False
    bpy.context.scene.world.color = (0.015,0.018,0.022)

    bpy.ops.wm.save_as_mainfile(filepath=blend_path)
    bpy.context.scene.frame_set(1)
    bpy.ops.render.render(write_still=True)

    # Select exportable avatar only; leave preview floor/lights/reference out.
    bpy.ops.object.select_all(action="DESELECT")
    rig.select_set(True)
    for obj in bpy.data.objects:
        if obj.parent == rig:
            obj.select_set(True)
    bpy.context.view_layer.objects.active = rig

    try:
        bpy.ops.export_scene.gltf(
            filepath=glb_path,
            export_format="GLB",
            use_selection=True,
            export_animations=True,
            export_skins=True,
            export_yup=True,
            export_apply=True,
        )
    except TypeError:
        bpy.ops.export_scene.gltf(
            filepath=glb_path,
            export_format="GLB",
            use_selection=True,
            export_animations=True,
            export_yup=True,
        )

    manifest = {
        "generated_by": f"Blender {BLENDER_VERSION}",
        "source_reference": "public/pooja-kiran.png",
        "likeness_scope": "best-effort single-photo reference; not an exact photogrammetry scan",
        "height_m": 1.63,
        "animations": ["Idle", "Walk", "TurnLeft", "TurnRight"],
        "files": {
            "blend": "pooja-avatar.blend",
            "glb": "pooja-avatar.glb",
            "preview": "pooja-avatar-preview.png",
        },
    }
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

def main():
    clear_scene()
    add_reference_board()
    rig = build_armature()
    build_body(rig)
    animate(rig)
    add_stage()
    save_outputs(rig)
    print("Avatar build complete:", OUT)

if __name__ == "__main__":
    main()
