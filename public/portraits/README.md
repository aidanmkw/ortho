# Character Portraits

The Quest renders each character as a stylized SVG portrait by default. To
replace any character with a real (e.g. AI-generated) image:

1. Generate or commission an image — recommended size **600×800 px** (3:4
   aspect ratio), painted-icon or illuminated-manuscript style.
2. Save the file in this directory: `public/portraits/<filename>.webp`
   (`.png` and `.jpg` also work).
3. In `lib/quest/portraits.ts`, find the character's entry and add an
   `image` field:

   ```ts
   "st-anthony": {
     image: "st-anthony.webp",   // <— add this line
     skin: "pale",
     // ...rest unchanged (used as fallback if image fails to load)
   },
   ```

The SVG continues to work as a fallback (and during local dev when no
image file exists). The game frame, halo glow, and platform shadow are
applied automatically over the image.

## Style guide for new portraits

Aim for a unified look across all 24 characters:

- **Aspect**: 3:4 vertical (portrait orientation)
- **Crop**: Head and shoulders — head fills upper 60% of the canvas
- **Background**: Dark / textured (linen, gold leaf, or stylized
  niche). Avoid bright modern backdrops.
- **Lighting**: Soft, devotional — single source from upper left, warm.
- **Style**: Byzantine icon ↔ illuminated-manuscript painting ↔ Repin /
  Surikov portrait. Avoid photorealism for saints; allow it for modern
  characters (Sarah, Alex, Elder Williams).
- **Saints**: Include a gold halo (the game also overlays one, but a
  painted halo in the source image looks best).
- **Heretics / villains**: No halo. Darker palette, optional red rim
  light.

## Suggested AI prompts

Paste these into any AI image generator (DALL-E 3, Midjourney v6,
Stable Diffusion XL, Flux, etc.). Add `--ar 3:4` for Midjourney.

### Saints

**st-anthony.webp** — `Byzantine icon of Saint Anthony the Great,
desert hermit, long white beard, dark monastic skufia, brown habit,
holding small ornate cross, gold halo, gold-leaf background with subtle
Greek inscription, devotional painting, soft warm lighting`

**st-ignatius.webp** — `Orthodox icon of Saint Ignatius of Antioch,
bishop in white omophorion with red crosses, gold mitre, holding iron
chains, gray beard, gold halo, gold leaf background, 4th century
Byzantine style`

**st-athanasius.webp** — `Saint Athanasius of Alexandria, dark-skinned
Egyptian bishop, black hair and beard, crimson and gold patriarchal
vestments, gold halo, holding scroll of Nicene Creed, Byzantine icon
painting, gold background`

**st-macarius.webp** — `Saint Macarius the Great of Egypt, desert
father, sun-darkened skin, long flowing white beard, simple brown
monastic robe, gold halo, holding a small cross, palm trees and desert
sand in distant background, icon painting`

**st-cyril.webp** — `Saint Cyril of Alexandria, ascetic Greek bishop,
brown beard, ornate gold mitre encrusted with red rubies, white sakkos
with red crosses, holding scroll, gold halo, gold-leaf icon style`

**st-john-damascus.webp** — `Saint John of Damascus, Arab Christian
monk under Muslim rule, dark hair and beard, black monastic habit,
holding an ornate icon of Christ, gold halo, defending images,
illuminated manuscript style`

**st-mark-ephesus.webp** — `Saint Mark of Ephesus, gaunt fasting
bishop, long white beard, purple Greek mandyas, gold mitre with cross,
holding scroll refusing union, gold halo, 15th century Byzantine icon`

**st-catherine.webp** — `Saint Catherine of Alexandria, young noble
woman, long dark hair, royal purple robe, gold halo, holding open book
of Scripture, broken torture wheel beside her, illuminated icon
painting`

**st-george.webp** — `Saint George the Trophy-bearer, young Roman
soldier, chestnut hair, mail armor with white cross on red surcoat,
holding spear, gold halo, slain dragon in background, Russian
Orthodox icon style`

