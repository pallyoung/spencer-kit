'use strict'
import pages from './../pages';
import Screen from './../components/Screen';


var routes = {};

function isMap(o) {
    return typeof o === 'object' && o.constructor === Object;
}
function isComponent(o) {
    return o instanceof (SceneComponent);
}
function lowerCase(s){
    return s.toLowerCase();
}
function flattenPages(pages) {
    var page,pageConfig;
    for (var o in pages) {
        page = pages[o];
        if (isMap(page)) {
            flattenPages(page);
        } else {
            pageConfig = page.pageConfig||{};
            routes[o] = { screen: Screen(page), ...pageConfig};
        }
    }
}

flattenPages(pages);

export default routes;