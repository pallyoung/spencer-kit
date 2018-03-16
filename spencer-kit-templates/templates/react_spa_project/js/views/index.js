'use strict'
import React,{Component}from 'react';
import BuildConfig from 'build-config';
import AppRegister from 'app-register';
import {createNavigator,StackRouter,addNavigationHelpers,NavigationActions} from 'react-navigation';
import StackNavigator from './components/StackNavigator';
import PropTypes from 'prop-types';
import Routes from './routes/Routes';


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
        this.state.navigation = createNavigation();
        this.setState({ inited: true });

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