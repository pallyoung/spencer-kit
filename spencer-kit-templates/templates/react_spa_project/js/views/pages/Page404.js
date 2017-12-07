'use strict'
import React,{Component} from 'react';
import ScreenComponent from './../components/ScreenComponent';

class Page404 extends ScreenComponent{
    static pageConfig = {
        path:'/404'
    }
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:'Page Not Found'
        }
    }
    render(){
        var {params} = this.getScreen().getNavigation();
        return <p>{`page ${params&&params.path} not found`}</p>
    }
}
export default Page404;