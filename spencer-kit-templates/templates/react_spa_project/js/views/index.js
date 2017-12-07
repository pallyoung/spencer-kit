'use strict'
import React,{Component}from 'react';
import BuildConfig from 'build-config';
import AppRegister from 'app-register';
import {createNavigator,StackRouter,addNavigationHelpers,NavigationActions} from 'react-navigation';
import {StoreManager} from 'mlux';
import StackNavigator from './components/StackNavigator';
import IndexStore from './../stores';
import PropTypes from 'prop-types';
import Routes from './routes/Routes';

const STORE_PREFIX = 'MLUX_STORAGE_'

StoreManager.setStorageTool({
    setter(key, value) {
        return Promise.resolve(localStorage.setItem(STORE_PREFIX + key, value));
    },
    getter(key) {
        return Promise.resolve(localStorage.getItem(STORE_PREFIX + key));
    }
})
function createNavigation(initialRouteName, initialRouteParams) {
    return StackNavigator(Routes, {
        initialRouteName,
        initialRouteParams,
    });
}

class Entry extends Component{
    constructor(...props){
        super(...props)
        window.APPContext = this;
        this.state = {
            inited: false,
            navigation: null,
            navigationKey: 0
        }
    }
    componentWillMount() {
        
    }
    componentDidMount() {
        APPContext.Routes = Routes;

        StoreManager.load(IndexStore).then(() => {                
            this.state.navigation = createNavigation();
            this.setState({ inited: true });
        })

    }    
    resetNavigator(initialRouteName, initialRouteParams) {
        initialRouteName = initialRouteName || BuildConfig.ENV === 'DEBUG' ? 'PageList' : 'Main';
        this.setState({
            inited: true, 
            navigationKey: this.state.navigationKey + 1,
            navigation:createNavigation(initialRouteName, initialRouteParams)
        });
    }
    render(){
        var Navigation = this.state.navigation;
        if(!this.state.inited){
            return null;
        }
        return <Navigation />
    }
}
AppRegister.register(<Entry />);