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

OUT = parse_args()\nFACE_DATA = os.path.join(OUT, "pooja-face.json")

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
    # Preserve the object's world transform when attaching it to a bone.
    world = obj.matrix_world.copy()
    obj.parent = arm_obj
    obj.parent_type = "BONE"
    obj.parent_bone = bone_name
    bpy.context.view_layer.update()
    obj.matrix_world = world


def tapered_segment(name, start, end, r_start, r_end, material, elliptical_y=1.0):
    start = Vector(start)
    end = Vector(end)
    vec = end - start
    length = vec.length
    mid = (start + end) * 0.5
    bpy.ops.mesh.primitive_cone_add(
        vertices=40,
        radius1=r_start,
        radius2=r_end,
        depth=length,
        location=mid,
    )
    obj = bpy.context.object
    obj.name = name
    obj.rotation_mode = "QUATERNION"
    obj.rotation_quaternion = Vector((0,0,1)).rotation_difference(vec.normalized())
    if elliptical_y != 1.0:
        obj.scale.y = elliptical_y
        bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    mod = obj.modifiers.new("SoftBodyEdge", "BEVEL")
    mod.width = min(r_start, r_end) * 0.35
    mod.segments = 4
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=mod.name)
    smooth(obj)
    obj.data.materials.append(material)
    return obj

def tapered_vertical(name, z0, z1, r0, r1, y_scale, material):
    mid = (z0 + z1) * 0.5
    bpy.ops.mesh.primitive_cone_add(vertices=48, radius1=r0, radius2=r1, depth=(z1-z0), location=(0,0,mid))
    obj = bpy.context.object
    obj.name = name
    obj.scale.y = y_scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    mod = obj.modifiers.new("TailoredSoftEdges", "BEVEL")
    mod.width = 0.025
    mod.segments = 4
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=mod.name)
    smooth(obj)
    obj.data.materials.append(material)
    return obj

def make_hair_cap(name, loc, scale, material):
    obj = uv_sphere(name, loc, scale, material, 48, 28)
    # Remove the lower front volume so the hair reads as a cap rather than a helmet.
    import bmesh
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    doomed = [v for v in bm.verts if v.co.z < -0.025 and v.co.y < 0.02]
    bmesh.ops.delete(bm, geom=doomed, context="VERTS")
    bm.to_mesh(obj.data)
    bm.free()
    return obj

def face_reference_material(name):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    if os.path.exists(REF_IMAGE):
        image = bpy.data.images.load(REF_IMAGE, check_existing=True)
        tex = m.node_tree.nodes.new("ShaderNodeTexImage")
        tex.image = image
        tex.interpolation = "Linear"
        m.node_tree.links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.50
    return m

def add_reconstructed_face(rig):
    if not os.path.exists(FACE_DATA) or not os.path.exists(REF_IMAGE):
        return None
    try:
        with open(FACE_DATA, "r", encoding="utf-8") as handle:
            data = json.load(handle)
        pts = data.get("landmarks", [])
        tris = data.get("triangles", [])
        if len(pts) < 400 or not tris:
            return None

        xs = sorted(p[0] for p in pts)
        ys = sorted(p[1] for p in pts)
        xmin, xmax = xs[8], xs[-9]
        ymin, ymax = ys[8], ys[-9]
        xmid = (xmin + xmax) * 0.5
        ymid = (ymin + ymax) * 0.5
        xspan = max(1e-6, xmax - xmin)
        yspan = max(1e-6, ymax - ymin)

        verts = []
        uvs = []
        for x, y, z in pts:
            vx = (x - xmid) / xspan * 0.185
            vz = 1.505 - (y - ymid) / yspan * 0.235
            vy = -0.094 + z * 0.050
            verts.append((vx, vy, vz))
            uvs.append((x, 1.0 - y))

        mesh = bpy.data.meshes.new("ReconstructedFaceMesh")
        mesh.from_pydata(verts, [], [tuple(t) for t in tris])
        mesh.update()
        uv_layer = mesh.uv_layers.new(name="UVMap")
        for poly in mesh.polygons:
            for loop_index in poly.loop_indices:
                vertex_index = mesh.loops[loop_index].vertex_index
                uv_layer.data[loop_index].uv = uvs[vertex_index]

        obj = bpy.data.objects.new("ReconstructedFace", mesh)
        bpy.context.collection.objects.link(obj)
        smooth(obj)
        obj.data.materials.append(face_reference_material("ReconstructedFaceMaterial"))
        parent_bone(obj, rig, "head")
        return obj
    except Exception as exc:
        print("Reconstructed face skipped:", exc)
        return None

