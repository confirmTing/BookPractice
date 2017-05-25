function foo() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let rand = Math.ceil(Math.random() * 6);
            if (rand > 2 ){
                reject(`数字大于2:${rand}`);
            }
            resolve(rand);
        },0)
    })
}
// Promise(一旦决议)一直保持其决议结果（完成或拒绝）不变，可以按照需要多次查看
// 一旦p决议不论是现在还是将来下一个步骤总是相同的
let p = foo();
p.then(rand => {
    console.log(rand);
}, errors => {
    console.log(errors);
});

p.then(rand => {
    console.log(rand);
}, errors => {
    console.log(errors);
});
