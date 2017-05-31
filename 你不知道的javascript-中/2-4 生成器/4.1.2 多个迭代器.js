function *foo() {
    let x = yield 2;
    z++;
    let y = yield (x * z);
    console.log(x, y, z);
}
let z = 1;

let it1 = foo();
let it2 = foo();

let res1 = it1.next();
let res2 = it2.next();

res1 = it1.next(res2.value * 10);
res2 = it2.next(res1.value * 5);
console.log(res1, res2)

let res11 = it1.next(res2.value / 2);
let res22 = it2.next(res1.value / 4);

console.log(res11, res22);
