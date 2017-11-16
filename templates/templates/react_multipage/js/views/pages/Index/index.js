'use strict'
import React,{Component}from 'react';
import BuildConfig from 'build-config';
class Index extends Component{
    constructor(...props){
        super(...props)
    }
    render(){
        return <div className = 'content'>
                    <p>welcome to use <a href='https://github.com/pallyoung/spencer-kit'>spencer-kit-cli</a></p>
                    <p>get start</p>
                    <p>project name {BuildConfig.projectcd}</p>
                    <p>build env {BuildConfig.env}</p>
                </div>
    }
}
AppRegister.register(<Index />);