// Special devotional content for the Great Feasts and major fixed
// commemorations. When today's date (MM-DD) matches an entry here, the
// daily devotional uses this in place of the seeded generic reading.
//
// Filled by the devotional-enrichment agent.
//
// NOTE: The four MOVABLE Great Feasts — Pascha, Palm Sunday (Entry into
// Jerusalem), the Ascension, and Pentecost — are reckoned from the Paschal
// cycle and have no fixed MM-DD date. They cannot be keyed here and are
// therefore intentionally omitted. The remaining eight Great Feasts fall on
// fixed civil (new-calendar) dates and are included below, together with a
// selection of major fixed commemorations.
//
// Scripture text is the EOB (Eastern / Greek Orthodox Bible) New Testament,
// fetched verbatim from the ourbible-sveltekit corpus.

export type FeastDevotional = {
  key: string; // "MM-DD" fixed-date, e.g. "12-25"
  title: string; // "The Nativity of our Lord and God and Savior Jesus Christ"
  rank: "great-feast" | "feast";
  scripture: { ref: string; text: string; translation: string };
  reflection: string; // 3–5 sentences of Orthodox reflection
  troparion: { title: string; text: string };
};

export const FEAST_DEVOTIONALS: FeastDevotional[] = [
  {
    key: "09-01",
    title: "The Beginning of the Indiction (Church New Year)",
    rank: "feast",
    scripture: {
      ref: "Luke 4:16-22",
      text:
        "He came to Nazareth, where he had been brought up. As was his custom, he entered into the synagogue on the Sabbath day and stood up to read. The scroll of the prophet Isaias (Isaiah) was handed to him. He opened the book, and found the place where it was written: The Spirit of the Lord is upon me, because he has anointed me to preach Good News to the poor. He has sent me to heal the brokenhearted, to proclaim release to the captives, recovery of sight to the blind, to deliver those who are crushed, and to proclaim the favorable year of the Lord. He closed the scroll, gave it back to the attendant, and sat down. The eyes of all in the synagogue were fastened on him. He began to tell them, “Today, this Scripture has been fulfilled in your hearing.” All testified about him and marveled at the gracious words which came out of his mouth; and they said, “Is this not Joseph’s son?”",
      translation: "EOB",
    },
    reflection:
      "On the first of September the Church begins her liturgical year, recalling the day on which Christ entered the synagogue at Nazareth and proclaimed “the favorable year of the Lord.” The whole cycle of feasts that unfolds from this day is not a mere calendar but the slow rehearsal of our salvation, year by year. To enter a new year in the Church is to be given again the time we so easily waste, now offered back as an occasion for repentance and growth. We ask the Creator of the seasons to bless the days ahead and to make them fruitful unto eternal life.",
    troparion: {
      title: "Troparion of the Indiction",
      text:
        "Creator of all things, You set the seasons and times by Your own authority. Bless the cycle of this year of Your goodness, O Lord, preserving in peace Your people and Your city through the intercessions of the Theotokos, and save us.",
    },
  },
  {
    key: "09-08",
    title: "The Nativity of our Most Holy Lady the Theotokos and Ever-Virgin Mary",
    rank: "great-feast",
    scripture: {
      ref: "Luke 1:39-49, 56",
      text:
        "In those days, Mary arose and went into the hill country with haste to a city of Judah. She entered into the house of Zacharias and greeted Elizabeth. And it happened that when Elizabeth heard Mary’s greeting, the baby leaped in her womb, and Elizabeth was filled with the Holy Spirit. In a loud voice, she exclaimed, “Blessed are you among women, and blessed is the fruit of your womb! Why am I so favored, that the mother of my Lord should come to me? For behold, when the voice of your greeting came to my ears, the baby leaped in my womb out of joy! Blessed is she who believed, for the things which have been spoken to her from the Lord will be fulfilled!” Mary said, My soul magnifies the Lord and my spirit has rejoiced in God my Savior, for he has looked at the humble state of his handmaid. For behold, from now on, all generations shall call me blessed! Indeed, he who is mighty has done great things for me, and Holy is his Name! Mary stayed with Elizabeth for about three months, and then returned to her house.",
      translation: "EOB",
    },
    reflection:
      "The Church year begins with a birth, for the first of the great feasts celebrates the nativity of her who would bear God. Born to the aged and barren Joachim and Anna, the child Mary is herself a fruit of prayer and promise, the answer to long-suffering faith. In her birth we glimpse the loosening of the curse of barrenness and the dawn of our salvation, for the vessel is now prepared in whom the Word will take flesh. The Church does not honor Mary apart from her Son, but precisely because through her the Son came to dwell among us.",
    troparion: {
      title: "Troparion of the Nativity of the Theotokos",
      text:
        "Your nativity, O Theotokos, has proclaimed joy to the whole world; for from you has shone forth the Sun of Righteousness, Christ our God, who, having annulled the curse, has bestowed a blessing, and, having abolished death, has granted us life everlasting.",
    },
  },
  {
    key: "09-14",
    title: "The Universal Exaltation of the Precious and Life-Giving Cross",
    rank: "great-feast",
    scripture: {
      ref: "John 19:6-11, 13-20, 25-28, 30-35",
      text:
        "But when the chief priests and the officers saw Jesus, they shouted, “Crucify! Crucify him!” Pilate answered, “Take him yourselves, and crucify him, for I find no basis for a charge against him.” The Jews insisted, “We have a law, and according to our law, he should die, because he made himself the Son of God.” However, when Pilate heard these words, he was even more afraid. Returning into the Praetorium, he asked Jesus, “Where are you from?” But Jesus gave him no answer. Then Pilate asked him, “Are you not speaking to me? Do you not know that I have the power to crucify you, and the power to release you?” Jesus answered, “You would have no power at all against me, unless it were given to you from above. Therefore, he who delivered me to you has a greater sin.” When Pilate heard this word, he brought Jesus out and sat down on the judgment seat at a place called “The Pavement,” and in Hebrew, “Gabbatha.” Now it was the Preparation Day of the Passover, at about the sixth hour. He said to the Jews, “Behold, your King!” But they shouted, “Away with him! Away with him! Crucify him!” Pilate asked them, “Shall I crucify your King?” The chief priests answered, “We have no king but Caesar!” And so, Pilate delivered Jesus to them to be crucified. Then the guards took Jesus and led him away. He went out, bearing his cross, to the place called “The Place of a Skull,” which is called in Hebrew, “Golgotha.” There they crucified him, and along with him two other men, one on each side and Jesus in the middle. Pilate also wrote a notice and had it placed on the cross. It read, “Jesus of Nazareth, the King of the Jews.” Many of the Jews read this inscription because the place where Jesus was crucified was near the city, and it was written in Hebrew, Greek, and Latin. But there were standing by the cross of Jesus his mother, and his mother’s sister (Mary the wife of Clopas), and Mary Magdalene. When Jesus saw his mother and the disciple whom he loved standing there, he said to his mother, “Woman, behold your son!” Then he said to the disciple, “Behold, your mother!” And from that hour, the disciple took her to his own home. After this, perceiving that all things were now accomplished, and so that the Scripture might be fulfilled, Jesus said, “I am thirsty.” Then, after Jesus received the sour wine, he said, “It is accomplished!” And he bowed his head and gave up his spirit. Because it was the Day of Preparation, in order that the bodies would not remain on the cross on the Sabbath (for that Sabbath was a great day), the Jews asked Pilate that the legs of those crucified might be broken, and that they might be removed. Therefore, the soldiers came and broke the legs of the first who had been crucified with Jesus, then the legs of the other. But when they came to Jesus and saw that he was already dead, they did not break his legs. However, one of the soldiers pierced his side with a spear, and immediately, blood and water came out. He who has seen this has borne witness, and his testimony is true.",
      translation: "EOB",
    },
    reflection:
      "On this day the Church lifts up the Cross for all to venerate, recalling its discovery by the Empress Helen in Jerusalem and its solemn elevation before the people. What the world counted as an instrument of shame the Christian honors as the throne of the King and the weapon of our peace. The Cross is not venerated for its own sake but because upon it the Lord trampled down death and reconciled heaven and earth. To exalt the Cross is to confess that the way of salvation passes through self-denial, and that life is found by those who take up their own cross and follow Christ.",
    troparion: {
      title: "Troparion of the Exaltation of the Cross",
      text:
        "O Lord, save Your people and bless Your inheritance. Grant victory to the faithful over their adversaries, and by the power of Your Cross protect Your commonwealth.",
    },
  },
  {
    key: "10-01",
    title: "The Protection of our Most Holy Lady the Theotokos (Pokrov)",
    rank: "feast",
    scripture: {
      ref: "Luke 10:38-42, 11:27-28",
      text:
        "Now it happened that as they went, Jesus entered into a village, and a certain woman named Martha received him into her house. She had a sister called Mary who also sat at Jesus’ feet and listened to his word. However, Martha was distracted with much serving. She came up to Jesus, and said, “Lord, do you not care that my sister has left me to serve alone? Ask her to help me!” But Jesus answered, “Martha, Martha, you are anxious and troubled about many things! Yet one thing is needed, and Mary has chosen the good part, which will not be taken away from her.” As Jesus was saying these things, a woman called out from the crowd and said to him, “Blessed is the womb that bore you, and the breasts which nursed you!” But Jesus said, “Yes, and more than that, blessed are those who hear the word of God and keep it.”",
      translation: "EOB",
    },
    reflection:
      "This feast commemorates the vision granted to St. Andrew the Fool-for-Christ in Constantinople, who beheld the Theotokos spreading her veil in prayer over the people in their hour of danger. It celebrates not a single deliverance only but the abiding intercession of the Mother of God, who stands continually before her Son on behalf of the world. Orthodox piety has always held that her prayers are mighty, for she is closest of all to Christ and holds nothing back from those who flee to her. In honoring her protection we confess that we do not stand alone, but are guarded by the prayers of the whole heavenly Church.",
    troparion: {
      title: "Troparion of the Protection",
      text:
        "Today the faithful celebrate the feast with joy, illumined by your coming, O Mother of God. Beholding your pure image, we fervently cry to you: Encompass us beneath the precious veil of your protection; deliver us from every form of evil by entreating Christ, your Son and our God, that He may save our souls.",
    },
  },
  {
    key: "11-08",
    title: "The Synaxis of the Holy Archangels Michael and Gabriel and the Bodiless Powers",
    rank: "feast",
    scripture: {
      ref: "Luke 10:16-21",
      text:
        "Whoever listens to you listens to me, and whoever rejects you rejects me. Whoever rejects me rejects the one who sent me.” The seventy returned with joy, saying, “Lord, even the demons are subject to us in your Name!” Jesus said to them, “I saw Satan having fallen like lightning from heaven! Behold, I give you authority to tread on serpents and scorpions, and over all the power of the enemy. Nothing will in any way hurt you. Nevertheless, do not rejoice in this, that the spirits are subject to you; but rejoice that your names are written in heaven.” In that same hour, Jesus rejoiced in the Holy Spirit and said, “I confess you, O Father, Lord of heaven and earth, that you have hidden these things from the wise and learned, and revealed them to little children. Yes, Father, for doing so was well-pleasing in your sight.”",
      translation: "EOB",
    },
    reflection:
      "The Church honors on this day the angelic hosts who stand before the throne of God, led by the Archangels Michael, the captain of the heavenly armies, and Gabriel, the herald of the Incarnation. The angels are not distant abstractions but ministering spirits sent to serve those who will inherit salvation, present in our worship and at the hour of our death. Their unwavering glorification of God is the pattern of our own prayer, for in the Liturgy we are joined to their endless hymn. To remember the bodiless powers is to be reminded that the visible world is but part of a far greater creation, all of it gathered around the praise of the Holy Trinity.",
    troparion: {
      title: "Troparion of the Archangels",
      text:
        "Commanders of the heavenly hosts, we who are unworthy beseech you, that by your prayers you may encircle us beneath the wings of your immaterial glory, and faithfully preserve us who fall down and cry to you: Deliver us from all harm, for you are the commanders of the powers on high.",
    },
  },
  {
    key: "11-21",
    title: "The Entry of our Most Holy Lady the Theotokos into the Temple",
    rank: "great-feast",
    scripture: {
      ref: "Luke 10:38-42, 11:27-28",
      text:
        "Now it happened that as they went, Jesus entered into a village, and a certain woman named Martha received him into her house. She had a sister called Mary who also sat at Jesus’ feet and listened to his word. However, Martha was distracted with much serving. She came up to Jesus, and said, “Lord, do you not care that my sister has left me to serve alone? Ask her to help me!” But Jesus answered, “Martha, Martha, you are anxious and troubled about many things! Yet one thing is needed, and Mary has chosen the good part, which will not be taken away from her.” As Jesus was saying these things, a woman called out from the crowd and said to him, “Blessed is the womb that bore you, and the breasts which nursed you!” But Jesus said, “Yes, and more than that, blessed are those who hear the word of God and keep it.”",
      translation: "EOB",
    },
    reflection:
      "According to holy tradition, Joachim and Anna brought the child Mary at the age of three to the Temple in Jerusalem, fulfilling their vow to dedicate her to God. The feast celebrates her entry into the very dwelling place of the Lord, where she was nourished and prepared to become herself the living Temple in whom the Word would dwell. The hymns of the day see in this small girl ascending the Temple steps the foreshadowing of the great mystery to come at the Nativity. Her dedication is also a summons to us, that we too should offer ourselves wholly to God and become a fitting habitation for His grace.",
    troparion: {
      title: "Troparion of the Entry of the Theotokos",
      text:
        "Today is the prelude of the good will of God, of the preaching of the salvation of mankind. The Virgin appears in the Temple of God, in anticipation proclaiming Christ to all. Let us rejoice and sing to her: Rejoice, O fulfillment of the Creator’s dispensation.",
    },
  },
  {
    key: "12-06",
    title: "Our Father among the Saints Nicholas the Wonderworker, Archbishop of Myra in Lycia",
    rank: "feast",
    scripture: {
      ref: "Luke 6:17-23",
      text:
        "He came down with them and stood on a level place. A number of his disciples and a great multitude of people from all Judea, Jerusalem, and the sea coast of Tyre and Sidon came to hear him and to be healed of their diseases. Those who were troubled by unclean spirits also came, and they were healed. The whole multitude desired to touch him because power came out from him and healed them all. Jesus looked up to his disciples, and said: Blessed are you who are poor, for yours is the Kingdom of God. Blessed are you who hunger now, for you will be filled. Blessed are you who weep now, for you will laugh. Blessed are you when men shall hate you, and when they shall exclude and mock you, and throw out your name as evil for the sake of the Son of Man. Rejoice in that day, and leap for joy, for behold, your reward is great in heaven, for their fathers did the same thing to the prophets.",
      translation: "EOB",
    },
    reflection:
      "St. Nicholas, bishop of Myra in the fourth century, is beloved across the Orthodox world as the model of the merciful shepherd. The accounts that surround him — the secret gifts that saved three girls from ruin, his defense of the unjustly condemned, his confession of the faith at Nicaea — all bear witness to a pastor whose orthodoxy of doctrine was matched by a fierce charity. He is called Wonderworker not because of spectacle but because the mercy of God flowed through him to the poor, the imprisoned, and the imperiled. In honoring him the Church holds up the truth that holiness shows itself above all in active, hidden love.",
    troparion: {
      title: "Troparion of St. Nicholas",
      text:
        "In truth you were revealed to your flock as a rule of faith, an image of humility, and a teacher of abstinence; your humility exalted you; your poverty enriched you. Hierarch Father Nicholas, intercede with Christ our God that our souls may be saved.",
    },
  },
  {
    key: "12-25",
    title: "The Nativity according to the Flesh of our Lord and God and Savior Jesus Christ",
    rank: "great-feast",
    scripture: {
      ref: "Matthew 2:1-12",
      text:
        "When Jesus was born in Bethlehem of Judea, in the days of King Herod, behold, wise men from the east came to Jerusalem, saying: “Where is the one who is born King of the Jews? Indeed, we have seen his star in the east and we have come to express adoration to him.” When King Herod heard about this, he was troubled, and all Jerusalem with him. Gathering together all the chief priests and scribes of the people, he asked them where the Christ would be born. They replied, “In Bethlehem of Judea, for this is written through the prophet: You Bethlehem, land of Judah, are in no way least among the rulers of Judah: for out of you shall come forth a ruler who will shepherd my people Israel.” Then Herod privately called the wise men, and learned from them exactly what time the star had appeared. He sent them to Bethlehem and said, “Go and search diligently for the young child. When you have found him, bring me word, so that I also may come and express adoration to him.” After listening to the king, they continued on their journey and behold, the star which they had seen in the east was going ahead of them, until it came and stood over the place where the young child was. When they saw the star, they were filled with tremendous joy. Entering the house, they saw the young child with Mary, his mother, and they fell down and expressed adoration to him. Opening their treasures, they offered him gifts of gold, frankincense and myrrh. But having been warned in a dream that they should not return to Herod, they returned to their own country using another way.",
      translation: "EOB",
    },
    reflection:
      "On this day the eternal Son of God, without ceasing to be God, is born of the Virgin and laid in a manger. The wonder of the feast is not merely that a child is born, but that the Creator enters His own creation, that the Infinite is held in the arms of His mother. The Magi from the East, guided by a star, show that the nations are called to worship Him, while Herod’s fear reveals the world’s enmity against its own salvation. The Church teaches that God became man so that man might become god by grace; in the cave of Bethlehem our deification has its beginning.",
    troparion: {
      title: "Troparion of the Nativity",
      text:
        "Your nativity, O Christ our God, has shone to the world the light of wisdom; for by it those who worshipped the stars were taught by a star to adore You, the Sun of Righteousness, and to know You, the Orient from on high. O Lord, glory to You.",
    },
  },
  {
    key: "01-01",
    title: "The Circumcision of our Lord and the Memory of St. Basil the Great",
    rank: "feast",
    scripture: {
      ref: "Luke 2:20-21, 40-52",
      text:
        "The shepherds returned, glorifying and praising God for all the things which they had heard and seen, just as it was told them. When the eight days were fulfilled and the time came for the circumcision of the child, he was named Jesus, the name given by the angel before he was conceived in the womb. The child was growing, and was becoming strong in spirit, being filled with wisdom, and the grace of God was upon him. His parents went every year to Jerusalem for the feast of the Passover. When Jesus was twelve years old, they went up to Jerusalem according to the custom of the feast. When they had fulfilled the days, as they were returning, the boy Jesus stayed behind in Jerusalem. Joseph and his mother did not notice it. Supposing him to be in the company, they went a day’s journey and began to look for him among their relatives and acquaintances. When they did not find him, they returned to Jerusalem, looking for him. After three days, they found him in the temple, sitting among the teachers, both listening to them and asking them questions. All who heard him were amazed by his understanding and answers. When his parents saw him, they were astonished, and his mother said to him, “Son, why have you treated us this way? Behold, your father and I were anxiously looking for you.” He said to them, “Why were you looking for me? Did you not know that I must be in my Father’s house?” But they did not understand what he said to them. After this, he went down with them, and came to Nazareth. He was obedient to them, and his mother kept all these sayings in her heart. And Jesus increased in wisdom and stature, as well as in favor with God and men.",
      translation: "EOB",
    },
    reflection:
      "On the eighth day after His birth the Lord submitted to circumcision according to the Law, showing that He came not to abolish but to fulfill, and that His Incarnation was no mere appearance but true flesh. On the same day the Church honors St. Basil the Great, the fourth-century bishop of Caesarea whose theological labors against Arianism and whose care for the poor shaped Orthodox life forever. In Basil the Church beholds the fruit of a soul obedient to God’s Law and conformed to Christ. The feast joins the humility of the Lord who subjected Himself to the Law with the holiness of the saint who served Him without reserve.",
    troparion: {
      title: "Troparion of St. Basil the Great",
      text:
        "Your proclamation has gone out into all the earth, which was divinely taught by hearing your voice. You expounded the nature of created things, you ennobled the manners of mankind. O holy father of royal priesthood, entreat Christ our God to grant us His great mercy.",
    },
  },
  {
    key: "01-06",
    title: "The Theophany of our Lord and God and Savior Jesus Christ",
    rank: "great-feast",
    scripture: {
      ref: "Matthew 3:13-17",
      text:
        "Then Jesus came from Galilee to the Jordan to be baptized by John. However, John would have prevented him, saying, “I need to be baptized by you, and it is you who come to me?” But Jesus answered and said to him, “Allow it for now, for it is fitting that in this way, we should fulfill all righteousness.” Then John allowed Jesus to be baptized. After he had been baptized, Jesus immediately came out of the water and behold, the heavens were opened to him. He saw the Spirit of God descending as a dove and coming down on him. And behold, a voice from heaven said: “This is my beloved Son, with whom I am well pleased!”",
      translation: "EOB",
    },
    reflection:
      "At the Jordan the sinless Lord descends into the waters to be baptized by John, not because He had need of cleansing, but to sanctify the waters and to take upon Himself the cleansing of the world. The feast is called Theophany, the manifestation of God, because here the Holy Trinity is revealed: the Son in the river, the Spirit descending as a dove, the Father bearing witness from heaven. What had been hidden is now made plain, that the God of Israel is Three Persons in one essence. Christians keep this day by the great blessing of the waters, for what was begun in the Jordan continues in every font where we are baptized into the death and life of Christ.",
    troparion: {
      title: "Troparion of Theophany",
      text:
        "When You were baptized in the Jordan, O Lord, the worship of the Trinity was made manifest; for the voice of the Father bore witness to You, calling You His beloved Son, and the Spirit in the form of a dove confirmed the truth of the word. O Christ our God, who has revealed Yourself and enlightened the world, glory to You.",
    },
  },
  {
    key: "02-02",
    title: "The Meeting of our Lord and God and Savior Jesus Christ in the Temple",
    rank: "great-feast",
    scripture: {
      ref: "Luke 2:22-40",
      text:
        "And when the days of their purification according to the law of Moses were fulfilled, Joseph and Mary brought him up to Jerusalem, to present him to the Lord. (For it is written in the law of the Lord, “Every male who opens the womb shall be called holy to the Lord”). They also brought him to offer a sacrifice according to what is said in the law of the Lord, “A pair of turtledoves, or two young pigeons.” Behold, there was a man in Jerusalem whose name was Simeon. This man was righteous and devout, waiting for the consolation of Israel, and the Holy Spirit was upon him. It had been revealed to him by the Holy Spirit that he would not see death before he had seen the Lord’s anointed. He came in the Spirit into the temple. The parents brought in the child Jesus in order to do according to the custom of the law concerning him. Then Simeon took Jesus in his arms and blessed God, saying, Now you let your servant depart in peace, Master, according to your word, for my eyes have seen your salvation, which you have prepared before the face of all peoples; a light to enlighten the Gentiles, and the glory of your people Israel. Joseph and his mother were wondering at the things which were spoken concerning him. Simeon blessed them and said to Mary, his mother, Behold, this child is set for the falling and the rising of many in Israel, and as a sign which is spoken against. Yes, a sword will pierce through your own soul, so that the thoughts of many hearts may be revealed. There was a certain Anna, a prophetess, the daughter of Phanuel, of the tribe of Asher, who did not depart from the temple, offering divine service with fastings and petitions night and day. Coming up at that very hour, she gave thanks to the Lord and spoke of Jesus to all those who were looking for redemption in Jerusalem. When Joseph and Mary had accomplished all things that were according to the law of the Lord, they returned into Galilee, to their own city, Nazareth. The child was growing, and was becoming strong in spirit, being filled with wisdom, and the grace of God was upon him.",
      translation: "EOB",
    },
    reflection:
      "Forty days after His birth the Lord is brought to the Temple, and the Old Covenant meets the New in the arms of the aged Simeon. The righteous elder, who had been promised that he would not die before seeing the Christ, receives the infant God and is at last released in peace. In this meeting the long waiting of Israel finds its fulfillment, for the One whom the prophets foretold is now present in the flesh. The feast teaches us to wait upon the Lord with Simeon’s patience and to greet Him, when He comes, with Simeon’s joy, recognizing in the lowly Child the salvation prepared before all peoples.",
    troparion: {
      title: "Troparion of the Meeting of the Lord",
      text:
        "Rejoice, O Virgin Theotokos, full of grace, for from you shone forth the Sun of Righteousness, Christ our God, enlightening those in darkness. Rejoice, O righteous Elder, for you received in your arms the Redeemer of our souls, who grants us resurrection.",
    },
  },
  {
    key: "03-25",
    title: "The Annunciation of our Most Holy Lady the Theotokos and Ever-Virgin Mary",
    rank: "great-feast",
    scripture: {
      ref: "Luke 1:26-38",
      text:
        "Now in the sixth month, the angel Gabriel was sent by God to a city of Galilee named Nazareth, to a virgin pledged to be married to a man whose name was Joseph, of the house of David. The virgin’s name was Mary. Having come in, the angel said to her, “Rejoice, full of grace! The Lord is with you! Blessed are you among women!” But when she saw him, she was greatly troubled at his saying and considered what kind of greeting this might be. The angel said to her, “Do not be afraid, Mary, for you have found favor with God. Behold, you will conceive in your womb and bring forth a son, and you will call his name ‘Jesus.’ He will be great and will be called the Son of the Most High. The Lord God will give him the throne of his father, David, and he will reign over the house of Jacob forever. And of his Kingdom there shall be no end.” Mary said to the angel, “How can this be happening to me, since I do not know a man?” The angel answered her, “The Holy Spirit will come upon you, and the power of the Most High will overshadow you. Therefore, the holy one who is born will be called the Son of God. Behold, your relative Elizabeth has also conceived a son in her old age and this is the sixth month of her pregnancy for her who was called barren. For nothing shall be impossible with God.” Mary said, “Behold, the handmaid of the Lord! Let it be to me according to your word.” And the angel departed from her.",
      translation: "EOB",
    },
    reflection:
      "On this day the Archangel Gabriel comes to a humble virgin of Nazareth and announces that she will bear the Son of God. The feast is the very beginning of our salvation, for at Mary’s free and humble assent — “Let it be to me according to your word” — the eternal Word takes flesh in her womb. The whole redemption of the world waited upon the consent of one human heart, and she did not withhold it. In her obedience we see undone the disobedience of Eve, and we learn that God will not save us without our own willing cooperation with His grace.",
    troparion: {
      title: "Troparion of the Annunciation",
      text:
        "Today is the beginning of our salvation, the revelation of the eternal mystery! The Son of God becomes the Son of the Virgin as Gabriel announces the coming of grace. Together with him let us cry to the Theotokos: Rejoice, O full of grace, the Lord is with you!",
    },
  },
  {
    key: "06-29",
    title: "The Holy, Glorious, and All-Praised Chief Apostles Peter and Paul",
    rank: "feast",
    scripture: {
      ref: "Matthew 16:13-19",
      text:
        "Now when Jesus arrived in the area of Caesarea Philippi, he asked a question to his disciples, saying, “Who do people say that I, the Son of Man, am?” They replied, “Some say John the Baptist, some say Elias (Elijah), and others say Jeremiah or one of the prophets.” Jesus then said to them, “But you, who do you say that I am?” Simon Peter answered, “You are the Christ, the Son of the living God!” And Jesus answered him, “Blessed are you, Simon Bar Jonah, for flesh and blood has not revealed this to you, but my Father who is in heaven. I also tell you that you are Peter, and upon this rock I will build my Church, and the gates of hades will not prevail against it. I will give you the keys of the Kingdom of Heaven, and whatever you bind on earth will be bound in heaven; and whatever you loose on earth will be loosed in heaven.”",
      translation: "EOB",
    },
    reflection:
      "The Church honors together the two great apostles whose labors and martyrdom in Rome crowned the apostolic age. Peter, the fisherman who confessed Christ as the Son of the living God, and Paul, the persecutor turned vessel of election, are unlike in their paths yet one in their love for the Lord and their witness unto death. Their joint feast reminds us that the Church is not built on one man’s strength but on the confession of the true faith and the grace that transforms sinners into saints. After a fast in their honor, the faithful celebrate the firmness of Peter and the zeal of Paul as a single foundation laid by Christ.",
    troparion: {
      title: "Troparion of Saints Peter and Paul",
      text:
        "O foremost of the Apostles and teachers of the world, intercede with the Master of all to grant peace to the world and to our souls great mercy.",
    },
  },
  {
    key: "08-06",
    title: "The Holy Transfiguration of our Lord and God and Savior Jesus Christ",
    rank: "great-feast",
    scripture: {
      ref: "Matthew 17:1-9",
      text:
        "Six days later, Jesus took with him Peter, James, and John his brother, and he brought them up into a high mountain by themselves. There, he was transfigured before them. His face shone like the sun, and his garments became as white as the light. And behold, Moses and Elias (Elijah) appeared to them, talking with him. Peter then said to Jesus, “Lord, it is good for us to be here! If you want, let us make three tents here: one for you, one for Moses, and one for Elias (Elijah).” While Peter was still speaking, behold, a bright cloud overshadowed them. And behold, a voice came out of the cloud, saying, “This is my beloved Son in whom I am well pleased. Listen to him.” When the disciples heard it, they fell on their faces and were very afraid. Jesus came and touched them, saying, “Get up, and do not be afraid.” Lifting up their eyes, they saw no one, except Jesus alone. As they were coming down from the mountain, Jesus gave them this order: “Do not tell anyone what you saw, until the Son of Man has risen again from the dead.”",
      translation: "EOB",
    },
    reflection:
      "Upon Mount Tabor the Lord allowed three of His disciples to behold for a moment the glory that was always His, His face shining like the sun and His garments white as light. The Church understands this radiance to be the uncreated light of the Godhead, the same divine energy that the saints come to share through prayer and purity of heart. Christ was transfigured not by gaining something new but by revealing what was hidden beneath His flesh, that the disciples might be strengthened before His Passion. The feast holds out to every Christian the promise that we too are called to be transformed and to behold God, if we will ascend the mountain of stillness and listen to His beloved Son.",
    troparion: {
      title: "Troparion of the Transfiguration",
      text:
        "You were transfigured on the mountain, O Christ our God, revealing Your glory to Your disciples as far as they could bear it. Let Your everlasting light also shine upon us sinners, through the prayers of the Theotokos. O Giver of light, glory to You.",
    },
  },
  {
    key: "08-15",
    title: "The Dormition of our Most Holy Lady the Theotokos and Ever-Virgin Mary",
    rank: "great-feast",
    scripture: {
      ref: "Luke 10:38-42, 11:27-28",
      text:
        "Now it happened that as they went, Jesus entered into a village, and a certain woman named Martha received him into her house. She had a sister called Mary who also sat at Jesus’ feet and listened to his word. However, Martha was distracted with much serving. She came up to Jesus, and said, “Lord, do you not care that my sister has left me to serve alone? Ask her to help me!” But Jesus answered, “Martha, Martha, you are anxious and troubled about many things! Yet one thing is needed, and Mary has chosen the good part, which will not be taken away from her.” As Jesus was saying these things, a woman called out from the crowd and said to him, “Blessed is the womb that bore you, and the breasts which nursed you!” But Jesus said, “Yes, and more than that, blessed are those who hear the word of God and keep it.”",
      translation: "EOB",
    },
    reflection:
      "The last of the great feasts of the Church year commemorates the falling asleep of the Mother of God and her translation, body and soul, into heaven. Orthodox tradition holds that the apostles were gathered to her bedside, that she gave up her spirit into the hands of her Son, and that her tomb was found empty. Her dormition is not mourned as a loss but kept as a feast, for in her the promise of the resurrection is already fulfilled, and she who bore Life does not remain in death. In honoring her passing we glimpse our own hope, that those who keep the word of God will follow where she has gone.",
    troparion: {
      title: "Troparion of the Dormition",
      text:
        "In giving birth you preserved your virginity; in your dormition you did not forsake the world, O Theotokos. You were translated to life, O Mother of Life, and by your prayers you deliver our souls from death.",
    },
  },
  {
    key: "08-29",
    title: "The Beheading of the Holy and Glorious Prophet, Forerunner and Baptist John",
    rank: "feast",
    scripture: {
      ref: "Mark 6:14-30",
      text:
        "King Herod heard this report, for Jesus’ name had become well known, and he said, “John the Baptizer has risen from the dead! This is why these powers are at work in him!” But others said, “He is Elias (Elijah).” Others said, “He is a prophet, like one of the prophets of old!” But when he heard this, Herod said, “This is John whom I beheaded. He has risen from the dead!” For Herod himself had ordered that John be arrested, and he had him chained in prison. This was for the sake of Herodias, the former wife of his brother Philip, for Herod had married her. John had said to Herod, “It is not lawful for you to have your brother’s wife!” Herodias became furious against John and desired to kill him, but she could not because Herod feared John. He knew that John was a righteous and holy man, and kept him safe. When he heard John speak, he did many things, and liked to listen to him. An opportunity came when on his birthday Herod gave a banquet for his nobles, high officers, and for the leading figures of Galilee. When the daughter of Herodias came in and danced and pleased Herod and those sitting with him, the king said to the girl, “Ask me whatever you want, and I will give it to you!” He swore to her, “Whatever you shall ask of me, I will give you, up to half of my kingdom!” She went out and said to her mother, “What shall I ask?” Herodias answered, “The head of John the Baptizer!” At once, the girl hurried to the king and said, “I want you to give me right now the head of John the Baptizer on a platter.” The king was extremely sorry, but for the sake of his oaths and because of his dinner guests, he did not wish to deny her. Immediately, the king sent out a soldier of his guard and commanded that John’s head be brought. The soldier went off and beheaded John in the prison, and brought his head on a platter and gave it to the girl. And she gave it to her mother. When John’s disciples heard this, they came, took his body, and laid it in a tomb. The apostles came back together around Jesus and told him both what they had done and taught.",
      translation: "EOB",
    },
    reflection:
      "On this strict fast day the Church remembers the violent death of St. John, the greatest of those born of women, who was beheaded for rebuking Herod’s unlawful marriage. The Forerunner, who had pointed to the Lamb of God at the Jordan, sealed his prophetic witness with his blood, refusing to soften the truth before the powerful. His death stands as a warning against the cowardice that yields to passion and human respect, and as an example of the courage that speaks God’s word at any cost. The faithful keep this day with fasting and sober reflection, honoring the one who went before Christ even unto death.",
    troparion: {
      title: "Troparion of the Beheading of the Forerunner",
      text:
        "The memory of the righteous is celebrated with hymns of praise, but the Lord’s testimony is sufficient for you, O Forerunner; for you were shown to be more wonderful than the prophets, since you were granted to baptize in the running waters the One whom they proclaimed. Therefore, having contended for the truth, you rejoiced to announce the good tidings even to those in hades: that God has appeared in the flesh, taking away the sin of the world and granting us great mercy.",
    },
  },
];
