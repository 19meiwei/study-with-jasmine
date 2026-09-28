// ==========================================
// STUDY WITH JASMINE
// CHINESE MEASURE WORDS
// ==========================================


// ==========================================
// 1. MEASURE WORD DATA
// ==========================================

const measureWords = [

    // ======================================
    // GENERAL
    // ======================================

    {
        character: "个",
        pinyin: "gè",
        meaning: "general measure word",
        category: "general",
        example: "一个苹果",
        examplePinyin: "yí ge píngguǒ",
        translation: "one apple"
    },
    {
        character: "种",
        pinyin: "zhǒng",
        meaning: "kinds or types",
        category: "general",
        example: "一种方法",
        examplePinyin: "yì zhǒng fāngfǎ",
        translation: "one kind of method"
    },
    {
        character: "类",
        pinyin: "lèi",
        meaning: "categories or types",
        category: "general",
        example: "一类问题",
        examplePinyin: "yí lèi wèntí",
        translation: "one type of problem"
    },
    {
        character: "份",
        pinyin: "fèn",
        meaning: "copies, portions or sets",
        category: "general",
        example: "一份礼物",
        examplePinyin: "yí fèn lǐwù",
        translation: "one gift"
    },
    {
        character: "项",
        pinyin: "xiàng",
        meaning: "projects, tasks or items",
        category: "general",
        example: "一项工作",
        examplePinyin: "yí xiàng gōngzuò",
        translation: "one task"
    },
    {
        character: "批",
        pinyin: "pī",
        meaning: "batches or groups",
        category: "general",
        example: "一批货物",
        examplePinyin: "yì pī huòwù",
        translation: "one batch of goods"
    },
    {
        character: "组",
        pinyin: "zǔ",
        meaning: "groups or sets",
        category: "general",
        example: "一组照片",
        examplePinyin: "yì zǔ zhàopiàn",
        translation: "a set of photos"
    },
    {
        character: "套",
        pinyin: "tào",
        meaning: "sets or suites",
        category: "general",
        example: "一套家具",
        examplePinyin: "yí tào jiājù",
        translation: "a set of furniture"
    },


    // ======================================
    // PEOPLE
    // ======================================

    {
        character: "位",
        pinyin: "wèi",
        meaning: "polite measure word for people",
        category: "people",
        example: "一位老师",
        examplePinyin: "yí wèi lǎoshī",
        translation: "one teacher"
    },
    {
        character: "名",
        pinyin: "míng",
        meaning: "people in formal contexts",
        category: "people",
        example: "一名学生",
        examplePinyin: "yì míng xuésheng",
        translation: "one student"
    },
    {
        character: "口",
        pinyin: "kǒu",
        meaning: "members of a family",
        category: "people",
        example: "一家三口",
        examplePinyin: "yì jiā sān kǒu",
        translation: "a family of three"
    },
    {
        character: "户",
        pinyin: "hù",
        meaning: "households",
        category: "people",
        example: "十户人家",
        examplePinyin: "shí hù rénjiā",
        translation: "ten households"
    },
    {
        character: "家",
        pinyin: "jiā",
        meaning: "businesses and establishments",
        category: "people",
        example: "一家公司",
        examplePinyin: "yì jiā gōngsī",
        translation: "one company"
    },
    {
        character: "队",
        pinyin: "duì",
        meaning: "teams or groups",
        category: "people",
        example: "一队学生",
        examplePinyin: "yí duì xuésheng",
        translation: "a group of students"
    },
    {
        character: "班",
        pinyin: "bān",
        meaning: "classes or groups",
        category: "people",
        example: "一个班",
        examplePinyin: "yí ge bān",
        translation: "one class"
    },


    // ======================================
    // ANIMALS
    // ======================================

    {
        character: "只",
        pinyin: "zhī",
        meaning: "many animals",
        category: "animals",
        example: "一只猫",
        examplePinyin: "yì zhī māo",
        translation: "one cat"
    },
    {
        character: "条",
        pinyin: "tiáo",
        meaning: "long animals such as fish",
        category: "animals",
        example: "一条鱼",
        examplePinyin: "yì tiáo yú",
        translation: "one fish"
    },
    {
        character: "匹",
        pinyin: "pǐ",
        meaning: "horses",
        category: "animals",
        example: "一匹马",
        examplePinyin: "yì pǐ mǎ",
        translation: "one horse"
    },
    {
        character: "头",
        pinyin: "tóu",
        meaning: "large livestock",
        category: "animals",
        example: "一头牛",
        examplePinyin: "yì tóu niú",
        translation: "one cow"
    },
    {
        character: "群",
        pinyin: "qún",
        meaning: "groups, flocks or herds",
        category: "animals",
        example: "一群羊",
        examplePinyin: "yì qún yáng",
        translation: "a flock of sheep"
    },
    {
        character: "峰",
        pinyin: "fēng",
        meaning: "camels",
        category: "animals",
        example: "一峰骆驼",
        examplePinyin: "yì fēng luòtuo",
        translation: "one camel"
    },


    // ======================================
    // OBJECTS
    // ======================================

    {
        character: "支",
        pinyin: "zhī",
        meaning: "long slender objects",
        category: "objects",
        example: "一支笔",
        examplePinyin: "yì zhī bǐ",
        translation: "one pen"
    },
    {
        character: "把",
        pinyin: "bǎ",
        meaning: "objects with handles",
        category: "objects",
        example: "一把伞",
        examplePinyin: "yì bǎ sǎn",
        translation: "one umbrella"
    },
    {
        character: "台",
        pinyin: "tái",
        meaning: "machines and devices",
        category: "objects",
        example: "一台电脑",
        examplePinyin: "yì tái diànnǎo",
        translation: "one computer"
    },
    {
        character: "部",
        pinyin: "bù",
        meaning: "phones and certain devices",
        category: "objects",
        example: "一部手机",
        examplePinyin: "yí bù shǒujī",
        translation: "one mobile phone"
    },
    {
        character: "枚",
        pinyin: "méi",
        meaning: "small flat or round objects",
        category: "objects",
        example: "一枚硬币",
        examplePinyin: "yì méi yìngbì",
        translation: "one coin"
    },
    {
        character: "面",
        pinyin: "miàn",
        meaning: "flat objects such as mirrors or flags",
        category: "objects",
        example: "一面镜子",
        examplePinyin: "yí miàn jìngzi",
        translation: "one mirror"
    },
    {
        character: "扇",
        pinyin: "shàn",
        meaning: "doors and windows",
        category: "objects",
        example: "一扇门",
        examplePinyin: "yí shàn mén",
        translation: "one door"
    },
    {
        character: "盏",
        pinyin: "zhǎn",
        meaning: "lamps",
        category: "objects",
        example: "一盏灯",
        examplePinyin: "yì zhǎn dēng",
        translation: "one lamp"
    },
    {
        character: "管",
        pinyin: "guǎn",
        meaning: "tube-shaped containers",
        category: "objects",
        example: "一管牙膏",
        examplePinyin: "yì guǎn yágāo",
        translation: "one tube of toothpaste"
    },
    {
        character: "卷",
        pinyin: "juǎn",
        meaning: "rolls",
        category: "objects",
        example: "一卷纸",
        examplePinyin: "yì juǎn zhǐ",
        translation: "one roll of paper"
    },
    {
        character: "根",
        pinyin: "gēn",
        meaning: "long thin objects",
        category: "objects",
        example: "一根绳子",
        examplePinyin: "yì gēn shéngzi",
        translation: "one rope"
    },
    {
        character: "副",
        pinyin: "fù",
        meaning: "sets or pairs of certain objects",
        category: "objects",
        example: "一副眼镜",
        examplePinyin: "yí fù yǎnjìng",
        translation: "one pair of glasses"
    },
    {
        character: "对",
        pinyin: "duì",
        meaning: "pairs",
        category: "objects",
        example: "一对耳环",
        examplePinyin: "yí duì ěrhuán",
        translation: "a pair of earrings"
    },


    // ======================================
    // BOOKS & PAPER
    // ======================================

    {
        character: "本",
        pinyin: "běn",
        meaning: "books and bound materials",
        category: "books",
        example: "三本书",
        examplePinyin: "sān běn shū",
        translation: "three books"
    },
    {
        character: "册",
        pinyin: "cè",
        meaning: "books or volumes",
        category: "books",
        example: "一册杂志",
        examplePinyin: "yí cè zázhì",
        translation: "one volume of a magazine"
    },
    {
        character: "部",
        pinyin: "bù",
        meaning: "large written works",
        category: "books",
        example: "一部小说",
        examplePinyin: "yí bù xiǎoshuō",
        translation: "one novel"
    },
    {
        character: "篇",
        pinyin: "piān",
        meaning: "articles or essays",
        category: "books",
        example: "一篇文章",
        examplePinyin: "yì piān wénzhāng",
        translation: "one article"
    },
    {
        character: "章",
        pinyin: "zhāng",
        meaning: "chapters",
        category: "books",
        example: "一章课文",
        examplePinyin: "yì zhāng kèwén",
        translation: "one chapter"
    },
    {
        character: "页",
        pinyin: "yè",
        meaning: "pages",
        category: "books",
        example: "一页书",
        examplePinyin: "yí yè shū",
        translation: "one page of a book"
    },
    {
        character: "张",
        pinyin: "zhāng",
        meaning: "sheets of paper and flat objects",
        category: "books",
        example: "一张纸",
        examplePinyin: "yì zhāng zhǐ",
        translation: "one sheet of paper"
    },
    {
        character: "封",
        pinyin: "fēng",
        meaning: "letters",
        category: "books",
        example: "一封信",
        examplePinyin: "yì fēng xìn",
        translation: "one letter"
    },
    {
        character: "句",
        pinyin: "jù",
        meaning: "sentences or phrases",
        category: "books",
        example: "一句话",
        examplePinyin: "yí jù huà",
        translation: "one sentence"
    },
    {
        character: "段",
        pinyin: "duàn",
        meaning: "paragraphs or passages",
        category: "books",
        example: "一段话",
        examplePinyin: "yí duàn huà",
        translation: "one passage"
    },
    {
        character: "行",
        pinyin: "háng",
        meaning: "lines of text",
        category: "books",
        example: "一行字",
        examplePinyin: "yì háng zì",
        translation: "one line of text"
    },


    // ======================================
    // CLOTHING
    // ======================================

    {
        character: "件",
        pinyin: "jiàn",
        meaning: "items of clothing",
        category: "clothing",
        example: "一件衣服",
        examplePinyin: "yí jiàn yīfu",
        translation: "one piece of clothing"
    },
    {
        character: "条",
        pinyin: "tiáo",
        meaning: "pants, skirts and other long clothing",
        category: "clothing",
        example: "一条裤子",
        examplePinyin: "yì tiáo kùzi",
        translation: "one pair of pants"
    },
    {
        character: "双",
        pinyin: "shuāng",
        meaning: "pairs",
        category: "clothing",
        example: "一双鞋",
        examplePinyin: "yì shuāng xié",
        translation: "one pair of shoes"
    },
    {
        character: "顶",
        pinyin: "dǐng",
        meaning: "hats",
        category: "clothing",
        example: "一顶帽子",
        examplePinyin: "yì dǐng màozi",
        translation: "one hat"
    },
    {
        character: "套",
        pinyin: "tào",
        meaning: "sets of clothing",
        category: "clothing",
        example: "一套西装",
        examplePinyin: "yí tào xīzhuāng",
        translation: "one suit"
    },


    // ======================================
    // FOOD & DRINKS
    // ======================================

    {
        character: "杯",
        pinyin: "bēi",
        meaning: "cups or glasses of drinks",
        category: "food",
        example: "一杯咖啡",
        examplePinyin: "yì bēi kāfēi",
        translation: "one cup of coffee"
    },
    {
        character: "瓶",
        pinyin: "píng",
        meaning: "bottles",
        category: "food",
        example: "一瓶水",
        examplePinyin: "yì píng shuǐ",
        translation: "one bottle of water"
    },
    {
        character: "碗",
        pinyin: "wǎn",
        meaning: "bowls",
        category: "food",
        example: "一碗米饭",
        examplePinyin: "yì wǎn mǐfàn",
        translation: "one bowl of rice"
    },
    {
        character: "盘",
        pinyin: "pán",
        meaning: "plates or dishes",
        category: "food",
        example: "一盘菜",
        examplePinyin: "yì pán cài",
        translation: "one plate of food"
    },
    {
        character: "碟",
        pinyin: "dié",
        meaning: "small dishes",
        category: "food",
        example: "一碟小菜",
        examplePinyin: "yì dié xiǎocài",
        translation: "one small dish"
    },
    {
        character: "盒",
        pinyin: "hé",
        meaning: "boxes or cartons",
        category: "food",
        example: "一盒牛奶",
        examplePinyin: "yì hé niúnǎi",
        translation: "one carton of milk"
    },
    {
        character: "包",
        pinyin: "bāo",
        meaning: "packs or packets",
        category: "food",
        example: "一包饼干",
        examplePinyin: "yì bāo bǐnggān",
        translation: "one pack of cookies"
    },
    {
        character: "袋",
        pinyin: "dài",
        meaning: "bags",
        category: "food",
        example: "一袋米",
        examplePinyin: "yí dài mǐ",
        translation: "one bag of rice"
    },
    {
        character: "罐",
        pinyin: "guàn",
        meaning: "cans or jars",
        category: "food",
        example: "一罐可乐",
        examplePinyin: "yí guàn kělè",
        translation: "one can of cola"
    },
    {
        character: "块",
        pinyin: "kuài",
        meaning: "pieces or chunks",
        category: "food",
        example: "一块蛋糕",
        examplePinyin: "yí kuài dàngāo",
        translation: "one piece of cake"
    },
    {
        character: "片",
        pinyin: "piàn",
        meaning: "thin slices",
        category: "food",
        example: "一片面包",
        examplePinyin: "yí piàn miànbāo",
        translation: "one slice of bread"
    },
    {
        character: "颗",
        pinyin: "kē",
        meaning: "small round objects",
        category: "food",
        example: "一颗糖",
        examplePinyin: "yì kē táng",
        translation: "one piece of candy"
    },
    {
        character: "粒",
        pinyin: "lì",
        meaning: "small grains",
        category: "food",
        example: "一粒米",
        examplePinyin: "yí lì mǐ",
        translation: "one grain of rice"
    },
    {
        character: "串",
        pinyin: "chuàn",
        meaning: "strings, bunches or skewers",
        category: "food",
        example: "一串葡萄",
        examplePinyin: "yí chuàn pútao",
        translation: "one bunch of grapes"
    },
    {
        character: "勺",
        pinyin: "sháo",
        meaning: "spoonfuls",
        category: "food",
        example: "一勺糖",
        examplePinyin: "yì sháo táng",
        translation: "one spoonful of sugar"
    },
    {
        character: "壶",
        pinyin: "hú",
        meaning: "pots of liquid",
        category: "food",
        example: "一壶茶",
        examplePinyin: "yì hú chá",
        translation: "one pot of tea"
    },
    {
        character: "桶",
        pinyin: "tǒng",
        meaning: "buckets or large containers",
        category: "food",
        example: "一桶水",
        examplePinyin: "yì tǒng shuǐ",
        translation: "one bucket of water"
    },
    {
        character: "斤",
        pinyin: "jīn",
        meaning: "500 grams in mainland China",
        category: "food",
        example: "一斤苹果",
        examplePinyin: "yì jīn píngguǒ",
        translation: "500 grams of apples"
    },
    {
        character: "顿",
        pinyin: "dùn",
        meaning: "meals",
        category: "food",
        example: "一顿饭",
        examplePinyin: "yí dùn fàn",
        translation: "one meal"
    },


    // ======================================
    // BUILDINGS & PLACES
    // ======================================

    {
        character: "座",
        pinyin: "zuò",
        meaning: "large buildings, mountains or bridges",
        category: "places",
        example: "一座山",
        examplePinyin: "yí zuò shān",
        translation: "one mountain"
    },
    {
        character: "栋",
        pinyin: "dòng",
        meaning: "buildings",
        category: "places",
        example: "一栋楼",
        examplePinyin: "yí dòng lóu",
        translation: "one building"
    },
    {
        character: "间",
        pinyin: "jiān",
        meaning: "rooms",
        category: "places",
        example: "一间房",
        examplePinyin: "yì jiān fáng",
        translation: "one room"
    },
    {
        character: "层",
        pinyin: "céng",
        meaning: "floors or layers",
        category: "places",
        example: "三层楼",
        examplePinyin: "sān céng lóu",
        translation: "three floors"
    },
    {
        character: "所",
        pinyin: "suǒ",
        meaning: "schools and institutions",
        category: "places",
        example: "一所学校",
        examplePinyin: "yì suǒ xuéxiào",
        translation: "one school"
    },
    {
        character: "家",
        pinyin: "jiā",
        meaning: "shops, restaurants and businesses",
        category: "places",
        example: "一家餐厅",
        examplePinyin: "yì jiā cāntīng",
        translation: "one restaurant"
    },


    // ======================================
    // TRANSPORT
    // ======================================

    {
        character: "辆",
        pinyin: "liàng",
        meaning: "wheeled vehicles",
        category: "transport",
        example: "一辆汽车",
        examplePinyin: "yí liàng qìchē",
        translation: "one car"
    },
    {
        character: "架",
        pinyin: "jià",
        meaning: "aircraft",
        category: "transport",
        example: "一架飞机",
        examplePinyin: "yí jià fēijī",
        translation: "one airplane"
    },
    {
        character: "艘",
        pinyin: "sōu",
        meaning: "ships and boats",
        category: "transport",
        example: "一艘船",
        examplePinyin: "yì sōu chuán",
        translation: "one ship"
    },
    {
        character: "列",
        pinyin: "liè",
        meaning: "trains",
        category: "transport",
        example: "一列火车",
        examplePinyin: "yí liè huǒchē",
        translation: "one train"
    },
    {
        character: "班",
        pinyin: "bān",
        meaning: "scheduled flights or services",
        category: "transport",
        example: "一班飞机",
        examplePinyin: "yì bān fēijī",
        translation: "one scheduled flight"
    },


    // ======================================
    // ACTIONS & EVENTS
    // ======================================

    {
        character: "次",
        pinyin: "cì",
        meaning: "times or occurrences",
        category: "actions",
        example: "去一次",
        examplePinyin: "qù yí cì",
        translation: "go once"
    },
    {
        character: "遍",
        pinyin: "biàn",
        meaning: "an action completed from beginning to end",
        category: "actions",
        example: "读一遍",
        examplePinyin: "dú yí biàn",
        translation: "read it once through"
    },
    {
        character: "趟",
        pinyin: "tàng",
        meaning: "trips or journeys",
        category: "actions",
        example: "去一趟北京",
        examplePinyin: "qù yí tàng Běijīng",
        translation: "make one trip to Beijing"
    },
    {
        character: "回",
        pinyin: "huí",
        meaning: "times or occasions",
        category: "actions",
        example: "去过一回",
        examplePinyin: "qùguo yì huí",
        translation: "went there once"
    },
    {
        character: "场",
        pinyin: "chǎng",
        meaning: "events, games or performances",
        category: "actions",
        example: "一场比赛",
        examplePinyin: "yì chǎng bǐsài",
        translation: "one match"
    },
    {
        character: "轮",
        pinyin: "lún",
        meaning: "rounds",
        category: "actions",
        example: "一轮比赛",
        examplePinyin: "yì lún bǐsài",
        translation: "one round of competition"
    },
    {
        character: "阵",
        pinyin: "zhèn",
        meaning: "short periods of an occurrence",
        category: "actions",
        example: "一阵雨",
        examplePinyin: "yí zhèn yǔ",
        translation: "a spell of rain"
    },
    {
        character: "声",
        pinyin: "shēng",
        meaning: "sounds or cries",
        category: "actions",
        example: "一声谢谢",
        examplePinyin: "yì shēng xièxie",
        translation: "one expression of thanks"
    },
    {
        character: "番",
        pinyin: "fān",
        meaning: "rounds or bouts of effort",
        category: "actions",
        example: "一番努力",
        examplePinyin: "yì fān nǔlì",
        translation: "a period of effort"
    },
    {
        character: "首",
        pinyin: "shǒu",
        meaning: "songs or poems",
        category: "actions",
        example: "一首歌",
        examplePinyin: "yì shǒu gē",
        translation: "one song"
    },
    {
        character: "集",
        pinyin: "jí",
        meaning: "episodes of a series",
        category: "actions",
        example: "一集电视剧",
        examplePinyin: "yì jí diànshìjù",
        translation: "one TV episode"
    },
    {
        character: "期",
        pinyin: "qī",
        meaning: "issues or installments",
        category: "actions",
        example: "一期节目",
        examplePinyin: "yì qī jiémù",
        translation: "one episode of a program"
    },


    // ======================================
    // SCHOOL & STUDY
    // ======================================

    {
        character: "门",
        pinyin: "mén",
        meaning: "academic subjects or courses",
        category: "study",
        example: "一门课",
        examplePinyin: "yì mén kè",
        translation: "one course"
    },
    {
        character: "科",
        pinyin: "kē",
        meaning: "academic subjects",
        category: "study",
        example: "一科考试",
        examplePinyin: "yì kē kǎoshì",
        translation: "one subject exam"
    },
    {
        character: "节",
        pinyin: "jié",
        meaning: "class periods",
        category: "study",
        example: "一节课",
        examplePinyin: "yì jié kè",
        translation: "one class period"
    },
    {
        character: "堂",
        pinyin: "táng",
        meaning: "lesson sessions",
        category: "study",
        example: "一堂课",
        examplePinyin: "yì táng kè",
        translation: "one lesson"
    },


    // ======================================
    // TIME
    // ======================================

    {
        character: "年",
        pinyin: "nián",
        meaning: "years",
        category: "time",
        example: "一年",
        examplePinyin: "yì nián",
        translation: "one year"
    },
    {
        character: "个月",
        pinyin: "ge yuè",
        meaning: "months",
        category: "time",
        example: "三个月",
        examplePinyin: "sān ge yuè",
        translation: "three months"
    },
    {
        character: "周",
        pinyin: "zhōu",
        meaning: "weeks",
        category: "time",
        example: "一周",
        examplePinyin: "yì zhōu",
        translation: "one week"
    },
    {
        character: "天",
        pinyin: "tiān",
        meaning: "days",
        category: "time",
        example: "三天",
        examplePinyin: "sān tiān",
        translation: "three days"
    },
    {
        character: "小时",
        pinyin: "xiǎoshí",
        meaning: "hours",
        category: "time",
        example: "两个小时",
        examplePinyin: "liǎng ge xiǎoshí",
        translation: "two hours"
    },
    {
        character: "分钟",
        pinyin: "fēnzhōng",
        meaning: "minutes",
        category: "time",
        example: "十分钟",
        examplePinyin: "shí fēnzhōng",
        translation: "ten minutes"
    },
    {
        character: "秒",
        pinyin: "miǎo",
        meaning: "seconds",
        category: "time",
        example: "五秒",
        examplePinyin: "wǔ miǎo",
        translation: "five seconds"
    },
    {
        character: "届",
        pinyin: "jiè",
        meaning: "sessions, terms or editions",
        category: "time",
        example: "第一届比赛",
        examplePinyin: "dì yī jiè bǐsài",
        translation: "the first edition of the competition"
    }
];


