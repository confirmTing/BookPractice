;(function(){
    function a(cb){
        console.log("a")
        setTimeout(() => {
            cb();
        }, 0)
    }

    function b(){
        console.log('b')
    }

    function c(){
        console.log('c')
    }

    a(() => {
        b();
    })
    c();
})()
