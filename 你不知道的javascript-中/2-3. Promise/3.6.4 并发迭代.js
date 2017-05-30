if (!Promise.map){
    Promise.map = (vals, cb) => {
        return Promise.all(vals.map(v => {
            return new Promise(resolve => {
                cb(Promise.resolve(v), resolve)
            })
        }));
    }
}

let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = Promise.reject('oops');

Promise.map([p1, p2, p3], (p, resolve) => {
    p.then(v => {
        resolve(v * 2);
    }, resolve);
}).then(vals => {
    console.log(vals);
});

