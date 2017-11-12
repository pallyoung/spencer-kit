
(function(){
    if(typeof window === 'undefined'){
        return;
    }
    var isReady = false;
    var readyList = [];
    function fire(){
        readyList.forEach(function(v){
            setTimeout(v);
        });
        readyList = [];
    }   
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed);
        window.removeEventListener("load", completed);
        _ready();
    }
    
    function _ready() {
        isReady =true;
        if (readyList.length <= 0) {
            return;
        }else{
            fire();
        }
    }
    function ready(cb) {
        if (isReady) {
           window.setTimeout(cb); 
        }else{
            readyList.push(cb);
        }
    }
    if(typeof document === 'undefined'){
        ready = function(cb){
            cb();
        }
        return;
    }
    if (document.readyState === "complete" ||
        (document.readyState !== "loading" && !document.documentElement.doScroll)) {

        // Handle it asynchronously to allow scripts the opportunity to delay ready
        window.setTimeout(_ready);

    } else {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", completed);
        // A fallback to window.onload, that will always work
        window.addEventListener("load", completed);
    }
    window.AppRegister = {
        register:function(app){
            ready(function(){
                ReactDOM.render(app,document.getElementById('react-placeholder'));
            }) 
        }
    }
})();
