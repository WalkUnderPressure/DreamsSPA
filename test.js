// const obj = {
//     id : 12,
//     name : 'Jonatan',
//     desc : 'theme song'
// }
// const index = 'id';
// // console.log('obj[i] : ',obj[index]);

// const arr = {... obj}
// arr.id = 12342312;
// console.log('arr',arr);

// const empty = {};
// let target = empty;
// if(Object.keys(target).length === 0 && target.constructor === Object){
//     // console.log('empty');
// }else{
//     // console.log('not empty');
// }

let items_arr = [1,2,3,4,5,6];
console.log(items_arr);
// items_arr.push(7);

const value = 4111;
items_arr = items_arr.filter(item => item !== value)

console.log(items_arr);