def add_face_decal(rig):
    if not os.path.exists(REF_IMAGE):
        return None
    try:
        image = bpy.data.images.load(REF_IMAGE, check_existing=True)
        seg = 48
        rx, rz = 0.082, 0.105
        verts = [(0,0,0)]
        faces = []
        u0,u1 = 0.31,0.69
        v0,v1 = 0.36,0.78
        uvs = [((u0+u1)/2, (v0+v1)/2)]
        for i in range(seg):
            a = 2*math.pi*i/seg
            verts.append((rx*math.cos(a), 0, rz*math.sin(a)))
            uvs.append(((u0+u1)/2 + (u1-u0)*0.5*math.cos(a),
                        (v0+v1)/2 + (v1-v0)*0.5*math.sin(a)))
        for i in range(seg):
            faces.append((0, i+1, ((i+1)%seg)+1))
        mesh = bpy.data.meshes.new("FaceReferenceMesh")
        mesh.from_pydata(verts, [], faces)
        mesh.update()
        uv_layer = mesh.uv_layers.new(name="UVMap")
        for poly in mesh.polygons:
            for loop_index in poly.loop_indices:
                vi = mesh.loops[loop_index].vertex_index
                uv_layer.data[loop_index].uv = uvs[vi]
        obj = bpy.data.objects.new("FaceReferenceDecal", mesh)
        bpy.context.collection.objects.link(obj)
        obj.location = (0, -0.104, 1.505)
        obj.rotation_euler = (math.radians(90), 0, 0)
        obj.data.materials.append(face_reference_material("FaceFallbackMaterial"))
        parent_bone(obj, rig, "head")
        return obj
    except Exception as exc:
        print("Face decal skipped:", exc)
        return None

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

    eb("root", (0,0,0), (0,0,0.12))
    eb("pelvis", (0,0,0.82), (0,0,0.97), "root")
    eb("spine", (0,0,0.97), (0,0,1.18), "pelvis", True)
    eb("chest", (0,0,1.18), (0,0,1.34), "spine", True)
    eb("neck", (0,0,1.34), (0,0,1.40), "chest", True)
    eb("head", (0,0,1.40), (0,0,1.56), "neck", True)

    eb("upper_arm.L", (0.20,0,1.31), (0.37,0,1.10), "chest")
    eb("forearm.L", (0.37,0,1.10), (0.40,0,0.90), "upper_arm.L", True)
    eb("hand.L", (0.40,0,0.90), (0.40,0,0.82), "forearm.L", True)
    eb("upper_arm.R", (-0.20,0,1.31), (-0.37,0,1.10), "chest")
    eb("forearm.R", (-0.37,0,1.10), (-0.40,0,0.90), "upper_arm.R", True)
    eb("hand.R", (-0.40,0,0.90), (-0.40,0,0.82), "forearm.R", True)

    eb("thigh.L", (0.105,0,0.88), (0.115,0,0.52), "pelvis")
    eb("shin.L", (0.115,0,0.52), (0.115,0,0.13), "thigh.L", True)
    eb("foot.L", (0.115,0,0.13), (0.115,-0.14,0.06), "shin.L", True)
    eb("thigh.R", (-0.105,0,0.88), (-0.115,0,0.52), "pelvis")
    eb("shin.R", (-0.115,0,0.52), (-0.115,0,0.13), "thigh.R", True)
    eb("foot.R", (-0.115,0,0.13), (-0.115,-0.14,0.06), "shin.R", True)

    bpy.ops.object.mode_set(mode="POSE")
    for pb in rig.pose.bones:
        pb.rotation_mode = "XYZ"
    bpy.ops.object.mode_set(mode="OBJECT")
    return rig

