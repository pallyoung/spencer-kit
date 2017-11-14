'use strict'
import React,{Component}from 'react';

class Index extends Component{
    constructor(...props){
        super(...props)
    }
    render(){
        return <div className = 'content'>hello world</div>
    }
}
AppRegister.register(<Index />);