// ==========================================
// 2. ELEMENTS
// ==========================================

// ==========================================
// 2. ELEMENTS
// ==========================================

const flashcardGrid =
    document.getElementById("flashcardGrid");

const measureSearch =
    document.getElementById("measureSearch");

const visibleCount =
    document.getElementById("visibleCount");

const filterButtons =
    document.querySelectorAll(".filter-button");


// ==========================================
// 3. FLASHCARD SETTINGS
// ==========================================

let currentCategory = "all";

const CARDS_PER_PAGE = 12;

let cardsToShow = CARDS_PER_PAGE;

let currentFilteredWords = [...measureWords];

let loadMoreButton = null;


// ==========================================
// 4. CATEGORY NAMES
// ==========================================

function formatCategory(category) {

    const names = {
        general: "General",
        people: "People",
        animals: "Animals",
        objects: "Objects",
        food: "Food & Drinks",
        books: "Books & Paper",
        clothing: "Clothing",
        places: "Buildings & Places",
        transport: "Transport",
        actions: "Actions & Events",
        study: "School & Study",
        time: "Time"
    };

    return names[category] || category;
}


// ==========================================
// 5. HIGHLIGHT MEASURE WORD
// ==========================================

function highlightMeasureWord(
    sentence,
    measureWord
) {

    const index =
        sentence.indexOf(measureWord);

    if (index === -1) {
        return sentence;
    }

    return (
        sentence.slice(0, index) +
        `<span>${measureWord}</span>` +
        sentence.slice(
            index + measureWord.length
        )
    );
}


