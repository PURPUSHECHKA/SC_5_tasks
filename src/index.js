/* 
Task 1

Link: https://www.rozhkov.me/when-need-to-know-leetcode/

input: {
  "update_id": 849088941,
  "edited_channel_post": {
    "message_id": 128,
    "date": 1615977800,
    "edit_date": 1615978817,
    "text": "Мы с 👨‍👨‍👦 другом t.me/full_of_hatred решили заработать бабла 💰💰💰. Ссылка — подключайтесь! @xrozhokx расскажет как поднять денег #инфобизнес",
    "entities": [
      {
        "offset": 0,
        "length": 2,
        "type": "bold"
      },
      {
        "offset": 21,
        "length": 19,
        "type": "url"
      },
      {
        "offset": 21,
        "length": 19,
        "type": "italic"
      },
      {
        "offset": 41,
        "length": 6,
        "type": "italic"
      },
      {
        "offset": 48,
        "length": 16,
        "type": "bold"
      },
      {
        "offset": 73,
        "length": 6,
        "type": "text_link",
        "url": "https://www.rozhkov.me/patrons/"
      },
      {
        "offset": 73,
        "length": 6,
        "type": "bold"
      },
      {
        "offset": 80,
        "length": 16,
        "type": "bold"
      },
      {
        "offset": 97,
        "length": 9,
        "type": "mention"
      },
      {
        "offset": 97,
        "length": 9,
        "type": "bold"
      },
      {
        "offset": 107,
        "length": 28,
        "type": "bold"
      },
      {
        "offset": 135,
        "length": 11,
        "type": "hashtag"
      }
    ]
  }
}

output:
<b>Мы</b>
с 👨‍👨‍👦 другом
<a href="t.me/full_of_hatred"><i>t.me/full_of_hatred</i></a>
<i>решили</i>
<b>заработать бабла</b>
💰💰💰.
<a href="https://www.rozhkov.me/patrons/"><b>Ссылка</b></a>
<b>— подключайтесь!</b>
<a href="https://t.me/xrozhokx"><b>@xrozhokx</b></a>
<b>расскажет как поднять денег </b>
#инфобизнес

*/
const input = JSON.parse(
  "{\n" +
    '  "update_id": 849088941,\n' +
    '  "edited_channel_post": {\n' +
    '    "message_id": 128,\n' +
    '    "date": 1615977800,\n' +
    '    "edit_date": 1615978817,\n' +
    '    "text": "Мы с 👨‍👨‍👦 другом t.me/full_of_hatred решили заработать бабла 💰💰💰. Ссылка — подключайтесь! @xrozhokx расскажет как поднять денег #инфобизнес",\n' +
    '    "entities": [\n' +
    "      {\n" +
    '        "offset": 0,\n' +
    '        "length": 2,\n' +
    '        "type": "bold"\n' +
    "      },\n" +
    "      {\n" +
    '        "offset": 21,\n' +
    '        "length": 19,\n' +
    '        "type": "url"\n' +
    "      },\n" +
    "      {\n" +
    '        "offset": 21,\n' +
    '        "length": 19,\n' +
    '        "type": "italic"\n' +
    "      },\n" +
    "      {\n" +
    '        "offset": 41,\n' +
    '        "length": 6,\n' +
    '        "type": "italic"\n' +
    "      },\n" +
    "      {\n" +
    '        "offset": 48,\n' +
    '        "length": 16,\n' +
    '        "type": "bold"\n' +
    "      },\n" +
    "      {\n" +
    '        "offset": 73,\n' +
    '        "length": 6,\n' +
    '        "type": "text_link",\n' +
    '        "url": "https://www.rozhkov.me/patrons/"\n' +
    "      },\n" +
    "      {\n" +
    '        "offset": 73,\n' +
    '        "length": 6,\n' +
    '        "type": "bold"\n' +
    "      },\n" +
    "      {\n" +
    '        "offset": 80,\n' +
    '        "length": 16,\n' +
    '        "type": "bold"\n' +
    "      },\n" +
    "      {\n" +
    '        "offset": 97,\n' +
    '        "length": 9,\n' +
    '        "type": "mention"\n' +
    "      },\n" +
    "      {\n" +
    '        "offset": 97,\n' +
    '        "length": 9,\n' +
    '        "type": "bold"\n' +
    "      },\n" +
    "      {\n" +
    '        "offset": 107,\n' +
    '        "length": 28,\n' +
    '        "type": "bold"\n' +
    "      },\n" +
    "      {\n" +
    '        "offset": 135,\n' +
    '        "length": 11,\n' +
    '        "type": "hashtag"\n' +
    "      }\n" +
    "    ]\n" +
    "  }\n" +
    "}"
);

