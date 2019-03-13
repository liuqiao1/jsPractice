let obj = {a:1};
function testTrans(obj){
    obj.a = 2;
}
testTrans(obj);
console.log(obj);// 2

let count = 0;
function func(num){
    num = 2;
}
func(count);
console.log(count);// 0