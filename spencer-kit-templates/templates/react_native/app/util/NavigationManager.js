'use strict'
import React, { Component } from 'react';
import {
    createNavigationContainer,
    StackView,
    createNavigator,
    StackRouter
} from 'react-navigation';

import Screen from './../views/components/Screen';

function getActiveRoute(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getActiveRoute(route);
    }
    return route;
}

function createRouter(routeConfigMap, stackRouterConfig) {
    const router = StackRouter(routeConfigMap, stackRouterConfig);
    let getStateForAction = router.getStateForAction;
    router.getStateForAction = function (action, state) {
        let s = getStateForAction(action, state);
        s.routes.forEach((route, index) => {
            route.index = index;
        });
        currentRoute = getActiveRoute(s);
        return s;
    }
    return router;
}
function createMyNavigator(routeConfigMap, stackRouterConfig) {
    let router = createRouter(routeConfigMap, stackRouterConfig);
    let Navigator = createNavigator(StackView, router, stackRouterConfig);

    return Navigator;
}

let currentRoute;

function createStackNavigator(routeConfigMap, stackRouterConfig) {

    let Navigator = createMyNavigator(routeConfigMap, stackRouterConfig);

    let APPNavigator = createNavigationContainer(Navigator);
    return class MyNavigator extends Component {
        render() {
            return <APPNavigator
                {...this.props}
                onNavigationStateChange={(prevState, currentState) => {
                    currentRoute = getActiveRoute(currentState);
                    this.props.onNavigationStateChange && this.props.onNavigationStateChange(prevState, currentState);
                }} />
        }
    }
}

function getCurrentScreen() {
    if (currentRoute) {
        return Screen.getScreen(currentRoute.key);
    }else{
        return Screen.getScreen();
    };
}
function navigate(...args) {
    let navigation = getCurrentNavigation();
    navigation && navigation.navigate(...args);
}
function goBack(...args) {
    let navigation = getCurrentNavigation();
    navigation && navigation.goBack(...args);
}
function addListener(...args) {
    let navigation = getCurrentNavigation();
    navigation && navigation.goBack(...args);
}

function setParams(...args) {
    let navigation = getCurrentNavigation();
    navigation && navigation.setParams(...args);
}
function getParam() {
    let navigation = getCurrentNavigation();
    navigation && navigation.getParam();
}
function dispatch(...args) {
    let navigation = getCurrentNavigation();
    navigation && navigation.dispatch(...args);
}

function getCurrentNavigation() {
    let screen = getCurrentScreen();
    if (screen) {
        return screen.getNavigation();
    }
    return null;
}

export default {
    navigate,
    goBack,
    addListener,
    setParams,
    getParam,
    dispatch,
    getCurrentNavigation,
    createStackNavigator
}
