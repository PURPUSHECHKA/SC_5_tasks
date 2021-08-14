/* 
Task1
https://codewars.com/kata/coding-meetup-number-5-higher-order-functions-series-prepare-the-count-of-languages

Ваша задача - вернуть объект (ассоциативный массив в PHP),
который включает количество языков программирования, представленных на встрече .
*/

// const list1 = [
//   { firstName: 'Noah', lastName: 'M.', country: 'Switzerland', continent: 'Europe', age: 19, language: 'C' },
//   { firstName: 'Anna', lastName: 'R.', country: 'Liechtenstein', continent: 'Europe', age: 52, language: 'JavaScript' },
//   { firstName: 'Ramon', lastName: 'R.', country: 'Paraguay', continent: 'Americas', age: 29, language: 'Ruby' },
//   { firstName: 'George', lastName: 'B.', country: 'England', continent: 'Europe', age: 81, language: 'C' },
// ];
// function countLanguages(newList) {
//   const newObj = newList.reduce((acc, rec) => {
//     if (typeof acc[rec.language] === 'undefined'){

//       console.log('if undefined', { ...acc, [rec.language]: 1});
//       return { ...acc, [rec.language]: 1}
//     }
//     console.log('if not undefined', { ...acc, /* ключ */[rec.language]:
//        /* значение + 1*/ acc[rec.language] + 1})
//     return { ...acc, [rec.language]: acc[rec.language] + 1}
//   },{})
//   return newObj
// }

// console.log(countLanguages(list1)) // { C: 2, JavaScript: 1, Ruby: 1 }

/* Доп задача - подсчет среднего возраста с выводом в объект вида {age : <middle age>} */
function middleAge(newList) {
   let count = 0
   return newList.reduce((acc, obj, i) => {
     count += obj.age
    if (i === newList.length - 1) {
      return {...acc, age: count / newList.length}
    }
    return acc
   }, {})
}
// console.log(middleAge(list1)) // {age : <middle age>}

function middleAge2(newList) {
  const sum = newList.reduce((acc, rec) => {
    console.log(`Acc: ${acc}, Rec: ${rec}`)
    return { ...acc, age: acc.age + rec.age }
  }, {age: 0})
  return {age: sum.age / newList.length}
}
// console.log(middleAge2(list1)) // {age : <middle age>}

function middleAge3(newList) {
 const sum = newList.reduce((acc, obj) => acc + obj.age, 0)
 return {age: sum / newList.length}
}
// console.log(middleAge3(list1)) // {age : <middle age>}

/* 
https://www.codewars.com/kata/58287977ef8d4451f90001a0/train/javascript

Вам будет предоставлен массив объектов (ассоциативные массивы в PHP), представляющих данные о разработчиках, которые
подписались на следующую встречу по кодированию, которую вы организуете.

Ваша задача вернуть либо:

true если все разработчики в списке используют один и тот же язык; или
false иначе.
*/
const list1 = [
  {
    firstName: "Daniel",
    lastName: "J.",
    country: "Aruba",
    continent: "Americas",
    age: 42,
    language: "JavaScript"
  },
  {
    firstName: "Kseniya",
    lastName: "T.",
    country: "Belarus",
    continent: "Europe",
    age: 22,
    language: "JavaScript"
  },
  {
    firstName: "Hanna",
    lastName: "L.",
    country: "Hungary",
    continent: "Europe",
    age: 65,
    language: "JavaScript"
  }
];

const list2 = [
  {
    firstName: "Mariami",
    lastName: "G.",
    country: "Georgia",
    continent: "Europe",
    age: 29,
    language: "Python"
  },
  {
    firstName: "Mia",
    lastName: "H.",
    country: "Germany",
    continent: "Europe",
    age: 39,
    language: "Ruby"
  },
  {
    firstName: "Maria",
    lastName: "I.",
    country: "Greece",
    continent: "Europe",
    age: 32,
    language: "C"
  }
];

function isSameLanguage(list) {
  const filteredArr = list.filter((it) => {
    return list[0].language === it.language;
  });
  return filteredArr.length === list.length;
}
// console.log(isSameLanguage(list1)); // true
// console.log(isSameLanguage(list2)); // false

function isSameLanguage1(list) {
  const obj = list.reduce((acc, rec, index) => {
    if (list[0].language.indexOf(rec.language) === -1) {
      return false;
    }
    return true;
  });
  return obj;
}
// console.log(isSameLanguage1(list1)); // true
// console.log(isSameLanguage1(list2)); // false

function isSameLanguage2(list) {
  // return list.map((obj) => obj.language)
  // .filter((el, i, arr) => arr.indexOf(el) === i).length === 1
  const arrOfLanguage = list.map((obj) => obj.language);
  return [...new Set(arrOfLanguage)].length === 1;
}
// console.log(isSameLanguage2(list1)); // true
// console.log(isSameLanguage2(list2)); // false

function isSameLanguage3(list) {
  const lang = list[0].language;
  return list.every((person) => person.language === lang);
}

//  console.log(isSameLanguage3(list1)); // true
//  console.log(isSameLanguage3(list2)); // false

function isSameLanguage4(list) {
  const lang = list[0].language;
  return !list.some((item) => item.language !== lang);
}

// console.log(isSameLanguage4(list1)); // true
// console.log(isSameLanguage4(list2)); // false

/*
https://www.codewars.com/kata/582887f7d04efdaae3000090/train/javascript

Вам будет предоставлена ​​последовательность объектов, представляющих данные о разработчиках,
которые подписались на следующую встречу по кодированию, которую вы организуете.
Ваша задача - вернут ь последовательность,
в которую входит самый старший разработчик.
В случае ничьей, включите всех старших разработчиков того же возраста,
перечисленных в том же порядке, в каком они были указаны в исходном входном массиве.
*/

const listOfObj = [
  {
    firstName: "Gabriel",
    lastName: "X.",
    country: "Monaco",
    continent: "Europe",
    age: 49,
    language: "PHP"
  },
  {
    firstName: "Odval",
    lastName: "F.",
    country: "Mongolia",
    continent: "Asia",
    age: undefined,
    language: "Python"
  },
  {
    firstName: "Emilija",
    lastName: "S.",
    country: "Lithuania",
    continent: "Europe",
    age: 61,
    language: "Python"
  },
  {
    firstName: "Sou",
    lastName: "B.",
    country: "Japan",
    continent: "Asia",
    age: 61,
    language: "PHP"
  }
];

function findSenior(list) {
  const maxAge = list.reduce((acc, it) => {
    if (acc < it.age) {
      return it.age;
    }
    return acc;
  }, 0);
  return list.filter((it) => it.age === maxAge);
}
console.log(findSenior(listOfObj));

function findSenior1(list) {
  const ages = list.map((it) => (typeof it.age === "undefined" ? 0 : it.age));
  const maxAge = Math.max(...ages);
  return list.filter((it) => it.age === maxAge);
}
console.log(findSenior1(listOfObj));

// const recursion = (arr, nmb) => {
//     if ((arr[0] + arr[1]) === nmb) {
//       return [arr[0], arr[1]]
//     }
//     return recursion(arr.slice(0, arr.length - 1), nmb)

// }

// console.log(recursion([1,2,3,4,5,6,7], 9))
