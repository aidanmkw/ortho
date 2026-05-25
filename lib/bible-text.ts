// Bible-text lookup for the Orthodox Apologist curriculum.
//
// Translation policy (per project spec):
//   1. EOB-NT (Eastern Orthodox Bible NT) — preferred for NT, but the
//      ebible.org/eng-EOB endpoint returns HTTP 403 to unauthenticated
//      fetches and no other free programmatic mirror could be confirmed,
//      so NT entries currently fall back to public-domain KJV.
//   2. EOB-OT / LXX draft — same access issue; OT falls back to KJV.
//   3. NETS — public-domain LXX English; reserved for when its wording is
//      materially required (Psalms numbering, Deuterocanon).
//   4. KJV — public domain, used as the safe fallback throughout.
//
// LXX vs Masoretic Psalm numbering: this app uses LXX numbering (the
// Orthodox convention). "Ps 50" here = Masoretic Ps 51, "Ps 140" = MT Ps
// 141, etc. The stored text matches the LXX-numbered verse content.
//
// The renderer should display the `translation` field so the source is
// always visible to the reader.

export type BibleVerse = {
  text: string;
  translation: "EOB-NT" | "EOB-OT" | "LXX-NETS" | "KJV" | "RSV";
};

// --- Reference normalization -------------------------------------------------

// Map of common book abbreviations / variants -> canonical short form.
const BOOK_MAP: Record<string, string> = {
  // Pentateuch
  "gen": "Gen", "genesis": "Gen",
  "ex": "Exod", "exo": "Exod", "exod": "Exod", "exodus": "Exod",
  "lev": "Lev", "leviticus": "Lev",
  "num": "Num", "numbers": "Num",
  "deut": "Deut", "dt": "Deut", "deuteronomy": "Deut",
  // OT historical / wisdom (subset used here)
  "ps": "Ps", "psa": "Ps", "psalm": "Ps", "psalms": "Ps",
  // NT Gospels + Acts
  "mt": "Matt", "matt": "Matt", "matthew": "Matt",
  "mk": "Mark", "mark": "Mark",
  "lk": "Luke", "luke": "Luke",
  "jn": "John", "john": "John",
  "acts": "Acts",
  // Pauline + general
  "rom": "Rom", "romans": "Rom",
  "1cor": "1Cor", "1 cor": "1Cor", "1 corinthians": "1Cor", "1corinthians": "1Cor",
  "2cor": "2Cor", "2 cor": "2Cor", "2 corinthians": "2Cor",
  "gal": "Gal", "galatians": "Gal",
  "eph": "Eph", "ephesians": "Eph",
  "phil": "Phil", "philippians": "Phil",
  "col": "Col", "colossians": "Col",
  "1thess": "1Thess", "1 thess": "1Thess", "1 thessalonians": "1Thess",
  "2thess": "2Thess", "2 thess": "2Thess",
  "1tim": "1Tim", "1 tim": "1Tim", "1 timothy": "1Tim",
  "2tim": "2Tim", "2 tim": "2Tim", "2 timothy": "2Tim",
  "tit": "Titus", "titus": "Titus",
  "heb": "Heb", "hebrews": "Heb",
  "jas": "Jas", "james": "Jas",
  "1pet": "1Pet", "1 pet": "1Pet", "1 peter": "1Pet",
  "2pet": "2Pet", "2 pet": "2Pet",
  "1john": "1John", "1 john": "1John", "1jn": "1John",
  "2john": "2John", "2 john": "2John",
  "3john": "3John", "3 john": "3John",
  "jude": "Jude",
  "rev": "Rev", "revelation": "Rev", "apoc": "Rev", "apocalypse": "Rev",
};

/**
 * Normalize a free-form Bible reference into a canonical lookup key.
 *
 * Handles:
 *   - en-dash / em-dash converted to ASCII hyphen for ranges
 *   - leading-number books with or without space ("1 Cor" / "1Cor" / "1cor")
 *   - common abbreviations ("Mt" -> "Matt", "Jn" -> "John")
 *   - trailing stray punctuation ("Acts 2:32-36 —")
 *   - whitespace collapsed
 *
 * Examples (all map to "Matt 16:18"):
 *   normalizeRef("Mt 16:18")
 *   normalizeRef("Matthew 16:18")
 *   normalizeRef("matt 16:18")
 */
