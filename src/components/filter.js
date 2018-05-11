// const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];
//
// /**
//  * Array filters items based on search criteria (query)
//  */
// const filterItems = (query) => {
//     return fruits.filter((el) =>
//         el.toLowerCase().indexOf(query.toLowerCase()) > -1
//     );
// };
//
// console.log(filterItems('ap')); // ['apple', 'grapes']
// console.log(filterItems('an')); // ['banana', 'mango', 'orange']


// const contacts = [
//     {name: "John", surname: "Doe", number: "+380734562396"},
//     {name: "Richard", surname: "Brown", number: "+752127637543"},
//     {name: "Alice", surname: "Smith", number: "+47227876347"},
// ];

// filtered = key => {
//     return
// };


// for (let i in contacts) {
//     for (let key in contacts[i]) {
//         if (contacts[i][key].toLowerCase().indexOf(event.target.value.toLowerCase()) > -1) {
//             filteredContacts = [...filteredContacts, contacts[i]]
//         }
//     }
// }

const list = [{name: "all", age: 1},
    {name: "b", age: 2},
    {name: "c", age: 3}
    ];

const substring = "a";

// WORKS
const index = list.filter(item => Object.keys(item).find(key => String(item[key]).includes(substring)));
console.log(index);

// const index = list => {console.log(list[0])};
// console.log(index);

// const index = list.filter(item => {
//     if (item === substring) {
//         console.log("True", item);
//         return item;
//     }
//     console.log("False", item);
//     return item;
// }
// );

// const filteredContacts = contacts.filter(contact => {
//     for (let key in contact) {
//         if (contact[key].toLowerCase().indexOf(substring.toLowerCase()) > -1) return true;
//     }
//     return false;
// });