const entities = input.edited_channel_post.entities;
const inputText = input.edited_channel_post.text;
const htmlEntities = [];
let outputText = inputText;

entities.sort((a, b) => {
  return (a.type === "bold" || a.type === "italic") &&
    (b.type === "text_link" || b.type === "url")
    ? -1
    : 1;
});

// {
//   "offset": 80,
//   "length": 16,
//   "type": "bold"
// },
// ctrl + /
/* switch (element.type) {
  case 'bold'
} === if (element.type === 'bold') */
entities.forEach((element, index, arr) => {
  let tagStart = "";
  let tagEnd = "";
  const startPos = element.offset;
  const endPos = startPos + element.length;
  switch (element.type) {
    case "bold":
      tagStart = "<b>";
      tagEnd = "</b>";
      break;
    case "italic":
      tagStart = "<i>";
      tagEnd = "</i>";
      break;
    case "url":
      tagStart = `<a href="${inputText.slice(element.offset, endPos)}">`;
      tagEnd = "</a>";
      break;
    case "hashtag":
      tagStart = "";
      tagEnd = "";
      break;
    case "mention":
      tagStart = `<a href="https://t.me/${inputText.slice(
        element.offset + 1,
        endPos
      )}">`;
      tagEnd = "</a>";
      break;
    case "text_link":
      tagStart = `<a href="${element.url}">`;
      tagEnd = "</a>";
      break;
    default:
      tagStart = "";
      tagEnd = "";
  }
  htmlEntities[element.offset] = htmlEntities[element.offset]
    ? [startPos, endPos, tagStart + htmlEntities[element.offset][2] + tagEnd]
    : [startPos, endPos, tagStart + inputText.slice(startPos, endPos) + tagEnd];
});

// [,,,[10, 5, <a href=""><b>text</b></a>],,,,]

htmlEntities
  .map((_, index) => {
    //console.log(index)
    return index;
  })
  .reverse()
  .forEach((element) => {
    // console.log(htmlEntities[element][2])
    const startPos = htmlEntities[element][0];
    const endPos = htmlEntities[element][1];

    outputText =
      outputText.slice(0, startPos) +
      htmlEntities[element][2] +
      outputText.slice(endPos);
  });

// [1,2,'<b>bc</b>']
// abcdef
// a<b>bc</b>def

// <a href=""><b>text</b></a>
//https://www.codewars.com/kata/coding-meetup-number-9-higher-order-functions-series-is-the-meetup-age-diverse
// var list1 = [
//   { firstName: 'Harry', lastName: 'K.', country: 'Brazil', continent: 'Americas', age: 19, language: 'Python' },
//   { firstName: 'Kseniya', lastName: 'T.', country: 'Belarus', continent: 'Europe', age: 29, language: 'JavaScript' },
//   { firstName: 'Jing', lastName: 'X.', country: 'China', continent: 'Asia', age: 39, language: 'Ruby' },
//   { firstName: 'Noa', lastName: 'A.', country: 'Israel', continent: 'Asia', age: 40, language: 'Ruby' },
//   { firstName: 'Andrei', lastName: 'E.', country: 'Romania', continent: 'Europe', age: 59, language: 'C' },
//   { firstName: 'Maria', lastName: 'S.', country: 'Peru', continent: 'Americas', age: 60, language: 'C' },
//   { firstName: 'Lukas', lastName: 'X.', country: 'Croatia', continent: 'Europe', age: 75, language: 'Python' },
//   { firstName: 'Chloe', lastName: 'K.', country: 'Guernsey', continent: 'Europe', age: 88, language: 'Ruby' },
//   { firstName: 'Viktoria', lastName: 'W.', country: 'Bulgaria', continent: 'Europe', age: 98, language: 'PHP' },
//   { firstName: 'Piotr', lastName: 'B.', country: 'Poland', continent: 'Europe', age: 128, language: 'JavaScript' }
// ];