def build_body(rig):
    parts = []

    pelvis = tapered_vertical("Pelvis", 0.82, 1.00, 0.17, 0.145, 0.72, CLOTH2)
    parent_bone(pelvis, rig, "pelvis"); parts.append(pelvis)

    torso = tapered_vertical("Torso", 0.99, 1.37, 0.145, 0.205, 0.60, CLOTH)
    parent_bone(torso, rig, "spine"); parts.append(torso)

    # Shoulder structure under the jacket.
    shoulder = tapered_segment("ShoulderLine", (-0.205,0,1.31), (0.205,0,1.31), 0.075, 0.075, CLOTH, 0.82)
    parent_bone(shoulder, rig, "chest"); parts.append(shoulder)

    neck = tapered_segment("Neck", (0,0,1.34), (0,0,1.405), 0.052, 0.050, SKIN, 0.92)
    parent_bone(neck, rig, "neck"); parts.append(neck)

    head = uv_sphere("Head", (0,0,1.505), (0.108,0.090,0.132), SKIN, 56, 36)
    parent_bone(head, rig, "head"); parts.append(head)

    hair_top = make_hair_cap("HairCap", (0,0.018,1.555), (0.116,0.099,0.104), HAIR)
    parent_bone(hair_top, rig, "head"); parts.append(hair_top)
    hair_back = uv_sphere("HairBack", (0,0.070,1.485), (0.118,0.065,0.155), HAIR, 42, 28)
    parent_bone(hair_back, rig, "head"); parts.append(hair_back)

    # Prefer the portrait-derived 468-point surface. Use geometric features only
    # when face reconstruction was unavailable.
    reconstructed = add_reconstructed_face(rig)
    if reconstructed is not None:
        parts.append(reconstructed)
    else:
        eye_z = 1.525
        for side, x in (("L", 0.036), ("R", -0.036)):
            ew = uv_sphere(f"EyeWhite.{side}", (x,-0.087,eye_z), (0.019,0.006,0.010), EYE_WHITE, 24, 14)
            parent_bone(ew, rig, "head"); parts.append(ew)
            iris = uv_sphere(f"Iris.{side}", (x,-0.093,eye_z), (0.0065,0.003,0.0065), IRIS, 18, 10)
            parent_bone(iris, rig, "head"); parts.append(iris)
        nose = uv_sphere("Nose", (0,-0.094,1.495), (0.014,0.013,0.022), SKIN, 24, 14)
        parent_bone(nose, rig, "head"); parts.append(nose)
        lips = rounded_box("Lips", (0,-0.095,1.462), (0.025,0.005,0.006), LIP, 0.006)
        parent_bone(lips, rig, "head"); parts.append(lips)
        add_face_decal(rig)

    # Arms with natural taper.
    for side, sign in (("L", 1), ("R", -1)):
        shoulder_p=(0.20*sign,0,1.31)
        elbow_p=(0.37*sign,0,1.10)
        wrist_p=(0.40*sign,0,0.90)
        ua=tapered_segment(f"UpperArm.{side}", shoulder_p, elbow_p, 0.064, 0.052, CLOTH, 0.92)
        parent_bone(ua, rig, f"upper_arm.{side}"); parts.append(ua)
        elbow=uv_sphere(f"Elbow.{side}", elbow_p, (0.052,0.048,0.052), CLOTH, 24, 14)
        parent_bone(elbow, rig, f"upper_arm.{side}"); parts.append(elbow)
        fa=tapered_segment(f"Forearm.{side}", elbow_p, wrist_p, 0.048, 0.035, SKIN, 0.92)
        parent_bone(fa, rig, f"forearm.{side}"); parts.append(fa)
        hand=uv_sphere(f"Hand.{side}", (0.40*sign,-0.004,0.855), (0.045,0.032,0.062), SKIN, 28, 16)
        parent_bone(hand, rig, f"hand.{side}"); parts.append(hand)

    # Legs with tailored trouser silhouette.
    for side, sign in (("L", 1), ("R", -1)):
        hip=(0.105*sign,0,0.88)
        knee=(0.115*sign,0,0.52)
        ankle=(0.115*sign,0,0.13)
        thigh=tapered_segment(f"Thigh.{side}", hip, knee, 0.085, 0.065, CLOTH2, 0.94)
        parent_bone(thigh, rig, f"thigh.{side}"); parts.append(thigh)
        knee_obj=uv_sphere(f"Knee.{side}", knee, (0.064,0.058,0.060), CLOTH2, 24, 14)
        parent_bone(knee_obj, rig, f"thigh.{side}"); parts.append(knee_obj)
        shin=tapered_segment(f"Shin.{side}", knee, ankle, 0.062, 0.048, CLOTH2, 0.94)
        parent_bone(shin, rig, f"shin.{side}"); parts.append(shin)
        foot=rounded_box(f"Foot.{side}", (0.115*sign,-0.075,0.065), (0.075,0.145,0.050), SHOE, 0.035)
        parent_bone(foot, rig, f"foot.{side}"); parts.append(foot)

    badge = rounded_box("SecurityBadge", (-0.075,-0.126,1.275), (0.032,0.007,0.046), WHITE, 0.008)
    parent_bone(badge, rig, "chest"); parts.append(badge)
    stripe = rounded_box("BadgeAccent", (-0.075,-0.134,1.286), (0.022,0.003,0.006), ACCENT, 0.003)
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

    bpy.ops.object.camera_add(location=(2.35,-4.2,1.58))
    cam = bpy.context.object
    bpy.context.scene.camera = cam
    direction = Vector((0,0,0.92)) - cam.location
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

    # Render a neutral idle pose rather than blending every NLA clip.
    if rig.animation_data:
        for track in rig.animation_data.nla_tracks:
            track.mute = track.name != "Idle"
    bpy.context.scene.frame_set(1)
    bpy.ops.wm.save_as_mainfile(filepath=blend_path)
    bpy.ops.render.render(write_still=True)

    if rig.animation_data:
        for track in rig.animation_data.nla_tracks:
            track.mute = False

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
