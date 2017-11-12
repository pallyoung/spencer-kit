var  {renderToString} = require('react-dom/server');

var currentTag;
var tags = {

}
global.React = require('react');

global.window = {};
global.navigator = {
    userAgent: ''
}
// global.mlux = {
//     StoreManager:{
//         load:function(){
//             return Promise.resolve()
//         }
//     }
// }
window.jquery = {};
window.document = {
    getElementById: function () {

    },
    documentElement: {
        doScroll: false
    },
    createElement:function(){
        
    },
    location:{
        href:''
    }
}
global.AppRegister = {
    setTag:function(tag){
        currentTag = tag;
    },
    register:function(app){
        tags[currentTag] = renderToString(app);
    },
    getTag:function(tag){
        return tags[tag];
    }
}