function isAgeDiverse(list) {
  const arrOfNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}

// console.log(isAgeDiverse(list1))

//Ваша задача вернуть количество разработчиков JavaScript из Европы .

// https://www.codewars.com/kata/coding-meetup-number-1-higher-order-functions-series-count-the-number-of-javascript-developers-coming-from-europe

var list1 = [
  {
    firstName: "Noah",
    lastName: "M.",
    country: "Switzerland",
    continent: "Europe",
    age: 19,
    language: "JavaScript"
  },
  {
    firstName: "Maia",
    lastName: "S.",
    country: "Tahiti",
    continent: "Europe",
    age: 28,
    language: "JavaScript"
  },
  {
    firstName: "Shufen",
    lastName: "L.",
    country: "Taiwan",
    continent: "Asia",
    age: 35,
    language: "HTML"
  },
  {
    firstName: "Sumayah",
    lastName: "M.",
    country: "Tajikistan",
    continent: "Asia",
    age: 30,
    language: "CSS"
  }
];

function countDevelopers(list) {
  // let developers = list.filter(it => {
  //   console.log(`it.continent: ${it.continent === `Europe`} && it.language: ${it.language === 'JavaScript'}`)
  //   return it.continent === `Europe` && it.language === 'JavaScript'
  // })
  // return developers.length
  return list.reduce((acc, obj) => {
    if (obj.continent === `Europe` && obj.language === "JavaScript") {
      return acc + 1;
    }
    return acc;
  }, 0);
}
//  console.log(countDevelopers(list1))

// https://www.codewars.com/kata/coding-meetup-number-2-higher-order-functions-series-greet-developers

/* arr -  list1 = [
  { firstName: 'Sofia', lastName: 'I.', country: 'Argentina', continent: 'Americas', age: 35, language: 'Java' },
  { firstName: 'Lukas', lastName: 'X.', country: 'Croatia', continent: 'Europe', age: 35, language: 'Python' },
  { firstName: 'Madison', lastName: 'U.', country: 'United States', continent: 'Americas', age: 32, language: 'Ruby' } 
]; */

const greetDevelopersList = [
  {
    firstName: "Sofia",
    lastName: "I.",
    country: "Argentina",
    continent: "Americas",
    age: 35,
    language: "Java"
  },
  {
    firstName: "Lukas",
    lastName: "X.",
    country: "Croatia",
    continent: "Europe",
    age: 35,
    language: "Python"
  },
  {
    firstName: "Madison",
    lastName: "U.",
    country: "United States",
    continent: "Americas",
    age: 32,
    language: "Ruby"
  }
];
function greetDevelopers(list) {
  return list.reduce((acc, rec) => {
    console.log(`ACC - ${JSON.stringify(acc)}`);
    return [
      ...acc,
      {
        ...rec,
        greeting: `Hi ${rec.firstName}, what do you like the most about ${rec.language}?`
      }
    ];
  }, []);

  //   return list.map((rec) => {
  //   return {...rec, greeting: `Hi ${rec.firstName}, what do you like the most about ${rec.language}?`}
  // })
}
// console.log(greetDevelopers(greetDevelopersList))
/* 
[
  { firstName: 'Sofia', lastName: 'I.', country: 'Argentina', continent: 'Americas', age: 35, language: 'Java',
    greeting: 'Hi Sofia, what do you like the most about Java?'
  },
  { firstName: 'Lukas', lastName: 'X.', country: 'Croatia', continent: 'Europe', age: 35, language: 'Python',
    greeting: 'Hi Lukas, what do you like the most about Python?'
  },
  { firstName: 'Madison', lastName: 'U.', country: 'United States', continent: 'Americas', age: 32, language: 'Ruby',
    greeting: 'Hi Madison, what do you like the most about Ruby?'
  } 
];
*/

