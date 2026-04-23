export type ExerciseType =
  | "match"
  | "circle"
  | "fill-in"
  | "complete"
  | "reading"
  | "table"
  | "crossword-clue"
  | "write"
  | "order"
  | "info";

export interface Exercise {
  id: string;
  type: ExerciseType;
  label?: string; // e.g. "A", "B", "C"
  difficulty?: 1 | 2 | 3; // dots shown (1-3)
  instruction: string;
  hebrewInstruction?: string;
  content?: string; // prose / reading passage
  items?: string[];
  columnsA?: string[];
  columnsB?: string[];
  wordBank?: string[];
  note?: string;
}

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  color: "grammar" | "words" | "listening" | "writing" | "neutral";
  pages: string; // e.g. "108–110"
  reference?: string; // e.g. "after Student's Book p. 97"
  exercises: Exercise[];
}

export interface Lesson {
  id: string;
  title: string;
  unit: string;
  grade: string;
  sections: Section[];
}

const unit4: Lesson = {
  id: "unit4-workbook",
  title: "Unit 4 — Workbook",
  unit: "Unit 4",
  grade: "Grade 7",
  sections: [
    // ─── GRAMMAR 1 ────────────────────────────────────────────────
    {
      id: "grammar1",
      title: "Grammar 1",
      subtitle: "Past Simple: Positive",
      color: "grammar",
      pages: "108–110",
      reference: "after Student's Book p. 97, exercise B",
      exercises: [
        {
          id: "g1-c",
          type: "match",
          label: "C",
          difficulty: 1,
          instruction: "Match A and B to make sentences.",
          columnsA: [
            "Sara made that dress by",
            "They solved the problem by",
            "Daniel admitted he ate all the cookies by",
            "We painted the sign by",
            "Yesterday I made dinner by",
            "You must finish reading the story by",
            "The door closed by",
          ],
          columnsB: [
            "a. yourself.",
            "b. himself.",
            "c. myself.",
            "d. themselves.",
            "e. ourselves.",
            "f. herself.",
            "g. itself.",
          ],
        },
        {
          id: "g1-a1",
          type: "circle",
          label: "A",
          difficulty: 1,
          instruction:
            "Circle the verbs in the Past Simple. Then follow them to the airplane.",
          hebrewInstruction:
            "סמנו את הפעלים ב-Past Simple. לאחר מכן עקבו אחריהם לעבר המטוס.",
          note: "Look at the word maze in your workbook (p. 108). The circled verb is: stopped",
          items: [
            "walk", "remained", "work", "wonder", "decide",
            "cry", "worried", "realize", "survive",
            "planned", "study", "stop", "remain", "serve",
            "manage", "expected", "solve", "disappeared",
            "worked", "decide", "walk", "run", "try",
            "plan", "tired", "carried", "want", "preferred",
            "repeated",
          ],
        },
        {
          id: "g1-b",
          type: "circle",
          label: "B",
          difficulty: 2,
          instruction: "Circle the correct answers.",
          hebrewInstruction: "סמנו את התשובות הנכונות.",
          items: [
            "Yesterday they spend / spent / are spending the whole day at the mall.",
            "Last Monday, our class goes / went / is going to the museum.",
            "We fly / flew / are flying to Eilat last summer.",
            "The exam is beginning / begin / began an hour ago.",
            "We sleep / slept / are sleeping at our grandparents' house last weekend.",
            "Last night, my brother ate / eats / is eating the whole pizza by himself.",
          ],
        },
        {
          id: "g1-c2",
          type: "table",
          label: "C",
          difficulty: 2,
          instruction:
            "Complete the chart of some irregular verbs. Then circle the Past Simple form of the verbs in the puzzle.",
          hebrewInstruction:
            "השלימו את הטבלה של פעלים לא סדירים. לאחר מכן מצאו את צורת העבר בתשבץ.",
          items: [
            "go → went",
            "eat → ?",
            "write → ?",
            "drive → ?",
            "become → ?",
            "fly → ?",
            "take → ?",
            "dream → ?",
            "lose → ?",
            "sit → ?",
          ],
          note: "Use the List of Irregular Verbs on page 207 in the Student's Book to help you.",
        },
        {
          id: "g1-c2b",
          type: "complete",
          label: "C",
          difficulty: 2,
          instruction:
            "Complete the sentences with the Past Simple form of the words in brackets.",
          items: [
            "David ______ (become) a doctor after seven years of medical school.",
            "The whole class ______ (eat) pizza together last night.",
            "Our teacher ______ (lose) her glasses and can't find them anywhere.",
            "I ______ (dream) that I got 100 on my science test.",
            "The author ______ (write) a whole book in two weeks!",
            "Shira ______ (sit) on a chair with wet paint, and now her skirt is blue.",
            "Shani and Meirav ______ (go) to Eilat on vacation.",
            "The pilot ______ (fly) to New York yesterday.",
          ],
        },
        {
          id: "g1-d",
          type: "complete",
          label: "D",
          difficulty: 1,
          instruction:
            "Complete the sentences with the Past Simple form of the verbs below.",
          wordBank: ["fall", "shake", "put", "win", "sleep", "beat", "stand", "spend"],
          items: [
            "Yesterday, I ______ my keys in my bag, but now I can't find them.",
            "I ______ my friends at tennis last week.",
            "They ______ in love while they were on a tour in Paris last summer.",
            "After Tina won the award, the judge ______ her hand.",
            "Yesterday we ______ a lot of money at the mall.",
            "Sivan is very tired. She said she only ______ four hours last night.",
            "We ______ in line for two hours to buy tickets.",
            "In 1972, Mark Spitz ______ seven Olympic medals in swimming.",
          ],
        },
        {
          id: "g1-e1",
          type: "reading",
          label: "E",
          difficulty: 3,
          instruction:
            "Complete the article with the Past Simple form of the verbs in brackets.",
          content: `**The Mystery on Flannan Island**

In December 1900, a boat called *Hesperus* ¹______ (sail) to Flannan Island in Scotland. The ship ²______ (wait) a few days because of the bad weather, but when it finally ³______ (arrive), it was clear to the passengers that something was wrong. Usually, three lighthouse keepers on the island ⁴______ (come) to welcome the arrival of a ship. However, that day nobody came.

Nobody ⁵______ (know) where the lighthouse keepers were. When people on the island ⁶______ (go) to look for them, they found the door closed and the clock stopped. The newspapers were full of stories. Some ⁷______ (say) that aliens ⁸______ (take) the men away. Others wrote that the men simply ⁹______ (leave) the island on a different ship. Many people at the time ¹⁰______ (believe) that they drowned in the sea because of the storm.

Until today, no one knows what happened.`,
          note: "lighthouse keepers = שומרי מגדלור | aliens = יצורים חייזריים | drowned = טבעו",
        },
        {
          id: "g1-e2",
          type: "write",
          label: "E",
          difficulty: 2,
          instruction:
            "What do you think really happened? Write at least two sentences.",
        },
      ],
    },

    // ─── WORDS 1 ──────────────────────────────────────────────────
    {
      id: "words1",
      title: "Read and Spell + Words 1",
      subtitle: "New Words",
      color: "words",
      pages: "112–114",
      reference: "after Student's Book p. 99",
      exercises: [
        {
          id: "w1-spell1",
          type: "info",
          label: "Read and Spell",
          instruction: "Find the words in English to find the hidden word.",
          hebrewInstruction: "כתבו את המילים באנגלית כדי למצוא את המילה הנסתרת.",
          items: [
            "רהיטים / ריהוט → furniture",
            "תרבות / תרבויות → culture",
            "עתיד / עתידי → future",
            "הרפתקה / הרפתקאות → adventure",
            "טמפרטורה / טמפרטורות → temperature",
            "טבע → nature",
          ],
          note: "Take a p_______ (hidden word — read down the first letters of your answers).",
        },
        {
          id: "w1-spell2",
          type: "circle",
          label: "Read and Spell 2",
          instruction:
            "Write the words below in the correct columns. Pay attention to the sound of the vowel.",
          hebrewInstruction:
            "כתבו את המילים הבאות בעמודות הנכונות. שימו לב לצליל של תנועת השורש.",
          wordBank: ["cheese", "road", "leave", "ceiling", "role", "stage", "meat", "pay", "shake", "race", "close", "brain", "coat", "vote", "key"],
          items: ["long e (cheese)", "long o", "long a"],
        },
        {
          id: "w1-a",
          type: "circle",
          label: "A",
          difficulty: 1,
          instruction: "Circle the correct answers.",
          hebrewInstruction: "סמנו את התשובות הנכונות.",
          items: [
            "You put things in a drawer / lamp.",
            "You walk on a ceiling / carpet.",
            "People think with their brain / furniture.",
            "If everything is okay, it's everywhere / fine.",
            "You can have a clever / available idea.",
            "When you want to see something better, you look at it in case / closely.",
          ],
        },
        {
          id: "w1-b",
          type: "circle",
          label: "B",
          difficulty: 2,
          instruction: "Circle the correct answers.",
          hebrewInstruction: "סמנו את התשובות הנכונות.",
          items: [
            "Why are you exploring / hiding? (picture: child hiding in a box)",
            "What are you looking for in the kitchen drawer / ceiling? (picture: person in kitchen)",
            "Which brain / carpet do you like? (picture: carpet)",
            "Would you like an object / a piece of birthday cake? (picture: cake)",
            "Mom, look at this puppy and this kitten. Can we take both / everywhere of them home? (picture: pets)",
          ],
        },
        {
          id: "w1-c",
          type: "circle",
          label: "C",
          difficulty: 2,
          instruction: "Circle the correct answers to complete the sentences.",
          items: [
            "In February, I usually take a jacket … it rains. → a. both  b. in case  c. by the time",
            "The baby wasn't feeling well, so the doctor … her. → a. examined  b. hid  c. escaped",
            "My mother called and told me to come home … . → a. clever  b. immediately  c. closely",
            "This singer is popular … teenagers. → a. object  b. piece  c. among",
            "Are the tickets for the concert still … ? → a. available  b. fine  c. everywhere",
            "David is so tall he can touch the … with his fingers. → a. carpet  b. drawer  c. ceiling",
            "The teacher … that something was wrong when she came into the room. → a. examined  b. explored  c. noticed",
          ],
        },
        {
          id: "w1-d",
          type: "complete",
          label: "D",
          difficulty: 3,
          instruction: "Complete the sentences with the words below.",
          wordBank: ["everywhere", "objects", "piece", "explore", "brain", "closely", "fine"],
          items: [
            "Look ______ and you'll find the answer.",
            "A monkey's ______ weighs about one and a half kilos.",
            "When we do a puzzle, I'm always the one that puts in the last ______.",
            "Shelly hit her head, but she says she's ______.",
            "We lost our keys, looked ______, and finally found them in the fridge.",
            "When Jason travels, he loves to ______ new places.",
            "We saw strange ______ in the sky.",
          ],
        },
        {
          id: "w2-a",
          type: "crossword-clue",
          label: "Words 2 — A",
          difficulty: 1,
          instruction: "Complete the puzzle with the words below.",
          hebrewInstruction: "השלימו את התשבץ עם המילים הבאות.",
          wordBank: ["immediately", "clever", "furniture", "fine", "carpet", "examine", "everywhere", "ceiling"],
          items: [
            "Across: 2. to look closely at something → examine",
            "Across: 5. another word for now → immediately",
            "Across: 7. chairs and tables are called this → furniture",
            "Across: 8. every possible place → everywhere",
            "Down: 1. we put it on the floor → carpet",
            "Down: 3. the opposite of floor → ceiling",
            "Down: 4. another word for smart → clever",
            "Down: 6. another word for OK → fine",
          ],
        },
      ],
    },

    // ─── GRAMMAR 2 ────────────────────────────────────────────────
    {
      id: "grammar2",
      title: "Grammar 2",
      subtitle: "Past Simple: Negative and Questions",
      color: "grammar",
      pages: "119–120",
      reference: "after Student's Book p. 107, exercise C",
      exercises: [
        {
          id: "g2-a",
          type: "circle",
          label: "A",
          difficulty: 1,
          instruction:
            "Look at the pictures and circle the correct form of the verbs.",
          hebrewInstruction:
            "התבוננו בתמונות ובחרו בצורה הנכונה של הפועל.",
          items: [
            "It snowed / didn't snow yesterday.",
            "Atara and Miri went / didn't go to the cinema last night.",
            "Shelly had / didn't have a good day yesterday.",
            "Aviad performed / didn't perform on stage last week.",
            "Meital received / didn't receive a gift for her birthday.",
          ],
        },
        {
          id: "g2-b",
          type: "complete",
          label: "B",
          difficulty: 2,
          instruction:
            "Complete the sentences with the correct form of the verbs in brackets. Use the positive or the negative of the Past Simple.",
          hebrewInstruction:
            "השלימו את המשפטים בצורה הנכונה של הפועל. בחרו בין חיובי לשלילי ב-Past Simple.",
          items: [
            "Amir ______ (break) the lamp. His dog did.",
            "The team played so well, they ______ (win) the game.",
            "The tourists ______ (explore) the island because of the rain.",
            "We ______ (buy) the new carpet. It was too expensive.",
            "The students were happy that they ______ (manage) to finish their science report.",
            "Ella ______ (notice) that she forgot her homework. She went to school without it.",
          ],
        },
        {
          id: "g2-c",
          type: "reading",
          label: "C",
          difficulty: 2,
          instruction:
            "Complete the paragraph with the correct form of the verbs in brackets. Use the Past Simple.",
          content: `**A Great Vacation**

My family and I ¹______ (have) a great time on our summer vacation. It ²______ (not rain) the whole week. Mom ³______ (want) to take a tour of the old city, but my sister ⁴______ (not want) to come. Rina ⁵______ (take) lots of pictures at the beach. She ⁶______ (not go) anywhere else. We ⁷______ (not swim) in the Red Sea because it was too cold. We ⁸______ (go) to the underwater aquarium instead. All of us ⁹______ (have) such a good time. We ¹⁰______ (not want) to go home.`,
        },
        {
          id: "g2-d",
          type: "reading",
          label: "D",
          difficulty: 2,
          instruction:
            "Complete the text with the verbs below. Use the Past Simple, positive or negative.",
          wordBank: ["want", "tell", "come", "change", "believe", "wonder"],
          content: `**Harry Houdini**

Harry Houdini always ¹______ (want) to be a magician. He ²______ (change) his name, Eric, was a good stage name, so he ³______ (tell) his name to Harry Houdini. One of Harry's most famous tricks was getting out of handcuffs. At one event, he ⁴______ (come) 4,000 people and 100 newspaper writers to watch how he did this. After the event, he ⁵______ (believe) them that this was one of the most difficult escapes of his life. People all over the world ⁶______ (wonder) how he was always able to escape. Today, people still call Houdini's escapes the greatest in history.`,
        },
        {
          id: "g2-e",
          type: "write",
          label: "E",
          difficulty: 3,
          instruction:
            "Avi went to an escape room. You want to ask him about his adventures there. Write at least three questions.",
        },
      ],
    },

    // ─── LISTENING & SPEAKING ─────────────────────────────────────
    {
      id: "listening",
      title: "Listening and Speaking",
      subtitle: "The Mystery of Roanoke Island",
      color: "listening",
      pages: "121–123",
      reference: "before Student's Book p. 108",
      exercises: [
        {
          id: "ls-nw1",
          type: "match",
          label: "New Words 1",
          instruction: "Match the words to their meanings. Use the Glossary to help you.",
          hebrewInstruction: "התאימו את המילים למשמעויותיהן. השתמשו במילון שבסוף הספר.",
          columnsA: [
            "as quickly as possible",
            "belief",
            "lead",
            "period",
            "promise",
            "scene",
            "stay away",
          ],
          columnsB: [
            "a. מהר / מהרה",
            "b. אמונה / להאמין",
            "c. להוביל / להנהיג",
            "d. תקופה / זמן",
            "e. הבטחה / להבטיח",
            "f. סצנה / מקום",
            "g. להתרחק / להישאר הרחק",
          ],
        },
        {
          id: "ls-nw2",
          type: "match",
          label: "New Words 2",
          instruction: "Match the words to their meanings.",
          columnsA: ["body", "explanation", "leader", "own", "population", "share", "storm"],
          columnsB: [
            "a. גוף / קבוצה",
            "b. הסבר / פירוש",
            "c. מנהיג / ראש",
            "d. שלו / עצמאי",
            "e. אוכלוסייה / תושבים",
            "f. לחלוק / לשתף",
            "g. סערה / שטף (גשם, רוח, ברד)",
          ],
        },
        {
          id: "ls-listen",
          type: "circle",
          label: "Listen",
          instruction:
            "Listen to the podcast and choose the correct answers.",
          note: "Student's Book p. 108, exercise D",
          items: [
            "The British people first arrived on the island in … → a. 1584  b. 1876  c. 2020",
            "At that time, more than … people lived there. → a. 1,000  b. 300  c. 100",
            "Life was difficult because there wasn't enough … → a. land  b. food  c. weather",
            "They chose John White to be their … → a. doctor  b. teacher  c. leader",
          ],
        },
        {
          id: "ls-a",
          type: "complete",
          label: "A",
          difficulty: 1,
          instruction:
            "Write the words below next to their meanings. Then circle the words in the puzzle.",
          wordBank: ["lead", "belief", "storm", "explanation", "scene", "period", "share", "population", "body", "promise"],
          items: [
            "להוביל / להנהיג → lead",
            "לשתף / לחלוק →",
            "מנהיג / להוביל →",
            "סצנה / תפאורה →",
            "אוכלוסייה →",
            "סערה →",
            "הסבר →",
            "אמונה →",
            "תקופה / זמן →",
            "הבטחה / להבטיח →",
          ],
        },
        {
          id: "ls-b",
          type: "match",
          label: "B",
          instruction: "Match A to B.",
          columnsA: [
            "as quickly as possible",
            "to lead",
            "to stay away",
            "a promise",
            "a storm",
          ],
          columnsB: [
            "a. the opposite of to follow",
            "b. something you say that you will do",
            "c. lots of wind, rain or snow",
            "d. fast, right away",
            "e. the opposite of to come back",
          ],
        },
        {
          id: "ls-c",
          type: "circle",
          label: "C",
          difficulty: 2,
          instruction: "Circle the correct answers.",
          items: [
            "Tel Aviv has a body / population of almost 500,000 people.",
            "Tal's belief / period in herself helps her succeed.",
            "The scene / storm made it difficult to fly the plane.",
            "A good leader / body is very important for a country.",
            "The police asked us for our scene / explanation of the accident.",
            "You should stay away / own from other people if you feel sick.",
          ],
        },
        {
          id: "ls-d",
          type: "circle",
          label: "D",
          difficulty: 3,
          instruction: "Circle the correct answers to complete the sentences.",
          items: [
            "The princess … the children through the forest. → a. led  b. stayed away  c. shared",
            "We've had some bad … this winter. → a. bodies  b. leaders  c. storms",
            "Shani … me she wouldn't tell anyone my secret. → a. owned  b. stayed away  c. promised",
            "China's … is larger than Japan's. → a. period  b. belief  c. population",
            "Eden … his lunch with Adam almost every day. → a. shares  b. owns  c. leads",
          ],
        },
        {
          id: "ls-e1",
          type: "complete",
          label: "E",
          difficulty: 3,
          instruction:
            "Complete the email with the words below. There is one extra word.",
          wordBank: ["promise", "leader", "explanation", "body", "as quickly as possible"],
          content: `Hi Niv,

Yesterday I saw a really good science fiction movie and I thought about you. You have to see it.

It is about a group of kids at summer camp. One day their camp ¹______ disappears without any ²______. The kids try to solve the mystery ³______. I don't want to tell you how the movie ends, but I ⁴______ you'll love it. It's one of the best movies I've seen this year.

Moria`,
        },
        {
          id: "ls-e2",
          type: "write",
          label: "E2",
          difficulty: 2,
          instruction:
            "Write a short reply to Moria about the movie. Use New Words from page 121 to help you.",
          note: "Start with: Hi Moria,",
        },
      ],
    },

    // ─── WRITING ──────────────────────────────────────────────────
    {
      id: "writing",
      title: "Writing",
      subtitle: "A Past Experience",
      color: "writing",
      pages: "124",
      reference: "after Student's Book p. 111",
      exercises: [
        {
          id: "wr-a",
          type: "order",
          label: "A",
          difficulty: 1,
          instruction: "Number the sentences in the correct order.",
          hebrewInstruction: "סדרו את המשפטים בסדר הנכון.",
          items: [
            "Then we called the doctor. He said she needed to rest.",
            "Yesterday, my little sister came home sick from school. (= 1)",
            "Finally, I read her a story and she fell asleep.",
            "Next, I made her favorite toast sandwich for her.",
            "First, I took her to bed.",
          ],
        },
        {
          id: "wr-b",
          type: "complete",
          label: "B",
          difficulty: 2,
          instruction: "Complete the text with the words below.",
          wordBank: ["Finally", "First", "Next", "Then"],
          content: `**Tasty Toast Sandwich**

¹______, you need to buy bread from the bakery. ²______ you go to the market and buy cheese and tomatoes. ³______, you go home and prepare the sandwich. Put butter on one piece of bread, then the cheese and tomatoes. Cover with another piece of bread. ⁴______, put the sandwich in the toaster and wait until it's ready.`,
        },
        {
          id: "wr-c",
          type: "write",
          label: "C",
          difficulty: 3,
          instruction:
            "What is your favorite food? Write a recipe for it. Use connectors in your sentences.",
          note: "Use: First, Next, Then, Finally",
        },
      ],
    },
  ],
};

export default unit4;