export function normalizeRef(reference: string): string {
  let s = reference.trim();
  // Normalize dashes
  s = s.replace(/[‐‑‒–—−]/g, "-");
  // Strip trailing dashes / em-dash markers / commas
  s = s.replace(/[\s\-–—,]+$/g, "").trim();
  // Collapse whitespace
  s = s.replace(/\s+/g, " ");

  // Split into book portion + ref portion. Book may start with "1 ", "2 ", "3 ".
  // Pattern: optional leading digit + space, then letters (and maybe a dot),
  // then a space, then chapter:verse(s).
  const m = s.match(/^((?:[1-3]\s*)?[A-Za-z]+\.?)\s+(.+)$/);
  if (!m) return s; // unparseable — return as-is

  const rawBook = m[1].toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();
  const rest = m[2].trim();

  // Try the book key both with and without internal space (handles "1cor" vs "1 cor").
  const canonical =
    BOOK_MAP[rawBook] ||
    BOOK_MAP[rawBook.replace(/\s+/g, "")] ||
    null;

  if (!canonical) return s;
  // Strip spaces inside the ref portion ("2:1 – 4" -> "2:1-4"), but keep
  // commas readable.
  const cleanRest = rest.replace(/\s*-\s*/g, "-").replace(/\s+/g, " ");
  return `${canonical} ${cleanRest}`;
}

// --- Verse data -------------------------------------------------------------
//
// Text below is public-domain KJV unless otherwise noted. Quotation marks
// are escaped where needed. Long pericopes are abbreviated as first verse
// + "…" + last verse; short ones are given in full.