/* https://www.codewars.com/kata/5827acd5f524dd029d0005a4/train/javascript

Ваша задача вернуть:

true если зарегистрировался хотя бы один Ruby-разработчик; или
false если не будет Ruby разработчиков.
*/
var list1 = [
  {
    firstName: "Emma",
    lastName: "Z.",
    country: "Netherlands",
    continent: "Europe",
    age: 29,
    language: "Ruby"
  },
  {
    firstName: "Piotr",
    lastName: "B.",
    country: "Poland",
    continent: "Europe",
    age: 128,
    language: "Javascript"
  },
  {
    firstName: "Jayden",
    lastName: "P.",
    country: "Jamaica",
    continent: "Americas",
    age: 42,
    language: "JavaScript"
  }
];

// function isRubyComing(list) {
//  return list.some(it => it.language === 'Ruby')
// }

function isRubyComing(list) {
  return !!(list.filter((it) => it.language === "Ruby").length || 0);
}
// !!NaN - false
// !!null - false
// !!undefined - false
// !!1 - true
// !!string - true
// !!'' - false
console.log(isRubyComing(list1));

/* 
https://www.codewars.com/kata/coding-meetup-number-4-higher-order-functions-series-find-the-first-python-developer
Ваша задача - вернуть одну из следующих строк:

< firstName here >, < country here > первого зарегистрировавшегося разработчика Python; или
There will be no Python developers если ни один разработчик Python не зарегистрировался
*/

var list1 = [
  {
    firstName: "Mark",
    lastName: "G.",
    country: "Scotland",
    continent: "Europe",
    age: 22,
    language: "JavaScript"
  },
  {
    firstName: "Victoria",
    lastName: "T.",
    country: "Puerto Rico",
    continent: "Americas",
    age: 30,
    language: "Python"
  },
  {
    firstName: "Emma",
    lastName: "B.",
    country: "Norway",
    continent: "Europe",
    age: 19,
    language: "Clojure"
  }
];

function getFirstPython(list) {
  return list.find((it) => it.language === "Python");
}

console.log(getFirstPython(list1));

/*
You will be given an array of objects representing data about developers who have signed up to attend the next coding meetup that you are organising.

Given the following input array:

var list1 = [  
  { firstName: 'Nikau', lastName: 'R.', country: 'New Zealand', continent: 'Oceania', age: 39, language: 'Ruby' },
  { firstName: 'Precious', lastName: 'G.', country: 'South Africa', continent: 'Africa', age: 22, language: 'JavaScript' },
  { firstName: 'Maria', lastName: 'S.', country: 'Peru', continent: 'Americas', age: 30, language: 'C' },
  { firstName: 'Agustin', lastName: 'V.', country: 'Uruguay', continent: 'Americas', age: 19, language: 'JavaScript' }
];
Write a function that returns the array sorted alphabetically by the programming language. In case there are some developers that code in the same language, sort them alphabetically by the first name:

[ 
  { firstName: 'Maria', lastName: 'S.', country: 'Peru', continent: 'Americas', age: 30, language: 'C' },
  { firstName: 'Agustin', lastName: 'V.', country: 'Uruguay', continent: 'Americas', age: 19, language: 'JavaScript' },
  { firstName: 'Precious', lastName: 'G.', country: 'South Africa', continent: 'Africa', age: 22, language: 'JavaScript' },
  { firstName: 'Nikau', lastName: 'R.', country: 'New Zealand', continent: 'Oceania', age: 39, language: 'Ruby' }
];
Notes:

The input array will always be valid and formatted as in the example above.
The array does not include developers coding in the same language and sharing the same name.
*/
var list1 = [
  {
    firstName: "Nikau",
    lastName: "R.",
    country: "New Zealand",
    continent: "Oceania",
    age: 39,
    language: "Ruby"
  },
  {
    firstName: "Precious",
    lastName: "G.",
    country: "South Africa",
    continent: "Africa",
    age: 22,
    language: "JavaScript"
  },
  {
    firstName: "Maria",
    lastName: "S.",
    country: "Peru",
    continent: "Americas",
    age: 30,
    language: "C"
  },
  {
    firstName: "Maria",
    lastName: "S.",
    country: "Peru",
    continent: "Americas",
    age: 30,
    language: "Clojure"
  },
  {
    firstName: "Agustin",
    lastName: "V.",
    country: "Uruguay",
    continent: "Americas",
    age: 19,
    language: "JavaScript"
  }
];

