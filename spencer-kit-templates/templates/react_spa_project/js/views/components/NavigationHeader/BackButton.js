'use strict'
import React,{Component} from 'react';
import Button from './Button';
class BackButton extends Component{
    constructor(...props){
        super(...props);
    }
    _render(){
        return <p onClick = {this._goBack}>back</p>
    }
    _goBack = ()=>{
        var navigation = this.props.navigation;
        
        if(!this.props.goBack||!this.props.goBack(navigation)){
            navigation.goBack();
        }   
    }
    render(){
        var {state} = this.props.navigation;
        if(state.index==0){
            return null;
        }
        return <Button style = {this.props.style} child = {this._render()}/>
    }
}

export default BackButton;