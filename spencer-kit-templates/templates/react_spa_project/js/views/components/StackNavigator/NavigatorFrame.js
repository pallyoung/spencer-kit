'use strict'
import React, { Component } from 'react';
import { createNavigator, StackRouter, addNavigationHelpers,NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
function getPathFromHash(){
    if(!location||!location.hash||location.hash=='#'){
        return '/'
    }
    var path = location.hash.slice(1);
    return path;
}
function routerActionForPathAndParams(router,path,params){
    var action = router.getActionForPathAndParams(path,params);
    if(action==null){
        return NavigationActions.navigate({routeName:'404',params:{path}})
    }
    return action;
}
class NavigatorFrame extends Component {
    constructor(...props) {
        super(...props);
        const { router } = this.props;

        this.dispatch = this.dispatch.bind(this);
        var initAction = routerActionForPathAndParams(router,getPathFromHash());
        this.state = router.getStateForAction(initAction);
    }
    getNavigation() {
        const { router } = this.props;
        const state = this.state;
        const navigation = addNavigationHelpers({
            state: this.state,
            dispatch: this.dispatch,
        })
        const screenNavigation = addNavigationHelpers({
            ...navigation,
            state: state.routes[state.index],
        });
        const options = router.getScreenOptions(screenNavigation, {});
        this.pushState(router,state,options);
        return navigation;
    }
 
    pushState(router, state,options) {
     //    const { path, params } = router.getPathAndParamsForState(state);
     //    const maybeHash = params && params.hash ? `#${params.hash}` : '';
     //    const uri = `/${path}${maybeHash}`;
     //    if (window.location.pathname !== uri) {
     //        window.history.pushState({}, state.title, uri);
     //    }
        if(options.title){
            document.title = options.title;
        }
    }
 
    dispatch(action) {
        const { router } = this.props;
        const state = router.getStateForAction(action, this.state);
        const isChange = state && state !== this.state;
        isChange ? this.setState(state) : undefined;
        return (isChange || !state);
    }
    render() {
        const { router } = this.props;
        const Screen = router.getComponentForState(this.state);
        const navigation = this.getNavigation();
        return (<Screen navigation={navigation} />)
    }
}

export default NavigatorFrame;