function sortByLanguage(list) {
  console.log(list);
  return list.sort(
    ({ language: l1, firstName: f1 }, { language: l2, firstName: f2 }) => {
      if (l1 === l2) {
        return f1.localeCompare(f2);
      }
      return l1.localeCompare(l2);
    }
  );
}

// function sortByLanguage(list) {
//   return list
//     .sort((a, b) => {
//       return a.firstName.localeCompare(b.firstName);
//     })
//     .sort((a, b) => {
//       return a.language.localeCompare(b.language);
//     });
// }

// console.log(sortByLanguage(list1))
console.log(
  sortByLanguage([
    {
      firstName: "Hugo",
      lastName: "K.",
      country: "Spain",
      continent: "Europe",
      age: 39,
      language: "Python"
    },
    {
      firstName: "Emilija",
      lastName: "S.",
      country: "Lithuania",
      continent: "Europe",
      age: 19,
      language: "Python"
    },
    {
      firstName: "Zoah",
      lastName: "M.",
      country: "Switzerland",
      continent: "Europe",
      age: 19,
      language: "C"
    },
    {
      firstName: "Yusuf",
      lastName: "N.",
      country: "Turkey",
      continent: "Europe",
      age: 22,
      language: "Python"
    },
    {
      firstName: "Nor",
      lastName: "E.",
      country: "Malaysia",
      continent: "Asia",
      age: 21,
      language: "Clojure"
    },
    {
      firstName: "Aadya",
      lastName: "Y.",
      country: "India",
      continent: "Asia",
      age: 29,
      language: "PHP"
    },
    {
      firstName: "Muka",
      lastName: "J.",
      country: "Slovenia",
      continent: "Europe",
      age: 29,
      language: "Clojure"
    },
    {
      firstName: "Kaia",
      lastName: "S.",
      country: "Tahiti",
      continent: "Oceania",
      age: 28,
      language: "Clojure"
    },
    {
      firstName: "Mamadou",
      lastName: "E.",
      country: "Mali",
      continent: "Africa",
      age: 22,
      language: "Python"
    },
    {
      firstName: "Madison",
      lastName: "U.",
      country: "United States",
      continent: "Americas",
      age: 32,
      language: "Ruby"
    },
    {
      firstName: "Jakubik",
      lastName: "I.",
      country: "Slovakia",
      continent: "Europe",
      age: 28,
      language: "Java"
    },
    {
      firstName: "George",
      lastName: "B.",
      country: "England",
      continent: "Europe",
      age: 21,
      language: "C"
    },
    {
      firstName: "Rimas",
      lastName: "C.",
      country: "Jordan",
      continent: "Asia",
      age: 44,
      language: "Java"
    },
    {
      firstName: "Yerasyl",
      lastName: "D.",
      country: "Kazakhstan",
      continent: "Asia",
      age: 22,
      language: "Ruby"
    },
    {
      firstName: "Precious",
      lastName: "G.",
      country: "South Africa",
      continent: "Africa",
      age: 22,
      language: "JavaScript"
    },
    {
      firstName: "Hannah",
      lastName: "L.",
      country: "Hungary",
      continent: "Europe",
      age: 29,
      language: "JavaScript"
    },
    {
      firstName: "Mehdi",
      lastName: "H.",
      country: "Tunisia",
      continent: "Africa",
      age: 42,
      language: "Python"
    },
    {
      firstName: "Agustin",
      lastName: "M.",
      country: "Chile",
      continent: "Americas",
      age: 37,
      language: "C"
    },
    {
      firstName: "Nareh",
      lastName: "Q.",
      country: "Armenia",
      continent: "Europe",
      age: 30,
      language: "Clojure"
    },
    {
      firstName: "Annah",
      lastName: "R.",
      country: "Liechtenstein",
      continent: "Europe",
      age: 32,
      language: "JavaScript"
    }
  ])
);

