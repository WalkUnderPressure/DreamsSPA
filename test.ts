export default null;
let arr_0: string[]  = ['a','b','c'];
let arr_1: string[] = ['1','2','3'];

const item = {
    arr_0,
    arr_1
};

const target='arr_0';
const index = 0;

console.log('item before : ', item);

item[target] = item[target].filter( (item,i) => i !== index);

console.log('item after : ', item);