// ==========================================
// 6. CREATE LOAD MORE BUTTON
// ==========================================

function ensureLoadMoreButton() {

    if (loadMoreButton) {
        return;
    }


    loadMoreButton =
        document.createElement("button");


    loadMoreButton.type =
        "button";

    loadMoreButton.id =
        "loadMoreButton";

    loadMoreButton.className =
        "load-more-button";


    flashcardGrid.insertAdjacentElement(
        "afterend",
        loadMoreButton
    );


    loadMoreButton.addEventListener(
        "click",
        () => {

            cardsToShow +=
                CARDS_PER_PAGE;


            displayMeasureWords(
                currentFilteredWords,
                false
            );
        }
    );
}


// ==========================================
// 7. DISPLAY FLASHCARDS
// ==========================================

function displayMeasureWords(
    words,
    resetPage = true
) {

    ensureLoadMoreButton();


    currentFilteredWords =
        words;


    if (resetPage) {

        cardsToShow =
            CARDS_PER_PAGE;
    }


    flashcardGrid.innerHTML =
        "";


    visibleCount.textContent =
        words.length;


    // ------------------------------
    // NO RESULTS
    // ------------------------------

    if (words.length === 0) {

        flashcardGrid.innerHTML = `

            <div class="no-results">

                <strong>
                    No measure words found.
                </strong>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;


        loadMoreButton.hidden =
            true;


        return;
    }


    // ------------------------------
    // ONLY SHOW CURRENT PAGE
    // ------------------------------

    const visibleWords =
        words.slice(
            0,
            cardsToShow
        );


    // ------------------------------
    // CREATE CARDS
    // ------------------------------

    visibleWords.forEach(
        (word) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "measure-card";


            card.innerHTML = `

                <div class="measure-card-inner">


                    <!-- FRONT -->

                    <div class="measure-card-front">


                        <span class="card-category">

                            ${formatCategory(
                                word.category
                            )}

                        </span>


                        <div class="measure-character">

                            ${word.character}

                        </div>


                        <div class="measure-pinyin">

                            ${word.pinyin}

                        </div>


                        <div class="measure-meaning">

                            ${word.meaning}

                        </div>


                        <div class="card-actions">


                            <button
                                class="audio-button front-audio"
                                type="button"
                                aria-label="Listen to ${word.character}"
                            >

                                🔊 Listen

                            </button>


                            <button
                                class="flip-button"
                                type="button"
                            >

                                View Example

                            </button>


                        </div>


                    </div>



                    <!-- BACK -->

                    <div class="measure-card-back">


                        <span class="back-label">

                            EXAMPLE

                        </span>


                        <div class="example-sentence">

                            ${highlightMeasureWord(
                                word.example,
                                word.character
                            )}

                        </div>


                        <div class="example-sentence-pinyin">

                            ${word.examplePinyin}

                        </div>


                        <div class="example-translation">

                            ${word.translation}

                        </div>


                        <div class="card-actions">


                            <button
                                class="audio-button example-audio"
                                type="button"
                                aria-label="Listen to example"
                            >

                                🔊 Listen

                            </button>


                            <button
                                class="flip-button"
                                type="button"
                            >

                                ↩ Back

                            </button>


                        </div>


                    </div>


                </div>

            `;


            // --------------------------
            // BUTTONS
            // --------------------------

            const frontAudio =
                card.querySelector(
                    ".front-audio"
                );


            const exampleAudio =
                card.querySelector(
                    ".example-audio"
                );


            const flipButtons =
                card.querySelectorAll(
                    ".flip-button"
                );


            // FRONT AUDIO:
            // only pronounce measure word

            frontAudio.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    speakChinese(
                        word.character
                    );
                }
            );


            // BACK AUDIO:
            // pronounce example

            exampleAudio.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    speakChinese(
                        word.example
                    );
                }
            );


            // FLIP CARD

            flipButtons.forEach(
                (button) => {

                    button.addEventListener(
                        "click",
                        (event) => {

                            event.stopPropagation();

                            card.classList.toggle(
                                "flipped"
                            );
                        }
                    );
                }
            );


            flashcardGrid.appendChild(
                card
            );
        }
    );


    // ------------------------------
    // LOAD MORE
    // ------------------------------

    const remaining =
        words.length -
        visibleWords.length;


    if (remaining > 0) {

        loadMoreButton.hidden =
            false;


        const nextAmount =
            Math.min(
                CARDS_PER_PAGE,
                remaining
            );


        loadMoreButton.textContent =
            `Load More (${nextAmount} more)`;

    } else {

        loadMoreButton.hidden =
            true;
    }
}


// ==========================================
// 8. SEARCH + FILTER
// ==========================================

function normalizeSearchText(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );
}


// ==========================================
// FILTER MEASURE WORDS
// ==========================================

function filterMeasureWords() {

    const searchTerm =
        normalizeSearchText(
            measureSearch.value.trim()
        );


    const filtered =
        measureWords.filter(
            (word) => {


                const categoryMatches =

                    currentCategory === "all" ||

                    word.category ===
                        currentCategory;


                const searchableText =
                    normalizeSearchText(`

                        ${word.character}

                        ${word.pinyin}

                        ${word.meaning}

                        ${word.example}

                        ${word.examplePinyin}

                        ${word.translation}

                    `);


                const searchMatches =
                    searchableText.includes(
                        searchTerm
                    );


                return (
                    categoryMatches &&
                    searchMatches
                );
            }
        );


    displayMeasureWords(
        filtered,
        true
    );
}


// ==========================================
// SEARCH EVENT
// ==========================================

measureSearch.addEventListener(
    "input",
    filterMeasureWords
);


// ==========================================
// FILTER BUTTON EVENTS
// ==========================================

filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {


                filterButtons.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );
                    }
                );


                button.classList.add(
                    "active"
                );


                currentCategory =
                    button.dataset.category;


                filterMeasureWords();
            }
        );
    }
);


// ==========================================
// 9. CHINESE AUDIO
// ==========================================

// ==========================================
// 9. CHINESE AUDIO
// ==========================================

let chineseVoices = [];


// Load available Chinese voices
function loadChineseVoices() {

    const voices =
        window.speechSynthesis.getVoices();

    chineseVoices =
        voices.filter((voice) => {

            const lang =
                (voice.lang || "")
                    .toLowerCase()
                    .replace("_", "-");

            return lang.startsWith("zh");
        });

}


// Try loading immediately
loadChineseVoices();


// Some browsers load voices later
if ("speechSynthesis" in window) {

    window.speechSynthesis.onvoiceschanged =
        () => {

            loadChineseVoices();

        };

}


// ==========================================
// FIND BEST MANDARIN VOICE
// ==========================================

function getBestMandarinVoice() {

    if (chineseVoices.length === 0) {

        loadChineseVoices();

    }


    if (chineseVoices.length === 0) {

        return null;

    }


    // Preferred Mandarin voices
    const preferredNames = [

        "Tingting",
        "Ting-Ting",
        "Xiaoxiao",
        "Xiaoyi",
        "Yunxi",
        "Yunyang",
        "Meijia",
        "Sin-ji"

    ];


    for (const name of preferredNames) {

        const voice =
            chineseVoices.find((voice) =>

                voice.name
                    .toLowerCase()
                    .includes(
                        name.toLowerCase()
                    )

            );


        if (voice) {

            return voice;

        }

    }


    // Prefer Mainland Mandarin
    const mainlandVoice =
        chineseVoices.find((voice) => {

            const lang =
                (voice.lang || "")
                    .toLowerCase()
                    .replace("_", "-");


            return (

                lang === "zh-cn" ||

                lang.includes("hans")

            );

        });


    if (mainlandVoice) {

        return mainlandVoice;

    }


    return chineseVoices[0];

}


// ==========================================
// SPEAK CHINESE
// ==========================================

function speakChinese(text) {

    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Audio is not supported on this browser."
        );

        return;

    }


    // Stop previous speech
    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(text);


    utterance.lang =
        "zh-CN";


    // Better for language learners
    utterance.rate =
        0.72;


    utterance.pitch =
        1;


    utterance.volume =
        1;


    const voice =
        getBestMandarinVoice();


    if (voice) {

        utterance.voice =
            voice;

    }


    utterance.onerror =
        (event) => {

            // "interrupted" and "canceled"
            // can happen normally when another
            // audio button is pressed.

            if (
                event.error !== "interrupted" &&
                event.error !== "canceled"
            ) {

                console.error(
                    "Speech error:",
                    event.error
                );

            }

        };


    /*
        Small delay after cancel() helps
        Safari / Chrome avoid swallowing
        the next utterance.
    */

    setTimeout(() => {

        window.speechSynthesis.speak(
            utterance
        );

    }, 80);

}


// ==========================================
// 10. QUIZ DATA
// ==========================================

const quizQuestions = [

    {
        question: "三 ___ 书",
        pinyin: "sān ___ shū",

        options: [
            "本",
            "杯",
            "只",
            "辆"
        ],

        answer: "本",

        explanation:
            "本 (běn) is used for books."
    },


    {
        question: "一 ___ 老师",
        pinyin: "yí ___ lǎoshī",

        options: [
            "位",
            "条",
            "台",
            "瓶"
        ],

        answer: "位",

        explanation:
            "位 (wèi) is a polite measure word for people."
    },


    {
        question: "一 ___ 猫",
        pinyin: "yì ___ māo",

        options: [
            "只",
            "本",
            "杯",
            "架"
        ],

        answer: "只",

        explanation:
            "只 (zhī) is commonly used for animals such as cats."
    },


    {
        question: "一 ___ 鱼",
        pinyin: "yì ___ yú",

        options: [
            "条",
            "件",
            "辆",
            "位"
        ],

        answer: "条",

        explanation:
            "条 (tiáo) is commonly used for fish."
    },


    {
        question: "一 ___ 电脑",
        pinyin: "yì ___ diànnǎo",

        options: [
            "台",
            "匹",
            "本",
            "杯"
        ],

        answer: "台",

        explanation:
            "台 (tái) is used for machines and devices."
    },


    {
        question: "两 ___ 笔",
        pinyin: "liǎng ___ bǐ",

        options: [
            "支",
            "碗",
            "栋",
            "艘"
        ],

        answer: "支",

        explanation:
            "支 (zhī) is used for long slender objects such as pens."
    },


    {
        question: "一 ___ 纸",
        pinyin: "yì ___ zhǐ",

        options: [
            "张",
            "位",
            "匹",
            "杯"
        ],

        answer: "张",

        explanation:
            "张 (zhāng) is used for flat objects such as paper."
    },


    {
        question: "一 ___ 咖啡",
        pinyin: "yì ___ kāfēi",

        options: [
            "杯",
            "辆",
            "栋",
            "本"
        ],

        answer: "杯",

        explanation:
            "杯 (bēi) is used for cups or glasses of drinks."
    },


    {
        question: "一 ___ 蛋糕",
        pinyin: "yí ___ dàngāo",

        options: [
            "块",
            "所",
            "架",
            "位"
        ],

        answer: "块",

        explanation:
            "块 (kuài) is used for pieces or chunks."
    },


    {
        question: "一 ___ 衣服",
        pinyin: "yí ___ yīfu",

        options: [
            "件",
            "艘",
            "封",
            "匹"
        ],

        answer: "件",

        explanation:
            "件 (jiàn) is commonly used for clothing."
    },


    {
        question: "一 ___ 鞋",
        pinyin: "yì ___ xié",

        options: [
            "双",
            "辆",
            "本",
            "位"
        ],

        answer: "双",

        explanation:
            "双 (shuāng) is used for pairs, such as shoes."
    },


    {
        question: "一 ___ 学校",
        pinyin: "yì ___ xuéxiào",

        options: [
            "所",
            "杯",
            "条",
            "匹"
        ],

        answer: "所",

        explanation:
            "所 (suǒ) is used for schools and institutions."
    },


    {
        question: "一 ___ 汽车",
        pinyin: "yí ___ qìchē",

        options: [
            "辆",
            "支",
            "封",
            "本"
        ],

        answer: "辆",

        explanation:
            "辆 (liàng) is used for wheeled vehicles."
    },


    {
        question: "一 ___ 飞机",
        pinyin: "yí ___ fēijī",

        options: [
            "架",
            "碗",
            "页",
            "位"
        ],

        answer: "架",

        explanation:
            "架 (jià) is used for aircraft."
    },


    {
        question: "一 ___ 船",
        pinyin: "yì ___ chuán",

        options: [
            "艘",
            "本",
            "杯",
            "件"
        ],

        answer: "艘",

        explanation:
            "艘 (sōu) is used for ships and boats."
    },


    {
        question: "一 ___ 比赛",
        pinyin: "yì ___ bǐsài",

        options: [
            "场",
            "瓶",
            "支",
            "双"
        ],

        answer: "场",

        explanation:
            "场 (chǎng) is used for games, matches and events."
    },


    {
        question: "一 ___ 课",
        pinyin: "yì ___ kè",

        options: [
            "门",
            "艘",
            "瓶",
            "匹"
        ],

        answer: "门",

        explanation:
            "门 (mén) is used for academic courses or subjects."
    },


    {
        question: "一 ___ 课",
        pinyin: "yì ___ kè",

        options: [
            "节",
            "辆",
            "只",
            "封"
        ],

        answer: "节",

        explanation:
            "节 (jié) is used for a class period."
    },


    {
        question: "一 ___ 信",
        pinyin: "yì ___ xìn",

        options: [
            "封",
            "碗",
            "辆",
            "匹"
        ],

        answer: "封",

        explanation:
            "封 (fēng) is used for letters."
    },


    {
        question: "一 ___ 花",
        pinyin: "yì ___ huā",

        options: [
            "束",
            "辆",
            "页",
            "碗"
        ],

        answer: "束",

        explanation:
            "束 (shù) is used for bouquets or bundles."
    }

];


// ==========================================
// 11. QUIZ ELEMENTS
// ==========================================

const quizProgress =
    document.getElementById(
        "quizProgress"
    );

const quizScore =
    document.getElementById(
        "quizScore"
    );

const quizQuestion =
    document.getElementById(
        "quizQuestion"
    );

const quizPinyin =
    document.getElementById(
        "quizPinyin"
    );

const quizOptions =
    document.getElementById(
        "quizOptions"
    );

const quizFeedback =
    document.getElementById(
        "quizFeedback"
    );

const nextQuestion =
    document.getElementById(
        "nextQuestion"
    );

const quizContent =
    document.getElementById(
        "quizContent"
    );

const quizResult =
    document.getElementById(
        "quizResult"
    );

const finalScore =
    document.getElementById(
        "finalScore"
    );

const restartQuiz =
    document.getElementById(
        "restartQuiz"
    );


let currentQuestion = 0;

let score = 0;

let answered = false;


// ==========================================
// 12. LOAD QUIZ QUESTION
// ==========================================

function loadQuizQuestion() {

    answered = false;


    nextQuestion.disabled =
        true;


    quizFeedback.textContent =
        "";


    quizFeedback.className =
        "quiz-feedback";


    const item =
        quizQuestions[
            currentQuestion
        ];


    quizProgress.textContent =
        `Question ${
            currentQuestion + 1
        } of ${
            quizQuestions.length
        }`;


    quizScore.textContent =
        `Score: ${score}`;


    quizQuestion.textContent =
        item.question;


    quizPinyin.textContent =
        item.pinyin;


    quizOptions.innerHTML =
        "";


    item.options.forEach(
        (option) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "quiz-option";


            button.textContent =
                option;


            button.addEventListener(
                "click",
                () => {

                    selectAnswer(
                        button,
                        option,
                        item
                    );
                }
            );


            quizOptions.appendChild(
                button
            );
        }
    );
}


// ==========================================
// 13. SELECT QUIZ ANSWER
// ==========================================

function selectAnswer(
    selectedButton,
    selectedAnswer,
    question
) {

    if (answered) {

        return;
    }


    answered =
        true;


    const optionButtons =
        quizOptions.querySelectorAll(
            ".quiz-option"
        );


    optionButtons.forEach(
        (button) => {

            button.disabled =
                true;


            if (
                button.textContent ===
                question.answer
            ) {

                button.classList.add(
                    "correct"
                );
            }
        }
    );


    if (
        selectedAnswer ===
        question.answer
    ) {

        score++;


        selectedButton.classList.add(
            "correct"
        );


        quizFeedback.textContent =
            `✓ Correct! ${question.explanation}`;


        quizFeedback.className =
            "quiz-feedback correct";

    } else {

        selectedButton.classList.add(
            "wrong"
        );


        quizFeedback.textContent =
            `✕ Not quite. ${question.explanation}`;


        quizFeedback.className =
            "quiz-feedback wrong";
    }


    quizScore.textContent =
        `Score: ${score}`;


    nextQuestion.disabled =
        false;
}


// ==========================================
// 14. NEXT QUESTION
// ==========================================

nextQuestion.addEventListener(
    "click",
    () => {

        currentQuestion++;


        if (
            currentQuestion <
            quizQuestions.length
        ) {

            loadQuizQuestion();

        } else {

            showQuizResult();
        }
    }
);


// ==========================================
// 15. SHOW QUIZ RESULT
// ==========================================

function showQuizResult() {

    quizContent.hidden =
        true;


    quizResult.hidden =
        false;


    const percentage =
        Math.round(

            (
                score /
                quizQuestions.length

            ) * 100
        );


    let message;


    if (
        percentage === 100
    ) {

        message =
            "Perfect! You got every question correct.";

    } else if (
        percentage >= 80
    ) {

        message =
            "Great work! You have a strong understanding of Chinese measure words.";

    } else if (
        percentage >= 60
    ) {

        message =
            "Good progress! Review the flashcards and try again.";

    } else {

        message =
            "Keep practicing! Review the examples above and try the quiz again.";
    }


    finalScore.innerHTML = `

        You scored

        <strong>
            ${score}/${quizQuestions.length}
        </strong>

        (${percentage}%).

        <br><br>

        ${message}

    `;
}


// ==========================================
// 16. RESTART QUIZ
// ==========================================

restartQuiz.addEventListener(
    "click",
    () => {

        currentQuestion =
            0;


        score =
            0;


        answered =
            false;


        quizResult.hidden =
            true;


        quizContent.hidden =
            false;


        loadQuizQuestion();
    }
);


// ==========================================
// 17. INITIALIZE PAGE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        displayMeasureWords(
            measureWords,
            true
        );


        loadQuizQuestion();


        console.log(
            `Loaded ${measureWords.length} Chinese measure-word examples.`
        );
    }
);