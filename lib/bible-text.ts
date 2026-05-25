// Bible-text lookup for the Orthodox Apologist curriculum.
//
// Translation policy (per project spec):
//   1. EOB-NT (Eastern Orthodox Bible NT) — preferred for NT; populated
//      from the Cleenewerck EOB NT (Patriarchal Text of 1904) by way of
//      github.com/mindiae/ourbible-sveltekit (EOB module).
//   2. EOB-OT — not yet incorporated; the official online EOB-OT site
//      (easternorthodoxbible.org) blocks programmatic fetches, and no
//      free mirror was located, so OT entries fall back to KJV.
//   3. LXX-NETS — public-domain LXX English; reserved for when its
//      wording is materially required (Psalms numbering, Deuterocanon).
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
// Text below is EOB-NT (Cleenewerck 2013, Patriarchal Text of 1904) for
// New Testament entries and public-domain KJV for Old Testament fallbacks.
// Quotation marks
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
    translation: "EOB-NT",
    text: "She will give birth to a son and you shall give him the name Jesus because he will be the one to save his people from their sins.”",
  },
  "Matt 1:23": {
    translation: "EOB-NT",
    text: "Behold, the virgin shall be with child and bring forth a son. They shall call his name Emmanuel; which means, ‘with us [is] God.’",
  },
  "Matt 3:16-17": {
    translation: "EOB-NT",
    text: "After he had been baptized, Jesus immediately came out of the water and behold, the heavens were opened to him. He saw the Spirit of God descending as a dove and coming down on him. And behold, a voice from heaven said: “This is my beloved Son, with whom I am well pleased!”",
  },
  "Matt 4:17": {
    translation: "EOB-NT",
    text: "From that time on, Jesus began to preach and to say, “Repent! For the Kingdom of Heaven is at hand.”",
  },
  "Matt 5:3-12": {
    translation: "EOB-NT",
    text: "Blessed are the poor in spirit, for theirs is the Kingdom of Heaven! Blessed are those who mourn, for they shall be comforted! Blessed are the meek, for they shall inherit the earth! Blessed are those who hunger and thirst after righteousness, for they shall be filled! Blessed are the merciful, for they shall obtain mercy! Blessed are the pure in heart, for they shall see God! Blessed are the peacemakers, for they shall be called children of God! Blessed are those who are persecuted for righteousness’ sake, for theirs is the Kingdom of Heaven! Blessed are you when people revile you, persecute you, and say all kinds of evil against you falsely for my sake! Rejoice, and be extremely glad, for great is your reward in heaven! Indeed, this is how they persecuted the prophets who were before you!",
  },
  "Matt 7:16": {
    translation: "EOB-NT",
    text: "You will recognize them by their fruits. Do you gather grapes from thorns, or figs from thistles?",
  },
  "Matt 8:14": {
    translation: "EOB-NT",
    text: "When Jesus came into Peter’s house, he saw Peter’s mother-in-law lying sick with a fever.",
  },
  "Matt 16:18": {
    translation: "EOB-NT",
    text: "I also tell you that you are Peter, and upon this rock I will build my Church, and the gates of hades will not prevail against it.",
  },
  "Matt 16:19": {
    translation: "EOB-NT",
    text: "I will give you the keys of the Kingdom of Heaven, and whatever you bind on earth will be bound in heaven; and whatever you loose on earth will be loosed in heaven.”",
  },
  "Matt 17:1-9": {
    translation: "EOB-NT",
    text: "Six days later, Jesus took with him Peter, James, and John his brother, and he brought them up into a high mountain by themselves. [There], he was transfigured before them. His face shone like the sun, and his garments became as white as the light. And behold, Moses and Elias (Elijah) appeared to them, talking with him. Peter then said to Jesus, “Lord, it is good for us to be here! If you want, let us make three tents here: one for you, one for Moses, and one for Elias (Elijah).” … As they were coming down from the mountain, Jesus gave them this order: “Do not tell anyone what you saw, until the Son of Man has risen again from the dead.”",
  },
  "Matt 19:4-6": {
    translation: "EOB-NT",
    text: "Jesus answered, “Have you not read that he who made them from the beginning made them male and female, and said, ‘For this reason, a man shall leave his father and mother and shall be attached to his wife; and the two shall become one flesh?’ And so, they are no longer two, but one flesh! Therefore, what God has joined together, let no one tear apart.”",
  },
  "Matt 19:4-12": {
    translation: "EOB-NT",
    text: "Jesus answered, “Have you not read that he who made them from the beginning made them male and female, and said, ‘For this reason, a man shall leave his father and mother and shall be attached to his wife; and the two shall become one flesh?’ And so, they are no longer two, but one flesh! Therefore, what God has joined together, let no one tear apart.” … But Jesus said to them, “Not all men can receive this saying: only those to whom it is given. Certainly, there are eunuchs who were born that way from their mother’s womb. There are also eunuchs who were made eunuchs by men, and there are eunuchs who made themselves eunuchs for the sake of the Kingdom of Heaven. He who is able to receive this saying, let him receive it.”",
  },
  "Matt 22:30": {
    translation: "EOB-NT",
    text: "For in the resurrection, people neither marry nor are given in marriage, but they are like the angels of God in heaven.",
  },
  "Matt 23:37": {
    translation: "EOB-NT",
    text: "Jerusalem, Jerusalem, who kills the prophets and stones those who are sent to her! How often have I desired to gather your children, just as a hen gathers her brood under her wings; but you were not willing!",
  },
  "Matt 25:34-40": {
    translation: "EOB-NT",
    text: "Then the King will tell those on his right hand, ‘Come, you blessed of my Father! Inherit the Kingdom prepared for you since the foundation of the world! For I was hungry and you gave me food to eat; I was thirsty and you gave me drink; I was a stranger and you took me in. I was naked and you clothed me; I was sick and you visited me; I was in prison, and you came to me.’ … The King will answer them, ‘Amen, I tell you: as much as you did it to one of the least of these my brethren, you did it to me.’",
  },
  "Matt 27:35, 43, 46": {
    translation: "EOB-NT",
    text: "After crucifying him, they divided his clothing among them, casting lots.’ … He trusts in God! Let God deliver him now, if he wants him; for he said, ‘I am the Son of God.’” … About the ninth hour, Jesus cried with a loud voice, “Eli, Eli, lima sabachthani?” That is, “My God, my God, why have you forsaken me?”",
  },
  "Matt 28:9-10": {
    translation: "EOB-NT",
    text: "As they went to tell his disciples, behold, Jesus met them, saying, “Rejoice!” They came forward and took hold of his feet, and expressed adoration to him. Then Jesus said to them, “Do not be afraid! Go tell my brethren that they should go into Galilee. There, they will see me.”",
  },
  "Matt 28:19": {
    translation: "EOB-NT",
    text: "Go [therefore] and make disciples of all nations, baptizing them in the Name of the Father and of the Son and of the Holy Spirit,",
  },
  "Matt 28:19-20": {
    translation: "EOB-NT",
    text: "Go [therefore] and make disciples of all nations, baptizing them in the Name of the Father and of the Son and of the Holy Spirit, teaching them to observe all the things that I have commanded you. Behold, I am with you always, even to the end of the age.” Amen!",
  },
  "Matt 28:20": {
    translation: "EOB-NT",
    text: "teaching them to observe all the things that I have commanded you. Behold, I am with you always, even to the end of the age.” Amen!",
  },

  // ---------- Mark ----------
  "Mark 2:17": {
    translation: "EOB-NT",
    text: "When Jesus heard it, he replied to them, “Those who are healthy have no need for a physician, but those who are sick do. I came not to call the righteous, but sinners to repentance.”",
  },
  "Mark 6:13": {
    translation: "EOB-NT",
    text: "They also cast out many demons and anointed with oil many people who were sick and healed them.",
  },
  "Mark 9:24": {
    translation: "EOB-NT",
    text: "Immediately the father of the child cried out with tears, “I believe! Help my unbelief!”",
  },
  "Mark 16:9": {
    translation: "EOB-NT",
    text: "Now after Jesus had risen early on the first day of the week, he appeared first to Mary Magdalene, from whom he had cast out seven demons.",
  },

  // ---------- Luke ----------
  "Luke 1:46-47": {
    translation: "EOB-NT",
    text: "Mary said, My soul magnifies the Lord And my spirit has rejoiced in God my Savior,",
  },
  "Luke 1:48": {
    translation: "EOB-NT",
    text: "for he has looked at the humble state of his handmaid. For behold, from now on, all generations shall call me blessed!",
  },
  "Luke 5:31": {
    translation: "EOB-NT",
    text: "Jesus answered them, “Those who are healthy have no need for a physician, but those who are sick do!",
  },
  "Luke 10:1-20": {
    translation: "EOB-NT",
    text: "After these things, the Lord also appointed seventy others and sent them two by two ahead of him into every city and place where he was about to go. Then he said to them, “The harvest is indeed plentiful, but the laborers are few. Pray therefore to the Lord of the harvest, that he may send out laborers into his harvest. Go on your ways, [but] be aware that I am sending you out as lambs among wolves. … Nevertheless, do not rejoice in this, that the spirits are subject to you; but rejoice that your names are written in heaven.”",
  },
  "Luke 15:5": {
    translation: "EOB-NT",
    text: "And when he has found it, he carries it on his shoulders, rejoicing!",
  },
  "Luke 16:19-31": {
    translation: "EOB-NT",
    text: "Now there was a certain rich man who was clothed in purple and fine linen, feasting in luxury every day. A certain beggar named Lazarus was laid at his gate, full of sores, who desired to be fed with the crumbs that fell from the rich man’s table. Yes, even dogs came and licked his sores. … Then Abraham said to him, ‘If they do not listen to Moses and the prophets, neither will they be convinced if someone rises from the dead.’”",
  },
  "Luke 18:13, 38": {
    translation: "EOB-NT",
    text: "But the tax collector, standing far aside, would not even lift up his eyes to heaven. Instead, he beat his breast, saying, ‘God, be merciful to me, a sinner!’ … He began to cry out, “Jesus, son of David, have mercy on me!”",
  },
  "Luke 20:38": {
    translation: "EOB-NT",
    text: "Now he is not the God of the dead, but of the living, because all are alive to him!”",
  },
  "Luke 22:19": {
    translation: "EOB-NT",
    text: "And having taken bread and given thanks, he broke it and gave [it] to them, saying, “This is my body which is given for you. Do this in memory of me.”",
  },
  "Luke 22:42": {
    translation: "EOB-NT",
    text: "saying, “Father, if you are willing, take this cup away from me. Nevertheless, not my will, but yours, be done.”",
  },
  "Luke 23:42-43": {
    translation: "EOB-NT",
    text: "He then said to Jesus, “Lord, remember me when you come in your Kingdom.” And Jesus said to him, “Amen, I tell you: today, you will be with me in Paradise.”",
  },

  // ---------- John ----------
  "John 1:1": {
    translation: "EOB-NT",
    text: "In the beginning was the Word, and the Word was with God, and the Word was {what} God {was}.",
  },
  "John 1:1-3": {
    translation: "EOB-NT",
    text: "In the beginning was the Word, and the Word was with God, and the Word was {what} God {was}. This one was in the beginning with God. All things came into being through him, and without him, nothing came into being that has come into being.",
  },
  "John 1:1-14": {
    translation: "EOB-NT",
    text: "In the beginning was the Word, and the Word was with God, and the Word was {what} God {was}. This one was in the beginning with God. All things came into being through him, and without him, nothing came into being that has come into being. In him was life, life that was the light of mankind. The light shines in the darkness, and the darkness has not overcome it. … The Word became flesh and made his dwelling among us. We beheld his glory, glory as a Father’s uniquely-begotten son, full of grace and truth.",
  },
  "John 1:1-18": {
    translation: "EOB-NT",
    text: "In the beginning was the Word, and the Word was with God, and the Word was {what} God {was}. This one was in the beginning with God. All things came into being through him, and without him, nothing came into being that has come into being. In him was life, life that was the light of mankind. … The Word became flesh and made his dwelling among us. We beheld his glory, glory as a Father’s uniquely-begotten son, full of grace and truth. … No one has seen God at any time. The uniquely-begotten Son who is in the bosom of the Father, he has explained him.",
  },
  "John 1:41": {
    translation: "EOB-NT",
    text: "He first found his own brother, Simon and said to him, “We have found the Messiah!” (which translated means Christ).",
  },
  "John 1:46": {
    translation: "EOB-NT",
    text: "Nathanael asked him, “Can anything good come out of Nazareth?” Philip replied, “Come and see!”",
  },
  "John 3:5": {
    translation: "EOB-NT",
    text: "Jesus answered, “Amen, amen, I tell you; unless one is born of water and spirit, he cannot enter into the Kingdom of God!",
  },
  "John 3:14": {
    translation: "EOB-NT",
    text: "And as Moses lifted up the serpent in the wilderness, likewise, the Son of Man must be lifted up,",
  },
  "John 6:53-66": {
    translation: "EOB-NT",
    text: "Jesus therefore said to them, “Amen, amen, I tell you; unless you eat the flesh of the Son of Man and drink his blood, you do not have life in yourselves. The one who eats my flesh and drinks my blood has eternal life, and I will raise him up on the last day. For my flesh is food indeed, and my blood is drink indeed. The one who eats my flesh and drinks my blood dwells in me, and I in him. … At this, many of his disciples left and no longer walked with him.",
  },
  "John 10:27": {
    translation: "EOB-NT",
    text: "My sheep hear my voice; I know them, and they follow me.",
  },
  "John 10:30": {
    translation: "EOB-NT",
    text: "I and the Father are one.”",
  },
  "John 12:24": {
    translation: "EOB-NT",
    text: "Amen, amen, I tell you; unless a grain of wheat falls into the earth and dies, it remains by itself a single seed. But if it dies, it bears much fruit!",
  },
  "John 15:5": {
    translation: "EOB-NT",
    text: "I am the vine, you [are] the branches! Whoever remains in me and I in him bears much fruit, for apart from me, you can do nothing.",
  },
  "John 15:6": {
    translation: "EOB-NT",
    text: "Anyone who does not remain in me is thrown out as a branch and is withered. Such branches are gathered, thrown into the fire, and burned!",
  },
  "John 15:26": {
    translation: "EOB-NT",
    text: "But when the Counselor has come, whom I will send to you from the Father, the Spirit of truth who proceeds from the Father, he will bear witness to me.",
  },
  "John 17:21-23": {
    translation: "EOB-NT",
    text: "so that they may all be one; even as you, Father, are in me, and I in you. May they be one in us, so that the world may believe that you sent me. The glory which you have given me, I have given to them, so that they may be one even as we are one; I in them, and you in me. May they be perfected into one, so that the world may know that you sent me, and [that you have] loved them, even as you have loved me.",
  },
  "John 17:21-24": {
    translation: "EOB-NT",
    text: "so that they may all be one; even as you, Father, are in me, and I in you. May they be one in us, so that the world may believe that you sent me. The glory which you have given me, I have given to them, so that they may be one even as we are one; I in them, and you in me. May they be perfected into one, so that the world may know that you sent me, and [that you have] loved them, even as you have loved me. Father, I desire that those whom you have given me would be with me where I am, so that they may see my glory which you have given me, for you loved me before the foundation of the world.",
  },
  "John 19:23-24": {
    translation: "EOB-NT",
    text: "After the soldiers had crucified Jesus, they took his garments and divided them into four parts, to every soldier a part; with the tunic remaining. Now the tunic was without seam, woven from the top throughout. Then they said to one another, “Let us not tear it, but cast lots for it to decide whose it will be!” This was to fulfill the Scripture which says: They have divided my garments among them and for my cloak they cast lots. And this is what the soldiers did.",
  },
  "John 19:26-27": {
    translation: "EOB-NT",
    text: "When Jesus saw his mother and the disciple whom he loved standing there, he said to his mother, “Woman, behold your son!” Then he said to the disciple, “Behold, your mother!” And from that hour, the disciple took her to his own home.",
  },
  "John 20:11-18": {
    translation: "EOB-NT",
    text: "However, Mary remained standing outside the tomb, weeping. As she was crying, she stooped to look inside the tomb, and saw two angels in white, sitting where the body of Jesus had been, one at the head, and one at the feet. … Jesus said to her, “Do not hold me, for I have not yet ascended to my Father. But go to my brethren and tell them, ‘I am ascending to my Father and your Father, to my God and your God.’” Mary Magdalene came and told the disciples that she had seen the Lord, and that he had said these things to her.",
  },
  "John 20:21-23": {
    translation: "EOB-NT",
    text: "Then again, Jesus said, “Peace be with you! As the Father has sent me, I also send you.” When he had said this, he breathed on them and told them, “Receive the Holy Spirit! If you forgive anyone’s sins, they are forgiven; if you retain anyone’s sins, they are retained.”",
  },
  "John 20:22-23": {
    translation: "EOB-NT",
    text: "When he had said this, he breathed on them and told them, “Receive the Holy Spirit! If you forgive anyone’s sins, they are forgiven; if you retain anyone’s sins, they are retained.”",
  },
  "John 20:28": {
    translation: "EOB-NT",
    text: "And Thomas answered him, “My Lord and my God!”",
  },

  // ---------- Acts ----------
  "Acts 1:6-11": {
    translation: "EOB-NT",
    text: "Therefore, when they had come together, they asked him, “Lord, are you now restoring the kingdom to Israel?” Jesus told them, “It is not for you to know the times or seasons which the Father has set by his own authority. However, you will receive power when the Holy Spirit has come upon you, and you will be my witnesses in Jerusalem, in all Judea and Samaria, and to the ends of the earth.” After saying these things, as they were watching, Jesus was taken up and a cloud took him out of their sight. While they were gazing into the sky as he was going, behold, two men in white clothing stood by them. They said, “Men of Galilee, why do you stand gazing into the sky? This Jesus, who was taken up from you into the sky will come back in the same way as you saw him going into heaven.”",
  },
  "Acts 1:15-26": {
    translation: "EOB-NT",
    text: "In those days, Peter stood up among the disciples (and the number of names was about one hundred twenty) and said: “Brethren, it was necessary that this Scripture should be fulfilled, which the Holy Spirit had spoken beforehand by the mouth of David concerning Judas, who became a guide to those who arrested Jesus. … And they cast lots for them, and the lot fell on Matthias, and he was added to the eleven apostles.",
  },
  "Acts 1:21-22": {
    translation: "EOB-NT",
    text: "Therefore, of the men who have accompanied us all the time that the Lord Jesus went in and out among us, beginning from the baptism of John and to the day that he was taken up from us, of these [men], one must become a witness with us of his resurrection.”",
  },
  "Acts 2:1-4": {
    translation: "EOB-NT",
    text: "Now when the day of Pentecost came, they were all with one accord [gathered] in the same place. Suddenly, there came from heaven a sound like the rushing of a mighty wind, and it filled the whole house where they were sitting. Divided tongues that seemed like fire appeared and one [tongue] rested on each of them. Then they were all filled with the Holy Spirit and began to speak in other languages, as the Spirit gave them the ability to speak.",
  },
  "Acts 2:4-11": {
    translation: "EOB-NT",
    text: "Then they were all filled with the Holy Spirit and began to speak in other languages, as the Spirit gave them the ability to speak. At that time {of year}, devout Jews from every nation under heaven were staying in Jerusalem. … Cretans and Arabians: we hear them speaking in our languages [concerning] the deeds of power of God!”",
  },
  "Acts 2:6-11": {
    translation: "EOB-NT",
    text: "When this sound was heard, a crowd formed and people were bewildered because everyone heard the disciples speaking in his own language. They were all amazed and marveled, saying to one another, “Behold, are not all these who speak Galileans? … Cretans and Arabians: we hear them speaking in our languages [concerning] the deeds of power of God!”",
  },
  "Acts 2:32-36": {
    translation: "EOB-NT",
    text: "God has raised this Jesus [back to life], and we are all witnesses of this fact. Being therefore exalted by the right hand of God and having received from the Father the promise of the Holy Spirit, he has poured out what you now see and hear. … Therefore, let all the house of Israel know with assurance that God has made him both Lord and Christ, this Jesus whom you crucified.”",
  },
  "Acts 2:38": {
    translation: "EOB-NT",
    text: "Peter said to them, “Repent, and be baptized, every one of you, in the Name of Jesus Christ, for the forgiveness of sins, and you will receive the gift of the Holy Spirit.",
  },
  "Acts 2:38, 41": {
    translation: "EOB-NT",
    text: "Peter said to them, “Repent, and be baptized, every one of you, in the Name of Jesus Christ, for the forgiveness of sins, and you will receive the gift of the Holy Spirit. … Then those who gladly received his word were baptized, and about three thousand souls were added on that day.",
  },
  "Acts 2:42": {
    translation: "EOB-NT",
    text: "They devoted themselves to the apostles’ teaching and fellowship, to the breaking of bread, and to the prayers.",
  },
  "Acts 4:26": {
    translation: "EOB-NT",
    text: "The kings of the earth take a stand, and the rulers take council together, against the Lord, and against his Christ.",
  },
  "Acts 5:29": {
    translation: "EOB-NT",
    text: "But Peter and the apostles answered, “We must obey God rather than men!",
  },
  "Acts 6:1-7": {
    translation: "EOB-NT",
    text: "Now in those days, when the number of the disciples was multiplying, a complaint arose from the Hellenists against the Hebrews, because their widows were neglected in the daily service [of food distribution]. … They presented these men to the apostles, who prayed and laid their hands on them. Thus, the word of God spread and the number of disciples greatly multiplied in Jerusalem, and a large number of Jews became obedient to the faith.",
  },
  "Acts 6:1-8": {
    translation: "EOB-NT",
    text: "Now in those days, when the number of the disciples was multiplying, a complaint arose from the Hellenists against the Hebrews, because their widows were neglected in the daily service [of food distribution]. … Full of faith and power, Stephen performed great wonders and signs among the people.",
  },
  "Acts 7:51": {
    translation: "EOB-NT",
    text: "You stiff-necked and uncircumcised in heart and ears, you always resist the Holy Spirit! As your fathers did, you do likewise.",
  },
  "Acts 8:14-17": {
    translation: "EOB-NT",
    text: "Now when the apostles who were at Jerusalem heard that Samaria had accepted the word of God, they sent Peter and John to them. When they arrived, they prayed for the people, so that they might receive [the] Holy Spirit because the Holy Spirit had not yet come upon any of them. (They had only been baptized in the Name of the Lord Jesus). Then Peter and John laid their hands on them, and they received [the] Holy Spirit.",
  },
  "Acts 9:1-22": {
    translation: "EOB-NT",
    text: "But Saul, still breathing threats and slaughter against the disciples of the Lord, went to the high priest. He asked him for letters to the synagogues of Damascus, [giving permission] that if he found anyone who belonged to ‘the Way,’ whether men or women, he might bring them bound to Jerusalem. As Saul was on his journey and approaching Damascus, a light from heaven suddenly shone around him. He fell on the earth and heard a voice saying to him, “Saul, Saul, why are you persecuting me?” He asked, “Who are you, Lord?” The Lord answered, “I am Jesus, whom you are persecuting. … But Saul grew even more in strength and confounded the Jews who lived at Damascus by proving that [Jesus] is the Christ.",
  },
  "Acts 11:26": {
    translation: "EOB-NT",
    text: "and when he found him, he brought him to Antioch. So it was that for a whole year, they assembled with the Church and taught many people. The disciples were first called Christians in Antioch.",
  },
  "Acts 12:2": {
    translation: "EOB-NT",
    text: "He had James, the brother of John, killed with the sword.",
  },
  "Acts 14:23": {
    translation: "EOB-NT",
    text: "After appointing presbyters for them in every Church, with prayer and fasting, Paul and Barnabas committed them to the Lord in whom they placed their trust.",
  },
  "Acts 15:13-21": {
    translation: "EOB-NT",
    text: "When they had finished, James said, “Brethren, listen to me! Simeon has reported how God first showed concern toward the Gentiles in order to take from them a people for his Name. This agrees with the words of the prophets. As it is written: ‘After these things I will return. I will again build the tabernacle of David, which has fallen. I will again build its ruins. I will set it up, … Therefore, I judge that we should not trouble those who turn to God from among the Gentiles. Instead, we should write to them to abstain from the pollution of idols, from sexual immorality, from what is strangled, and from blood. For from generations of old, Moses has had in every city those who preach him, being read every Sabbath in the synagogues.”",
  },
  "Acts 15:28": {
    translation: "EOB-NT",
    text: "It has seemed good to the Holy Spirit and to us to impose no greater burden on you than what is necessary:",
  },
  "Acts 15:28-29": {
    translation: "EOB-NT",
    text: "It has seemed good to the Holy Spirit and to us to impose no greater burden on you than what is necessary: that you abstain from things sacrificed to idols, from blood, from the meat of strangled animals and from sexual immorality. If you abstain from these things, it will be well with you. Farewell!”",
  },
  "Acts 16:15, 16": {
    translation: "EOB-NT",
    text: "When she and her household were baptized, she begged us, “If you have judged me to be faithful to the Lord, come into my house and stay!” And so, she persuaded us. As we were going to prayer, it happened that we encountered a certain girl who had a spirit of divination and who produced much profit to her masters by fortune telling.",
  },
  "Acts 20:7": {
    translation: "EOB-NT",
    text: "On the first day of the week, when the disciples were gathered together to break bread, Paul talked with them. Since he intended to depart on the next day, he continued his speech until midnight.",
  },
  "Acts 21:18": {
    translation: "EOB-NT",
    text: "The next day, Paul went with us to visit James, and all the presbyters were present.",
  },

  // ---------- Romans ----------
  "Rom 6:3-4": {
    translation: "EOB-NT",
    text: "Or do you not know that all {of us} we who were baptized into Christ Jesus were baptized into his death? And so, we were buried with him through baptism to death, so that just as Christ was raised from the dead by the glory of the Father, [likewise] we might also walk in newness of life.",
  },

  // ---------- 1 Corinthians ----------
  "1Cor 1:16": {
    translation: "EOB-NT",
    text: "(I also baptized the household of Stephanas; besides them, I do not know whether I baptized any other.)",
  },
  "1Cor 12:3": {
    translation: "EOB-NT",
    text: "Therefore, I want you to understand that no one speaking by God’s Spirit calls Jesus accursed. No one can say that Jesus is Lord, except by the Holy Spirit.",
  },
  "1Cor 16:2": {
    translation: "EOB-NT",
    text: "On the first day of the week, each one of you should put aside and save according to God’s blessing, so that no collections be made when I come.",
  },

  // ---------- 2 Corinthians ----------
  "2Cor 5:18-19": {
    translation: "EOB-NT",
    text: "But all things are of God, who reconciled us to himself through Jesus Christ and who gave to us the ministry of reconciliation. What I mean is that God was reconciling the world to himself in Christ, not imputing sins, but having entrusted us with the word of reconciliation.",
  },

  // ---------- Galatians ----------
  "Gal 3:27": {
    translation: "EOB-NT",
    text: "For as many of you as have been baptized into Christ have put on Christ.",
  },

  // ---------- Ephesians ----------
  "Eph 4:4-6": {
    translation: "EOB-NT",
    text: "There is one body and one Spirit, even as you also were called to one hope when you were called; one Lord, one faith, one baptism, one God and Father of all, who is over all, and through all, and in us all.",
  },

  // ---------- 1 Thessalonians ----------
  "1Thess 5:17": {
    translation: "EOB-NT",
    text: "Pray without ceasing.",
  },

  // ---------- 1 Timothy ----------
  "1Tim 4:14": {
    translation: "EOB-NT",
    text: "Do not neglect the gift that is in you, which was given to you by prophecy with the laying on of the hands of the council of presbyters.",
  },

  // ---------- 2 Timothy ----------
  "2Tim 1:6": {
    translation: "EOB-NT",
    text: "For this reason, I am reminding you to rekindle the gift of God which is in you through the laying on of my hands.",
  },

  // ---------- Titus ----------
  "Titus 1:5": {
    translation: "EOB-NT",
    text: "I left you in Crete for this reason: that you would set in order the things that were amiss and appoint presbyters in every city, as I directed you:",
  },
  "Titus 1:5-7": {
    translation: "EOB-NT",
    text: "I left you in Crete for this reason: that you would set in order the things that were amiss and appoint presbyters in every city, as I directed you: someone who is blameless, the husband of one wife, whose children believe and are not accused of loose or unruly behavior. Indeed, the overseer must be beyond reproach, as God’s steward; not self-pleasing, not easily angered, not someone who abuses wine, not violent and not greedy for dishonest gain.",
  },
  "Titus 1:6": {
    translation: "EOB-NT",
    text: "someone who is blameless, the husband of one wife, whose children believe and are not accused of loose or unruly behavior.",
  },
  "Titus 2:11": {
    translation: "EOB-NT",
    text: "Truly, the grace of God has appeared, bringing salvation to all.",
  },
  "Titus 2:13": {
    translation: "EOB-NT",
    text: "waiting for the blessed hope: the appearing of the glory of our great God and Savior Jesus Christ.",
  },
  "Titus 3:5": {
    translation: "EOB-NT",
    text: "(not by works of righteousness which we did ourselves, but according to his mercy), he saved us through the washing of regeneration and renewing of the Holy Spirit.",
  },

  // ---------- Hebrews ----------
  "Heb 6:2": {
    translation: "EOB-NT",
    text: "of the teaching of baptisms, of laying on of hands, of resurrection of the dead, and of eternal judgment.",
  },

  // ---------- 1 Peter ----------
  "1Pet 3:21": {
    translation: "EOB-NT",
    text: "This is an antitype of baptism, which now saves us. Baptism is not the putting away of the impurity of the flesh but the appeal of a good conscience {in your relationship} toward God through the resurrection of Jesus Christ.",
  },

  // ---------- 1 John ----------
  "1John 1:9": {
    translation: "EOB-NT",
    text: "If we confess our sins, he is faithful and righteous so that he will forgive us our sins and cleanse us from all unrighteousness.",
  },
  "1John 2:2": {
    translation: "EOB-NT",
    text: "He is the atoning sacrifice for our sins, and not only for ours but also for the whole world.",
  },
  "1John 2:20, 27": {
    translation: "EOB-NT",
    text: "You have an anointing from the Holy One and you perceive all things. … As for you, the anointing which you received from him remains in you, and you do not need anyone to teach you. But as the same anointing teaches you about all things, [his anointing] is true, not a lie. You will remain in him, just as the anointing has taught you.",
  },
  "1John 4:1": {
    translation: "EOB-NT",
    text: "Beloved, do not believe every spirit, but test the spirits to determine whether they are from God, because many false prophets have gone out into the world.",
  },
  "1John 4:8": {
    translation: "EOB-NT",
    text: "Whoever does not love does not know God, for God is love.",
  },

  // ---------- Revelation ----------
  "Rev 1:10": {
    translation: "EOB-NT",
    text: "I was in the Spirit on the Lord’s day and I heard behind me a loud voice, like a trumpet",
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