export const VERSES: Record<string, BibleVerse> = {
  // ---------- Pentateuch ----------
  "Gen 1:26": {
    translation: "KJV",
    text: "And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth.",
  },
  "Gen 1:27": {
    translation: "KJV",
    text: "So God created man in his own image, in the image of God created he him; male and female created he them.",
  },
  "Gen 3:14-24": {
    translation: "KJV",
    text: "And the LORD God said unto the serpent, Because thou hast done this, thou art cursed above all cattle, and above every beast of the field; upon thy belly shalt thou go, and dust shalt thou eat all the days of thy life: And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel. … Therefore the LORD God sent him forth from the garden of Eden, to till the ground from whence he was taken. So he drove out the man; and he placed at the east of the garden of Eden Cherubims, and a flaming sword which turned every way, to keep the way of the tree of life.",
  },
  "Gen 14:14": {
    translation: "KJV",
    text: "And when Abram heard that his brother was taken captive, he armed his trained servants, born in his own house, three hundred and eighteen, and pursued them unto Dan.",
  },
  "Exod 20:4-5": {
    translation: "KJV",
    text: "Thou shalt not make unto thee any graven image, or any likeness of any thing that is in heaven above, or that is in the earth beneath, or that is in the water under the earth: Thou shalt not bow down thyself to them, nor serve them: for I the LORD thy God am a jealous God, visiting the iniquity of the fathers upon the children unto the third and fourth generation of them that hate me.",
  },
  "Exod 20:12": {
    translation: "KJV",
    text: "Honour thy father and thy mother: that thy days may be long upon the land which the LORD thy God giveth thee.",
  },
  "Exod 25:18-22": {
    translation: "KJV",
    text: "And thou shalt make two cherubims of gold, of beaten work shalt thou make them, in the two ends of the mercy seat. And make one cherub on the one end, and the other cherub on the other end: even of the mercy seat shall ye make the cherubims on the two ends thereof. And the cherubims shall stretch forth their wings on high, covering the mercy seat with their wings, and their faces shall look one to another; toward the mercy seat shall the faces of the cherubims be. And thou shalt put the mercy seat above upon the ark; and in the ark thou shalt put the testimony that I shall give thee. And there I will meet with thee, and I will commune with thee from above the mercy seat, from between the two cherubims which are upon the ark of the testimony, of all things which I will give thee in commandment unto the children of Israel.",
  },

  // ---------- Psalms (LXX numbering — Orthodox convention) ----------
  // Ps 2:2 has identical numbering in LXX and MT.
  "Ps 2:2": {
    translation: "KJV",
    text: "The kings of the earth set themselves, and the rulers take counsel together, against the LORD, and against his anointed, saying,",
  },
  // Ps 140 (LXX) = MT Ps 141. Verse 2 is the famous "Let my prayer be set forth as incense".
  "Ps 140:2": {
    translation: "LXX-NETS",
    text: "Let my prayer be set forth before thee as incense; and the lifting up of my hands as the evening sacrifice.",
  },

  // ---------- Matthew ----------
  "Matt 1:21": {
    translation: "KJV",
    text: "And she shall bring forth a son, and thou shalt call his name JESUS: for he shall save his people from their sins.",
  },
  "Matt 1:23": {
    translation: "KJV",
    text: "Behold, a virgin shall be with child, and shall bring forth a son, and they shall call his name Emmanuel, which being interpreted is, God with us.",
  },
  "Matt 3:16-17": {
    translation: "KJV",
    text: "And Jesus, when he was baptized, went up straightway out of the water: and, lo, the heavens were opened unto him, and he saw the Spirit of God descending like a dove, and lighting upon him: And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.",
  },
  "Matt 4:17": {
    translation: "KJV",
    text: "From that time Jesus began to preach, and to say, Repent: for the kingdom of heaven is at hand.",
  },
  "Matt 5:3-12": {
    translation: "KJV",
    text: "Blessed are the poor in spirit: for theirs is the kingdom of heaven. Blessed are they that mourn: for they shall be comforted. Blessed are the meek: for they shall inherit the earth. Blessed are they which do hunger and thirst after righteousness: for they shall be filled. Blessed are the merciful: for they shall obtain mercy. Blessed are the pure in heart: for they shall see God. Blessed are the peacemakers: for they shall be called the children of God. Blessed are they which are persecuted for righteousness' sake: for theirs is the kingdom of heaven. Blessed are ye, when men shall revile you, and persecute you, and shall say all manner of evil against you falsely, for my sake. Rejoice, and be exceeding glad: for great is your reward in heaven: for so persecuted they the prophets which were before you.",
  },
  "Matt 7:16": {
    translation: "KJV",
    text: "Ye shall know them by their fruits. Do men gather grapes of thorns, or figs of thistles?",
  },
  "Matt 8:14": {
    translation: "KJV",
    text: "And when Jesus was come into Peter's house, he saw his wife's mother laid, and sick of a fever.",
  },
  "Matt 16:18": {
    translation: "KJV",
    text: "And I say also unto thee, That thou art Peter, and upon this rock I will build my church; and the gates of hell shall not prevail against it.",
  },
  "Matt 16:19": {
    translation: "KJV",
    text: "And I will give unto thee the keys of the kingdom of heaven: and whatsoever thou shalt bind on earth shall be bound in heaven: and whatsoever thou shalt loose on earth shall be loosed in heaven.",
  },
  "Matt 17:1-9": {
    translation: "KJV",
    text: "And after six days Jesus taketh Peter, James, and John his brother, and bringeth them up into an high mountain apart, And was transfigured before them: and his face did shine as the sun, and his raiment was white as the light. And, behold, there appeared unto them Moses and Elias talking with him. Then answered Peter, and said unto Jesus, Lord, it is good for us to be here: if thou wilt, let us make here three tabernacles; one for thee, and one for Moses, and one for Elias. … And as they came down from the mountain, Jesus charged them, saying, Tell the vision to no man, until the Son of man be risen again from the dead.",
  },
  "Matt 19:4-6": {
    translation: "KJV",
    text: "And he answered and said unto them, Have ye not read, that he which made them at the beginning made them male and female, And said, For this cause shall a man leave father and mother, and shall cleave to his wife: and they twain shall be one flesh? Wherefore they are no more twain, but one flesh. What therefore God hath joined together, let not man put asunder.",
  },
  "Matt 19:4-12": {
    translation: "KJV",
    text: "And he answered and said unto them, Have ye not read, that he which made them at the beginning made them male and female, And said, For this cause shall a man leave father and mother, and shall cleave to his wife: and they twain shall be one flesh? Wherefore they are no more twain, but one flesh. What therefore God hath joined together, let not man put asunder. … For there are some eunuchs, which were so born from their mother's womb: and there are some eunuchs, which were made eunuchs of men: and there be eunuchs, which have made themselves eunuchs for the kingdom of heaven's sake. He that is able to receive it, let him receive it.",
  },
  "Matt 22:30": {
    translation: "KJV",
    text: "For in the resurrection they neither marry, nor are given in marriage, but are as the angels of God in heaven.",
  },
  "Matt 23:37": {
    translation: "KJV",
    text: "O Jerusalem, Jerusalem, thou that killest the prophets, and stonest them which are sent unto thee, how often would I have gathered thy children together, even as a hen gathereth her chickens under her wings, and ye would not!",
  },
  "Matt 25:34-40": {
    translation: "KJV",
    text: "Then shall the King say unto them on his right hand, Come, ye blessed of my Father, inherit the kingdom prepared for you from the foundation of the world: For I was an hungred, and ye gave me meat: I was thirsty, and ye gave me drink: I was a stranger, and ye took me in: Naked, and ye clothed me: I was sick, and ye visited me: I was in prison, and ye came unto me. … And the King shall answer and say unto them, Verily I say unto you, Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me.",
  },
  "Matt 27:35, 43, 46": {
    translation: "KJV",
    text: "And they crucified him, and parted his garments, casting lots: that it might be fulfilled which was spoken by the prophet, They parted my garments among them, and upon my vesture did they cast lots. … He trusted in God; let him deliver him now, if he will have him: for he said, I am the Son of God. … And about the ninth hour Jesus cried with a loud voice, saying, Eli, Eli, lama sabachthani? that is to say, My God, my God, why hast thou forsaken me?",
  },
  "Matt 28:9-10": {
    translation: "KJV",
    text: "And as they went to tell his disciples, behold, Jesus met them, saying, All hail. And they came and held him by the feet, and worshipped him. Then said Jesus unto them, Be not afraid: go tell my brethren that they go into Galilee, and there shall they see me.",
  },
  "Matt 28:19": {
    translation: "KJV",
    text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost:",
  },
  "Matt 28:19-20": {
    translation: "KJV",
    text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.",
  },
  "Matt 28:20": {
    translation: "KJV",
    text: "Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.",
  },

  // ---------- Mark ----------
  "Mark 2:17": {
    translation: "KJV",
    text: "When Jesus heard it, he saith unto them, They that are whole have no need of the physician, but they that are sick: I came not to call the righteous, but sinners to repentance.",
  },
  "Mark 6:13": {
    translation: "KJV",
    text: "And they cast out many devils, and anointed with oil many that were sick, and healed them.",
  },
  "Mark 9:24": {
    translation: "KJV",
    text: "And straightway the father of the child cried out, and said with tears, Lord, I believe; help thou mine unbelief.",
  },
  "Mark 16:9": {
    translation: "KJV",
    text: "Now when Jesus was risen early the first day of the week, he appeared first to Mary Magdalene, out of whom he had cast seven devils.",
  },

  // ---------- Luke ----------
  "Luke 1:46-47": {
    translation: "KJV",
    text: "And Mary said, My soul doth magnify the Lord, And my spirit hath rejoiced in God my Saviour.",
  },
  "Luke 1:48": {
    translation: "KJV",
    text: "For he hath regarded the low estate of his handmaiden: for, behold, from henceforth all generations shall call me blessed.",
  },
  "Luke 5:31": {
    translation: "KJV",
    text: "And Jesus answering said unto them, They that are whole need not a physician; but they that are sick.",
  },
  "Luke 10:1-20": {
    translation: "KJV",
    text: "After these things the Lord appointed other seventy also, and sent them two and two before his face into every city and place, whither he himself would come. Therefore said he unto them, The harvest truly is great, but the labourers are few: pray ye therefore the Lord of the harvest, that he would send forth labourers into his harvest. Go your ways: behold, I send you forth as lambs among wolves. … Notwithstanding in this rejoice not, that the spirits are subject unto you; but rather rejoice, because your names are written in heaven.",
  },
  "Luke 15:5": {
    translation: "KJV",
    text: "And when he hath found it, he layeth it on his shoulders, rejoicing.",
  },
  "Luke 16:19-31": {
    translation: "KJV",
    text: "There was a certain rich man, which was clothed in purple and fine linen, and fared sumptuously every day: And there was a certain beggar named Lazarus, which was laid at his gate, full of sores, And desiring to be fed with the crumbs which fell from the rich man's table: moreover the dogs came and licked his sores. … And he said unto him, If they hear not Moses and the prophets, neither will they be persuaded, though one rose from the dead.",
  },
  "Luke 18:13, 38": {
    translation: "KJV",
    text: "And the publican, standing afar off, would not lift up so much as his eyes unto heaven, but smote upon his breast, saying, God be merciful to me a sinner. … And he cried, saying, Jesus, thou Son of David, have mercy on me.",
  },
  "Luke 20:38": {
    translation: "KJV",
    text: "For he is not a God of the dead, but of the living: for all live unto him.",
  },
  "Luke 22:19": {
    translation: "KJV",
    text: "And he took bread, and gave thanks, and brake it, and gave unto them, saying, This is my body which is given for you: this do in remembrance of me.",
  },
  "Luke 22:42": {
    translation: "KJV",
    text: "Saying, Father, if thou be willing, remove this cup from me: nevertheless not my will, but thine, be done.",
  },
  "Luke 23:42-43": {
    translation: "KJV",
    text: "And he said unto Jesus, Lord, remember me when thou comest into thy kingdom. And Jesus said unto him, Verily I say unto thee, To day shalt thou be with me in paradise.",
  },

  // ---------- John ----------
  "John 1:1": {
    translation: "KJV",
    text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
  },
  "John 1:1-3": {
    translation: "KJV",
    text: "In the beginning was the Word, and the Word was with God, and the Word was God. The same was in the beginning with God. All things were made by him; and without him was not any thing made that was made.",
  },
  "John 1:1-14": {
    translation: "KJV",
    text: "In the beginning was the Word, and the Word was with God, and the Word was God. The same was in the beginning with God. All things were made by him; and without him was not any thing made that was made. In him was life; and the life was the light of men. And the light shineth in darkness; and the darkness comprehended it not. … And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
  },
  "John 1:1-18": {
    translation: "KJV",
    text: "In the beginning was the Word, and the Word was with God, and the Word was God. The same was in the beginning with God. All things were made by him; and without him was not any thing made that was made. In him was life; and the life was the light of men. … And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth. … No man hath seen God at any time; the only begotten Son, which is in the bosom of the Father, he hath declared him.",
  },
  "John 1:41": {
    translation: "KJV",
    text: "He first findeth his own brother Simon, and saith unto him, We have found the Messias, which is, being interpreted, the Christ.",
  },
  "John 1:46": {
    translation: "KJV",
    text: "And Nathanael said unto him, Can there any good thing come out of Nazareth? Philip saith unto him, Come and see.",
  },
  "John 3:5": {
    translation: "KJV",
    text: "Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God.",
  },
  "John 3:14": {
    translation: "KJV",
    text: "And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up:",
  },
  "John 6:53-66": {
    translation: "KJV",
    text: "Then Jesus said unto them, Verily, verily, I say unto you, Except ye eat the flesh of the Son of man, and drink his blood, ye have no life in you. Whoso eateth my flesh, and drinketh my blood, hath eternal life; and I will raise him up at the last day. For my flesh is meat indeed, and my blood is drink indeed. He that eateth my flesh, and drinketh my blood, dwelleth in me, and I in him. … From that time many of his disciples went back, and walked no more with him.",
  },
  "John 10:27": {
    translation: "KJV",
    text: "My sheep hear my voice, and I know them, and they follow me:",
  },
  "John 10:30": {
    translation: "KJV",
    text: "I and my Father are one.",
  },
  "John 12:24": {
    translation: "KJV",
    text: "Verily, verily, I say unto you, Except a corn of wheat fall into the ground and die, it abideth alone: but if it die, it bringeth forth much fruit.",
  },
  "John 15:5": {
    translation: "KJV",
    text: "I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing.",
  },
  "John 15:6": {
    translation: "KJV",
    text: "If a man abide not in me, he is cast forth as a branch, and is withered; and men gather them, and cast them into the fire, and they are burned.",
  },
  "John 15:26": {
    translation: "KJV",
    text: "But when the Comforter is come, whom I will send unto you from the Father, even the Spirit of truth, which proceedeth from the Father, he shall testify of me:",
  },
  "John 17:21-23": {
    translation: "KJV",
    text: "That they all may be one; as thou, Father, art in me, and I in thee, that they also may be one in us: that the world may believe that thou hast sent me. And the glory which thou gavest me I have given them; that they may be one, even as we are one: I in them, and thou in me, that they may be made perfect in one; and that the world may know that thou hast sent me, and hast loved them, as thou hast loved me.",
  },
  "John 17:21-24": {
    translation: "KJV",
    text: "That they all may be one; as thou, Father, art in me, and I in thee, that they also may be one in us: that the world may believe that thou hast sent me. And the glory which thou gavest me I have given them; that they may be one, even as we are one: I in them, and thou in me, that they may be made perfect in one; and that the world may know that thou hast sent me, and hast loved them, as thou hast loved me. Father, I will that they also, whom thou hast given me, be with me where I am; that they may behold my glory, which thou hast given me: for thou lovedst me before the foundation of the world.",
  },
  "John 19:23-24": {
    translation: "KJV",
    text: "Then the soldiers, when they had crucified Jesus, took his garments, and made four parts, to every soldier a part; and also his coat: now the coat was without seam, woven from the top throughout. They said therefore among themselves, Let us not rend it, but cast lots for it, whose it shall be: that the scripture might be fulfilled, which saith, They parted my raiment among them, and for my vesture they did cast lots. These things therefore the soldiers did.",
  },
  "John 19:26-27": {
    translation: "KJV",
    text: "When Jesus therefore saw his mother, and the disciple standing by, whom he loved, he saith unto his mother, Woman, behold thy son! Then saith he to the disciple, Behold thy mother! And from that hour that disciple took her unto his own home.",
  },
  "John 20:11-18": {
    translation: "KJV",
    text: "But Mary stood without at the sepulchre weeping: and as she wept, she stooped down, and looked into the sepulchre, And seeth two angels in white sitting, the one at the head, and the other at the feet, where the body of Jesus had lain. … Jesus saith unto her, Touch me not; for I am not yet ascended to my Father: but go to my brethren, and say unto them, I ascend unto my Father, and your Father; and to my God, and your God. Mary Magdalene came and told the disciples that she had seen the Lord, and that he had spoken these things unto her.",
  },
  "John 20:21-23": {
    translation: "KJV",
    text: "Then said Jesus to them again, Peace be unto you: as my Father hath sent me, even so send I you. And when he had said this, he breathed on them, and saith unto them, Receive ye the Holy Ghost: Whose soever sins ye remit, they are remitted unto them; and whose soever sins ye retain, they are retained.",
  },
  "John 20:22-23": {
    translation: "KJV",
    text: "And when he had said this, he breathed on them, and saith unto them, Receive ye the Holy Ghost: Whose soever sins ye remit, they are remitted unto them; and whose soever sins ye retain, they are retained.",
  },
  "John 20:28": {
    translation: "KJV",
    text: "And Thomas answered and said unto him, My Lord and my God.",
  },

  // ---------- Acts ----------
  "Acts 1:6-11": {
    translation: "KJV",
    text: "When they therefore were come together, they asked of him, saying, Lord, wilt thou at this time restore again the kingdom to Israel? And he said unto them, It is not for you to know the times or the seasons, which the Father hath put in his own power. But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth. And when he had spoken these things, while they beheld, he was taken up; and a cloud received him out of their sight. And while they looked stedfastly toward heaven as he went up, behold, two men stood by them in white apparel; Which also said, Ye men of Galilee, why stand ye gazing up into heaven? this same Jesus, which is taken up from you into heaven, shall so come in like manner as ye have seen him go into heaven.",
  },
  "Acts 1:15-26": {
    translation: "KJV",
    text: "And in those days Peter stood up in the midst of the disciples, and said, (the number of names together were about an hundred and twenty,) Men and brethren, this scripture must needs have been fulfilled, which the Holy Ghost by the mouth of David spake before concerning Judas, which was guide to them that took Jesus. … And they gave forth their lots; and the lot fell upon Matthias; and he was numbered with the eleven apostles.",
  },
  "Acts 1:21-22": {
    translation: "KJV",
    text: "Wherefore of these men which have companied with us all the time that the Lord Jesus went in and out among us, Beginning from the baptism of John, unto that same day that he was taken up from us, must one be ordained to be a witness with us of his resurrection.",
  },
  "Acts 2:1-4": {
    translation: "KJV",
    text: "And when the day of Pentecost was fully come, they were all with one accord in one place. And suddenly there came a sound from heaven as of a rushing mighty wind, and it filled all the house where they were sitting. And there appeared unto them cloven tongues like as of fire, and it sat upon each of them. And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance.",
  },
  "Acts 2:4-11": {
    translation: "KJV",
    text: "And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance. And there were dwelling at Jerusalem Jews, devout men, out of every nation under heaven. … Cretes and Arabians, we do hear them speak in our tongues the wonderful works of God.",
  },
  "Acts 2:6-11": {
    translation: "KJV",
    text: "Now when this was noised abroad, the multitude came together, and were confounded, because that every man heard them speak in his own language. And they were all amazed and marvelled, saying one to another, Behold, are not all these which speak Galilaeans? … Cretes and Arabians, we do hear them speak in our tongues the wonderful works of God.",
  },
  "Acts 2:32-36": {
    translation: "KJV",
    text: "This Jesus hath God raised up, whereof we all are witnesses. Therefore being by the right hand of God exalted, and having received of the Father the promise of the Holy Ghost, he hath shed forth this, which ye now see and hear. … Therefore let all the house of Israel know assuredly, that God hath made that same Jesus, whom ye have crucified, both Lord and Christ.",
  },
  "Acts 2:38": {
    translation: "KJV",
    text: "Then Peter said unto them, Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost.",
  },
  "Acts 2:38, 41": {
    translation: "KJV",
    text: "Then Peter said unto them, Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost. … Then they that gladly received his word were baptized: and the same day there were added unto them about three thousand souls.",
  },
  "Acts 2:42": {
    translation: "KJV",
    text: "And they continued stedfastly in the apostles' doctrine and fellowship, and in breaking of bread, and in prayers.",
  },
  "Acts 4:26": {
    translation: "KJV",
    text: "The kings of the earth stood up, and the rulers were gathered together against the Lord, and against his Christ.",
  },
  "Acts 5:29": {
    translation: "KJV",
    text: "Then Peter and the other apostles answered and said, We ought to obey God rather than men.",
  },
  "Acts 6:1-7": {
    translation: "KJV",
    text: "And in those days, when the number of the disciples was multiplied, there arose a murmuring of the Grecians against the Hebrews, because their widows were neglected in the daily ministration. … Whom they set before the apostles: and when they had prayed, they laid their hands on them. And the word of God increased; and the number of the disciples multiplied in Jerusalem greatly; and a great company of the priests were obedient to the faith.",
  },
  "Acts 6:1-8": {
    translation: "KJV",
    text: "And in those days, when the number of the disciples was multiplied, there arose a murmuring of the Grecians against the Hebrews, because their widows were neglected in the daily ministration. … And Stephen, full of faith and power, did great wonders and miracles among the people.",
  },
  "Acts 7:51": {
    translation: "KJV",
    text: "Ye stiffnecked and uncircumcised in heart and ears, ye do always resist the Holy Ghost: as your fathers did, so do ye.",
  },
  "Acts 8:14-17": {
    translation: "KJV",
    text: "Now when the apostles which were at Jerusalem heard that Samaria had received the word of God, they sent unto them Peter and John: Who, when they were come down, prayed for them, that they might receive the Holy Ghost: (For as yet he was fallen upon none of them: only they were baptized in the name of the Lord Jesus.) Then laid they their hands on them, and they received the Holy Ghost.",
  },
  "Acts 9:1-22": {
    translation: "KJV",
    text: "And Saul, yet breathing out threatenings and slaughter against the disciples of the Lord, went unto the high priest, And desired of him letters to Damascus to the synagogues, that if he found any of this way, whether they were men or women, he might bring them bound unto Jerusalem. And as he journeyed, he came near Damascus: and suddenly there shined round about him a light from heaven: And he fell to the earth, and heard a voice saying unto him, Saul, Saul, why persecutest thou me? And he said, Who art thou, Lord? And the Lord said, I am Jesus whom thou persecutest: it is hard for thee to kick against the pricks. … But Saul increased the more in strength, and confounded the Jews which dwelt at Damascus, proving that this is very Christ.",
  },
  "Acts 11:26": {
    translation: "KJV",
    text: "And when he had found him, he brought him unto Antioch. And it came to pass, that a whole year they assembled themselves with the church, and taught much people. And the disciples were called Christians first in Antioch.",
  },
  "Acts 12:2": {
    translation: "KJV",
    text: "And he killed James the brother of John with the sword.",
  },
  "Acts 14:23": {
    translation: "KJV",
    text: "And when they had ordained them elders in every church, and had prayed with fasting, they commended them to the Lord, on whom they believed.",
  },
  "Acts 15:13-21": {
    translation: "KJV",
    text: "And after they had held their peace, James answered, saying, Men and brethren, hearken unto me: Simeon hath declared how God at the first did visit the Gentiles, to take out of them a people for his name. And to this agree the words of the prophets; as it is written, After this I will return, and will build again the tabernacle of David, which is fallen down; and I will build again the ruins thereof, and I will set it up: … Wherefore my sentence is, that we trouble not them, which from among the Gentiles are turned to God: But that we write unto them, that they abstain from pollutions of idols, and from fornication, and from things strangled, and from blood. For Moses of old time hath in every city them that preach him, being read in the synagogues every sabbath day.",
  },
  "Acts 15:28": {
    translation: "KJV",
    text: "For it seemed good to the Holy Ghost, and to us, to lay upon you no greater burden than these necessary things;",
  },
  "Acts 15:28-29": {
    translation: "KJV",
    text: "For it seemed good to the Holy Ghost, and to us, to lay upon you no greater burden than these necessary things; That ye abstain from meats offered to idols, and from blood, and from things strangled, and from fornication: from which if ye keep yourselves, ye shall do well. Fare ye well.",
  },
  "Acts 16:15, 16": {
    translation: "KJV",
    text: "And when she was baptized, and her household, she besought us, saying, If ye have judged me to be faithful to the Lord, come into my house, and abide there. And she constrained us. And it came to pass, as we went to prayer, a certain damsel possessed with a spirit of divination met us, which brought her masters much gain by soothsaying:",
  },
  "Acts 20:7": {
    translation: "KJV",
    text: "And upon the first day of the week, when the disciples came together to break bread, Paul preached unto them, ready to depart on the morrow; and continued his speech until midnight.",
  },
  "Acts 21:18": {
    translation: "KJV",
    text: "And the day following Paul went in with us unto James; and all the elders were present.",
  },

  // ---------- Romans ----------
  "Rom 6:3-4": {
    translation: "KJV",
    text: "Know ye not, that so many of us as were baptized into Jesus Christ were baptized into his death? Therefore we are buried with him by baptism into death: that like as Christ was raised up from the dead by the glory of the Father, even so we also should walk in newness of life.",
  },

  // ---------- 1 Corinthians ----------
  "1Cor 1:16": {
    translation: "KJV",
    text: "And I baptized also the household of Stephanas: besides, I know not whether I baptized any other.",
  },
  "1Cor 12:3": {
    translation: "KJV",
    text: "Wherefore I give you to understand, that no man speaking by the Spirit of God calleth Jesus accursed: and that no man can say that Jesus is the Lord, but by the Holy Ghost.",
  },
  "1Cor 16:2": {
    translation: "KJV",
    text: "Upon the first day of the week let every one of you lay by him in store, as God hath prospered him, that there be no gatherings when I come.",
  },

  // ---------- 2 Corinthians ----------
  "2Cor 5:18-19": {
    translation: "KJV",
    text: "And all things are of God, who hath reconciled us to himself by Jesus Christ, and hath given to us the ministry of reconciliation; To wit, that God was in Christ, reconciling the world unto himself, not imputing their trespasses unto them; and hath committed unto us the word of reconciliation.",
  },

  // ---------- Galatians ----------
  "Gal 3:27": {
    translation: "KJV",
    text: "For as many of you as have been baptized into Christ have put on Christ.",
  },

  // ---------- Ephesians ----------
  "Eph 4:4-6": {
    translation: "KJV",
    text: "There is one body, and one Spirit, even as ye are called in one hope of your calling; One Lord, one faith, one baptism, One God and Father of all, who is above all, and through all, and in you all.",
  },

  // ---------- 1 Thessalonians ----------
  "1Thess 5:17": {
    translation: "KJV",
    text: "Pray without ceasing.",
  },

  // ---------- 1 Timothy ----------
  "1Tim 4:14": {
    translation: "KJV",
    text: "Neglect not the gift that is in thee, which was given thee by prophecy, with the laying on of the hands of the presbytery.",
  },

  // ---------- 2 Timothy ----------
  "2Tim 1:6": {
    translation: "KJV",
    text: "Wherefore I put thee in remembrance that thou stir up the gift of God, which is in thee by the putting on of my hands.",
  },

  // ---------- Titus ----------
  "Titus 1:5": {
    translation: "KJV",
    text: "For this cause left I thee in Crete, that thou shouldest set in order the things that are wanting, and ordain elders in every city, as I had appointed thee:",
  },
  "Titus 1:5-7": {
    translation: "KJV",
    text: "For this cause left I thee in Crete, that thou shouldest set in order the things that are wanting, and ordain elders in every city, as I had appointed thee: If any be blameless, the husband of one wife, having faithful children not accused of riot or unruly. For a bishop must be blameless, as the steward of God; not selfwilled, not soon angry, not given to wine, no striker, not given to filthy lucre;",
  },
  "Titus 1:6": {
    translation: "KJV",
    text: "If any be blameless, the husband of one wife, having faithful children not accused of riot or unruly.",
  },
  "Titus 2:11": {
    translation: "KJV",
    text: "For the grace of God that bringeth salvation hath appeared to all men,",
  },
  "Titus 2:13": {
    translation: "KJV",
    text: "Looking for that blessed hope, and the glorious appearing of the great God and our Saviour Jesus Christ;",
  },
  "Titus 3:5": {
    translation: "KJV",
    text: "Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost;",
  },

  // ---------- Hebrews ----------
  "Heb 6:2": {
    translation: "KJV",
    text: "Of the doctrine of baptisms, and of laying on of hands, and of resurrection of the dead, and of eternal judgment.",
  },

  // ---------- 1 Peter ----------
  "1Pet 3:21": {
    translation: "KJV",
    text: "The like figure whereunto even baptism doth also now save us (not the putting away of the filth of the flesh, but the answer of a good conscience toward God,) by the resurrection of Jesus Christ:",
  },

  // ---------- 1 John ----------
  "1John 1:9": {
    translation: "KJV",
    text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
  },
  "1John 2:2": {
    translation: "KJV",
    text: "And he is the propitiation for our sins: and not for ours only, but also for the sins of the whole world.",
  },
  "1John 2:20, 27": {
    translation: "KJV",
    text: "But ye have an unction from the Holy One, and ye know all things. … But the anointing which ye have received of him abideth in you, and ye need not that any man teach you: but as the same anointing teacheth you of all things, and is truth, and is no lie, and even as it hath taught you, ye shall abide in him.",
  },
  "1John 4:1": {
    translation: "KJV",
    text: "Beloved, believe not every spirit, but try the spirits whether they are of God: because many false prophets are gone out into the world.",
  },
  "1John 4:8": {
    translation: "KJV",
    text: "He that loveth not knoweth not God; for God is love.",
  },

  // ---------- Revelation ----------
  "Rev 1:10": {
    translation: "KJV",
    text: "I was in the Spirit on the Lord's day, and heard behind me a great voice, as of a trumpet,",
  },
};

// --- Lookup -----------------------------------------------------------------

/**
 * Return the stored verse for a reference, or null if not found.
 * Tries the exact normalized key, then a few fuzzy fallbacks (commas
 * normalized to no-space, hyphens collapsed, etc.).
 */
export function getScriptureText(reference: string): BibleVerse | null {
  const key = normalizeRef(reference);
  if (VERSES[key]) return VERSES[key];

  // Try a comma-normalized variant ("X, Y" <-> "X,Y").
  const tight = key.replace(/,\s*/g, ", ");
  if (VERSES[tight]) return VERSES[tight];
  const loose = key.replace(/,\s*/g, ",");
  if (VERSES[loose]) return VERSES[loose];

  return null;
}
