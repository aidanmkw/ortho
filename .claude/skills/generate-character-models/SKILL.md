---
name: generate-character-models
description: Generate rigged, animated 3D character GLBs for the /pilgrimage game via the Meshy API, using the repo's sprite art as style reference. Use when asked to generate/upgrade the 3D character models, or to add a model for a specific character.
---

# Generate character models (Meshy)

Generates game-ready GLB characters into `public/models/` and updates
`public/models/manifest.json`. The Pilgrim Road engine hot-swaps any
character listed in the manifest; characters without models keep their
procedural figures, so partial runs are always safe.

## Requirements

1. `MESHY_API_KEY` env var (user creates it at meshy.ai → API keys; paid credits).
2. Outbound network access to `api.meshy.ai` and `assets.meshy.ai`
   (in Claude Code on the web, the environment's network policy must allow
   these domains — if requests fail with a proxy/403 error, tell the user
   to add the domains in their environment settings or run the command
   locally instead).

## Commands

```bash
npm run models:generate                       # all 21 characters (~several min each)
npm run models:generate -- --only=arius,doubt # specific ids
npm run models:generate -- --no-rig           # static meshes only
npm run models:generate -- --dry-run          # plan only
```

Character ids and their reference sprites/prompts live in
`scripts/generate-models.mjs` (`CHARACTERS` map). Delete a
`public/models/<id>.glb` to force regeneration.

## After generating

1. Spot-check locally: `npm run build`, serve `out/`, open `/pilgrimage`
   and confirm the swapped characters animate (clips named walk/idle map
   automatically; see `lib/quest3d/modelRig.ts` for the matching rules).
2. Commit `public/models/` (GLBs + manifest) and push — GitHub Pages
   serves them; no code change needed.

## If the rigging call 4xxs

Meshy's image-to-3d endpoints are stable v1; the rigging endpoint is newer.
Check https://docs.meshy.ai → Rigging & Animation and adjust only the
`RIG_CREATE` request fields / `RIG_GET` URL in `scripts/generate-models.mjs`.
The script already degrades to static meshes when rigging fails.
