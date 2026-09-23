# Trust Universe — Asset and Performance Architecture

## Hybrid rendering
Blender/pre-render: complex architecture, hero travel transitions, macro transformations.
Three.js: navigation, gray-box worlds, object inspection, lightweight ambient systems, map/topology.
DOM: evidence, accessibility, recruiter/editorial surfaces, resume, forms.

## Streaming
Keep only current world + adjacent shell + transition assets + shared assets.
Dispose distant scenes, textures and transient effects.

## Quality modes
CINEMATIC: highest atmosphere/particles/reflections.
HIGH: full layout, reduced expensive effects.
BALANCED: reduced reflections/particles/shadows.
LITE: pre-rendered transitions + simplified geometry.

## Budgets for the gray-box
- desktop DPR capped;
- minimal dynamic shadows;
- shared geometries/materials;
- no heavyweight post-processing yet;
- world shells lazy-loaded in production phase;
- track draw calls, textures, geometry, JS heap and GPU memory.

## Accessibility/mobile
Mobile uses guided camera + tap-to-travel rather than desktop walking/driving.
Reduced motion uses direct world selection and static evidence surfaces.
No career-critical information exists only in 3D.
