let {request, run} = require('./utils');
function *foo(val) {
    if (val > 1) {
        val = yield *foo(val - 1);
    }
    return yield request(`${val}http://`);
}

function *bar() {
    let r1 = yield *foo(3);
    console.log(r1);
}

run(bar);
