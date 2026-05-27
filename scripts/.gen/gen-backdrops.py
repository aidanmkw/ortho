import json, base64, io, time
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image

KEY=Path("/home/user/ortho/.gemini-key").read_text().strip()
URL=f"https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key={KEY}"
OUT=Path("/home/user/ortho/public/backgrounds")
OUT.mkdir(parents=True, exist_ok=True)
CH=json.loads(Path("/home/user/ortho/scripts/.gen/chapters.json").read_text())

STYLE=("Painterly visual-novel background, oil-on-canvas in the manner of 19th-century academic painting "
 "(Vasnetsov, Repin), cinematic widescreen establishing shot, warm chiaroscuro lighting, deep shadows, "
 "NO PEOPLE, no figures, no text, no UI — only the empty setting as a stage. Eye-level perspective, "
 "photorealistic painted illustration.")

# Per-chapter scene hint to make each LOCATION distinct and accurate.
HINT={
 "ch1-antioch":"a dusty Roman road at dawn winding through the hills of Asia Minor near Smyrna, cypress and umbrella pines, stone milestones, the Aegean coast distant",
 "ch101-polycarp":"the sandy oval arena of a Roman stadium in Smyrna at midday, empty tiered stone seating, a stake and unlit pyre at the center, blue Aegean sky",
 "ch102-justin":"a modest 2nd-century Roman teaching room above the public baths, scrolls and a worn lectern, a small window onto Roman rooftops, lamplight",
 "ch2-catacombs":"Roman catacomb tunnels of volcanic tufa, oil lamps, early-Christian frescoes (chi-rho, fish, dove) in arched niches receding into darkness",
 "ch515-catherine-reason":"a marble lecture hall of the philosophers in Alexandria, columns, scrolls and an astrolabe, Mediterranean light through high windows",
 "ch3-nicaea":"the great hall of the First Council at Nicaea, AD 325, rows of empty bishops' benches, an imperial dais, an open Gospel on a lectern, gold and marble",
 "ch501-anthony-thoughts":"a hermit's cave on the Inner Mountain of the Egyptian desert, a reed mat, a clay water jar, a small wooden cross, vast ochre dunes beyond",
 "ch4-desert":"the Wadi Natrun, scattered Coptic monastic cells of mud-brick among salt flats and palms, scorching golden desert light",
 "ch503-athanasius-incarnation":"the interior of the great church of Alexandria, early-Byzantine columns and an apse, lamps, a sense of embattled orthodoxy",
 "ch504-basil-spirit":"a 4th-century Cappadocian episcopal hall of pale stone, simple, a window onto volcanic tuff hills, lamplight",
 "ch502-macarius-prayer":"the desert of Scetis (the Cells), low mud-brick hermitages spread far apart across pale sand at golden hour",
 "ch103-cappadocians":"the hall of the Second Council at Constantinople, AD 381, empty benches, an apse mosaic of the dove of the Spirit, candlelight",
 "ch505-chrysostom-poor":"the great church of Constantinople, marble ambo and columns, baskets of bread for the poor near the doors, warm lamplight",
 "ch104-chrysostom":"a richly appointed Byzantine patriarchal palace room, mosaics and heavy curtains, an ornate empty chair, tense gilded gloom",
 "ch514-mary-egypt-repentance":"the harsh wilderness beyond the Jordan, cracked red earth, thorn scrub, a distant ribbon of river, blazing empty sky",
 "ch506-cyril-theotokos":"the Church of St. Mary in Alexandria, an apse with an early icon of the Mother and Child, lamps and marble",
 "ch105-ephesus":"the Church of St. Mary in Ephesus, hall of the Third Council AD 431, empty benches, torchlight, a waiting crowd's torches glimpsed outside",
 "ch5-chalcedon":"the basilica of the Council of Chalcedon AD 451, vast colonnaded hall, imperial dais, an open codex, cold marble grandeur",
 "ch201-constantinople-ii":"the interior of Justinian's Hagia Sophia, the great floating dome on a ring of light, gold mosaics, marble floor",
 "ch507-maximus-love":"a quiet monastery garden at the edge of the world, a stone bench, an olive tree, sea and sky beyond a low wall, contemplative calm",
 "ch106-maximus":"a bleak Byzantine prison cell of rough stone, a single barred high window casting a shaft of light, chains on the wall",
 "ch202-john-damascus":"the Great Lavra of Mar Saba clinging to a Judean desert canyon wall, ochre cliffs, a blue-domed chapel, deep ravine",
 "ch508-damascene-icons":"a monk's stone cell at Mar Saba, an icon of Christ on the wall, an inkpot and parchment, a window onto the desert canyon",
 "ch6-icons":"the interior of Hagia Sophia, Constantinople, restored icons gleaming, the great dome, candle stands, AD 787 triumph of images",
 "ch107-cyril-methodius":"the crypt of San Clemente in Rome, before the relics of St. Clement, Byzantine-Latin frescoes, lamplight on old stone",
 "ch108-photios":"Hagia Sophia set for the reunion council of 879, rows of seats for Greek and Latin clergy, the great apse, solemn gold light",
 "ch109-rus":"the green banks of the Dnieper at Kiev, AD 988, a wooden hilltop fortress, a felled pagan idol, crowds' boats on the river (no people)",
 "ch203-symeon":"the courtyard of the Monastery of St. Mamas, Constantinople, a small Byzantine chapel, cypresses, night with a sense of inner light",
 "ch7-schism":"the nave of Hagia Sophia in 1054, the great altar under the dome, a sealed parchment bull laid upon it, ominous stillness",
 "ch301-fourth-crusade":"Hagia Sophia despoiled by the Fourth Crusade in 1204, smashed furnishings, scattered tesserae, smoke, ruined grandeur",
 "ch302-sava-serbia":"the monastery of Hilandar on Mount Athos and a medieval Serbian court hall, stone towers above the Aegean, autumn light",
 "ch509-palamas-light":"a hesychast's hermitage cell on Mount Athos at night, a low stool, a prayer rope, the Aegean far below, a faint uncreated radiance",
 "ch303-palamas":"a council hall of Constantinople and, beyond, the cells of Mount Athos, two worlds joined, candlelight and dawn over the sea",
 "ch8-florence":"the Renaissance cathedral hall of the Council of Florence 1439, Latin Gothic arches, an ornate dais, a contested open decree",
 "ch512-cosmas-soul":"a village gathering place under a great plane tree in Ottoman Greece, a rough wooden cross set up, mountains, dusk",
 "ch401-cosmas":"a village square in Ottoman Epirus beneath an enormous plane tree, whitewashed houses, a tall wooden cross, evening light",
 "ch402-seraphim":"a snow-bound forest clearing near the Sarov hermitage in Russia, birches under deep snow, a tiny log cell, cold blue winter light",
 "ch510-seraphim-joy":"a small log hermitage in the snowy Russian pine forest near Sarov, a worn path, smoke from a chimney, soft winter dawn",
 "ch404-optina":"the skete of Optina Pustyn near Kozelsk, wooden Russian chapel and elders' huts among birches, a wooden fence, gentle light",
 "ch513-ambrose-burdens":"the humble log hut of an Optina elder, an icon corner with a vigil lamp, a simple bench worn by many pilgrims, warm dim light",
 "ch511-silouan-enemies":"the flour mill of St. Panteleimon Monastery on Mount Athos, sacks of grain, a millstone, dim dusty light from a small window",
 "ch9-soviets":"a bleak Soviet NKVD interrogation cell in Moscow 1937, a bare bulb over a battered table, peeling green plaster, a barred high window",
 "ch403-silouan":"the dim flour mill of St. Panteleimon on Mount Athos, the millstone and grain sacks, a shaft of light, quiet labor",
 "ch10-modern":"a contemporary apartment desk at night, a glowing laptop, stacked books, a window onto a city, warm lamp light",
 "ch10b-reformed":"a modern coffee shop interior, afternoon light through a big window, two empty chairs at a small table, mugs, bookshelves",
 "ch10c-atheist":"a dark modern room late at night lit by a computer screen's glow, headphones on the desk, a city window, blue-black mood",
 "ch11-doubt":"an abstract void of swirling violet and indigo, no horizon, cold wisps of mist, a single distant candle-flame holding back the dark",
}
def compress(raw):
    img=Image.open(io.BytesIO(raw)).convert("RGB"); img.thumbnail((1600,900), Image.LANCZOS); return img
done=skip=err=0
for c in CH:
    cid=c["id"]; out=OUT/f"{cid}.webp"
    if out.exists(): skip+=1; continue
    hint=HINT.get(cid, f"{c['location']}, {c['era']}")
    prompt=f"{STYLE} The scene: {hint}."
    body=json.dumps({"instances":[{"prompt":prompt}],"parameters":{"sampleCount":1,"aspectRatio":"16:9"}}).encode()
    try:
        with urlopen(Request(URL,data=body,headers={"Content-Type":"application/json"}),timeout=200) as r:
            data=json.loads(r.read())
        img=compress(base64.b64decode(data['predictions'][0]['bytesBase64Encoded']))
        img.save(out,"WEBP",quality=86,method=6); done+=1
        print(f"{cid}: {img.size}", flush=True)
    except Exception as e:
        err+=1; print(f"{cid} ERR {str(e)[:70]}", flush=True)
        if "429" in str(e):
            print("QUOTA HIT — stopping; rerun later to continue (idempotent).", flush=True); break
    time.sleep(2)
print(f"DONE done={done} skip={skip} err={err}", flush=True)