/* 

[ { firstName: 'Zoah',
    lastName: 'M.',
    country: 'Switzerland',
    continent: 'Europe',
    age: 19,
    language: 'C' },
  { firstName: 'George',
    lastName: 'B.',
    country: 'England',
    continent: 'Europe',
    age: 21,
    language: 'C' },
  { firstName: 'Agustin',
    lastName: 'M.',
    country: 'Chile',
    continent: 'Americas',
    age: 37,
    language: 'C' },
  { firstName: 'Muka',
    lastName: 'J.',
    country: 'Slovenia',
    continent: 'Europe',
    age: 29,
    language: 'Clojure' },
  { firstName: 'Nareh',
    lastName: 'Q.',
    country: 'Armenia',
    continent: 'Europe',
    age: 30,
    language: 'Clojure' },
  { firstName: 'Nor',
    lastName: 'E.',
    country: 'Malaysia',
    continent: 'Asia',
    age: 21,
    language: 'Clojure' },
  { firstName: 'Kaia',
    lastName: 'S.',
    country: 'Tahiti',
    continent: 'Oceania',
    age: 28,
    language: 'Clojure' },
  { firstName: 'Rimas',
    lastName: 'C.',
    country: 'Jordan',
    continent: 'Asia',
    age: 44,
    language: 'Java' },
  { firstName: 'Jakubik',
    lastName: 'I.',
    country: 'Slovakia',
    continent: 'Europe',
    age: 28,
    language: 'Java' },
  { firstName: 'Annah',
    lastName: 'R.',
    country: 'Liechtenstein',
    continent: 'Europe',
    age: 32,
    language: 'JavaScript' },
  { firstName: 'Precious',
    lastName: 'G.',
    country: 'South Africa',
    continent: 'Africa',
    age: 22,
    language: 'JavaScript' },
  { firstName: 'Hannah',
    lastName: 'L.',
    country: 'Hungary',
    continent: 'Europe',
    age: 29,
    language: 'JavaScript' },
  { firstName: 'Aadya',
    lastName: 'Y.',
    country: 'India',
    continent: 'Asia',
    age: 29,
    language: 'PHP' },
  { firstName: 'Mehdi',
    lastName: 'H.',
    country: 'Tunisia',
    continent: 'Africa',
    age: 42,
    language: 'Python' },
  { firstName: 'Hugo',
    lastName: 'K.',
    country: 'Spain',
    continent: 'Europe',
    age: 39,
    language: 'Python' },
  { firstName: 'Emilija',
    lastName: 'S.',
    country: 'Lithuania',
    continent: 'Europe',
    age: 19,
    language: 'Python' },
  { firstName: 'Yusuf',
    lastName: 'N.',
    country: 'Turkey',
    continent: 'Europe',
    age: 22,
    language: 'Python' },
  { firstName: 'Mamadou',
    lastName: 'E.',
    country: 'Mali',
    continent: 'Africa',
    age: 22,
    language: 'Python' },
  { firstName: 'Madison',
    lastName: 'U.',
    country: 'United States',
    continent: 'Americas',
    age: 32,
    language: 'Ruby' },
  { firstName: 'Yerasyl',
    lastName: 'D.',
    country: 'Kazakhstan',
    continent: 'Asia',
    age: 22,
    language: 'Ruby' } ]
*/
