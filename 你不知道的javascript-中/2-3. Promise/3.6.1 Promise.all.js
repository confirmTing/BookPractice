let promises = [];
for(let i = 0; i < 10; i++){
    promises.push(new Promise((resolve, reject) => {
        if(i < 9){
            resolve(i);
        }
        reject(i);
    }))
}
//Promise.all需要接收一个参数，是一个数组，通常由Promise实例组成（也可以说任何值，会通过Promise.resolve()进行转化为安全的promise）
//他会接收一个完成的消息是一个由所有传入promise的完成消息组成的数组，与指定的顺序一致，跟完成顺序无关
//promise.all返回的promise仅在所有的promise成员都完成后才会完成，如果任何一个被拒绝的话，这个promise就会立即被拒绝，并丢弃来自其他promise的全部结果
Promise.all(promises).then(values => {
    console.log('values:', values);
}, errs => {
    console.log('errs:', errs);
});