**st-mary-egypt.webp** — `Saint Mary of Egypt, dark-skinned ascetic
woman, long flowing black hair covering her body, sun-darkened skin
from decades in the desert, simple brown habit, gold halo, holding
small wooden cross, gaunt face, icon painting`

**st-seraphim.webp** — `Saint Seraphim of Sarov, Russian elder, long
flowing white beard, kneeling in prayer, monastic habit, golden
uncreated light radiating from his face and around him, holding cross,
candle visible, traditional Russian icon`

### Villains (no halo)

**centurion.webp** — `1st century Roman centurion Lucius, weathered
soldier, scarred face, red horsehair plume on iron helmet, lorica
segmentata armor, crimson cape, severe expression, painted in classical
Roman fresco style, dark Pompeian background`

**marcus.webp** — `Pagan Roman patrician Marcus Verus in toga praetexta
with red border, laurel wreath, aristocratic face, dark hair, intense
gaze, painted in classical Pompeian style, niche of pagan household
gods in background`

**arius.webp** — `Heresiarch Arius of Alexandria, gaunt Egyptian
presbyter, hollow cheeks from fasting, jet black hair and short beard,
dark purple deacon vestments with white sticharion, manipulative
expression, Alexandrian library shadows`

**tempter.webp** — `Hooded demonic figure, cowl shadowing face except
two glowing red eyes, purple ethereal mist drifting from mouth, dark
robe blending into void, desert cave background, dark fantasy
oil painting style`

**eutyches.webp** — `Eutyches the Monophysite archimandrite, very old
man, extremely long white beard down to chest, black monastic klobuk
veil, hollow-eyed, stubborn expression, dark monastery cell background,
icon-painting style`

**iconoclast.webp** — `Byzantine emperor Constantine V the Iconoclast,
crowned with gold stemma encrusted with rubies and sapphires, pearl
strings hanging from crown, imperial purple chlamys with gold loros and
gemstones, severe expression, holding rolled decree against icons,
icon-style portrait`

**humbert.webp** — `Cardinal Humbert of Silva Candida, 11th century
Roman legate, wide red galero hat with gold tassels, crimson cassock
with gold pectoral cross, tonsured gray hair, stern arrogant
expression, dark Vatican background`

**pope-eugene.webp** — `Pope Eugene IV in papal triple tiara, white
papal vestments with gold and red orphreys, weary intelligent face,
gray stubble, holding decree of union of Florence, 15th century
ecclesiastical portrait, Vatican setting`

**nkvd.webp** — `Soviet NKVD interrogator Captain Pavlov, 1937,
gray uniform with red star on peaked cap and red collar tabs, military
medals, mustache, cold dispassionate eyes, harsh single bulb lighting,
soviet realist style`

**lds.webp** — `Young LDS missionary Elder Williams, white shirt, dark
navy tie, name tag, side-parted brown hair, clean shaven, sincere
expression, holding Book of Mormon, suburban porch background, modern
photo-real illustration`

**reformed.webp** — `Sarah Kelley, female Reformed seminarian, cropped
ginger hair, gold-rimmed glasses, dark sweater, holding open Calvin's
Institutes with two highlighters, intelligent serious expression,
coffee shop background, modern illustration`

**atheist.webp** — `Alex Chen, 30s software engineer, asian-american,
short dark hair, stubble, black-rimmed glasses, gray hoodie, headphones
around neck, intelligent thoughtful expression, late night blue-lit
apartment background, modern illustration`

**doubt.webp** — `Abstract spiritual shadow figure with the player's
own faceless silhouette, void where eyes should be (only two glowing
red points), purple-black smoke composing the body, drifting wisps of
darkness, oppressive emptiness, surreal symbolic painting`

## Player portrait

The player portrait uses the user's chosen hair color, so it's rendered
procedurally. If you want to support custom player portraits (uploaded
photo, etc.), add a `playerImage` field to the save and read it in
`playerPortraitConfig`.
