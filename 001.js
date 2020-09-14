
let arr = [1, [2, [3, 4]]];
 
function flatten(arr) {
 
    while (arr.some(item => Array.isArray(item))) {
       
        arr = [].concat(...arr);
        console.log(arr)
    }  //ES6新方法
    
    return arr;
}
 
console.log(flatten(arr))