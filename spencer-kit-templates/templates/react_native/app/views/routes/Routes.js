'use strict'
import pages from './../pages';
import Screen from './../components/Screen';

// var back = NavigationActions.back;

// NavigationActions.back = function (config) {
//     if (config && config.key.indexOf('_') === -1) {
//         var key = config.key;
//         var scenes = headerProps.scenes;
//         var scene;
//         for (var i = scenes.length - 1; i >= 0; i--) {
//             scene = scenes[i];
//             if (scene.route.routeName == key) {
//                 key = scenes[i + 1].route.key;
//                 config.key = key;
//                 break;
//             }
//         }
//     }
//     return back.call(NavigationActions, config);
// }

var routes = {};

function isMap(o) {
    return typeof o === 'object' && o.constructor === Object;
}
function isComponent(o) {
    return o instanceof (SceneComponent);
}
function flattenPages(pages) {
    var page;
    for (var o in pages) {
        page = pages[o];
        if (isMap(page)) {
            flattenPages(page);
        } else {
            routes[o] = { screen: Screen(page) };
        }
    }
}

flattenPages(pages);

export default routes;