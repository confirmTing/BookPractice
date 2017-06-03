function *foo() {
    console.log(`inside1 *foo:${yield 'B'}`);   //inside1 *foo:2
    console.log(`inside2 *foo:${yield 'C'}`);   //inside2 *foo:3
    return 'D';
}

function *bar() {
    console.log(`inside1 *bar:${yield 'A'}`);     //inside1 *bar:1
    console.log(`inside2 *bar:${yield *foo()}`);  //inside2 *bar: D
    console.log(`inside3 *bar:${yield 'E'}`);
    return 'F';
}

let it = bar();
console.log(`outSide1:${it.next().value}`);   //A
console.log(`outSide2:${it.next(1).value}`);  //B
console.log(`outSide3:${it.next(2).value}`);  //C
//通过*bar()内部的yield委托传入等待的*foo内部的 yield 'C'表达式
console.log(`outSide4:${it.next(3).value}`);  //E
console.log(`outSide5:${it.next(4).value}`);  //F

function *baz() {
    console.log(`inside *baz.1:${yield 'A1'}`);
    console.log(`inside *baz.2:${yield *['B1', 'C1', 'D1']}`);
    console.log(`inside *baz.3:${yield 'E1'}`);
    return 'F';
}

it = baz();
console.log(`outSideBaz1:${it.next().value}`);
console.log(`outSideBaz2:${it.next(1).value}`);
console.log(`outSideBaz3:${it.next(2).value}`);
console.log(`outSideBaz4:${it.next(3).value}`);
console.log(`outSideBaz5:${it.next(4).value}`);
console.log(`outSideBaz6:${it.next(5).value}`);

//异常也会被委托