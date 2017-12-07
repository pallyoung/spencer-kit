'use strict'
import React,{Component} from 'react';
import BackButton from './BackButton';
import Button from './Button';
import Title from './Title';
const styles = {
    leftButton:{
        left:'1rem'
    },
    rightButton:{
        right:'1rem',
        textAlign:'right'
    },
    title:{

    }
}
class NavigationHeader extends Component{
    constructor(...props){
        super(...props);
        var {
            header,
            leftButton,
            rightButton,
            onBack,
            title,
        } = this.props;
        this.state = {
            header,
            leftButton,
            rightButton,
            onBack,
            title
        }
    }
    update(state){
        this.setState(state);
    }
    _renderTitle(){
        const {title} = this.state;
        if(!title){
            return null
        }
        return <Title  title = {title}/>
    }
    _renderLeftButton(){
        const {leftButton,onBack} = this.state;
        const {navigation} = this.props;
        if(typeof leftButton == 'function'){
            return <Button style = {styles.leftButton} child = {leftButton(navigation)}/>
        }else{
            return <BackButton navigation = {navigation} style = {styles.leftButton} onBack = {onBack}/>
        }
    }
    _renderRightButton(){
        const {rightButton} = this.state;
        const {navigation} = this.props
        if(typeof rightButton == 'function'){
            return <Button  style = {styles.rightButton} child = {rightButton(navigation)}/>
        }else{
            return null;
        }
    }
    render(){
        document.title = this.state.title;
        if(this.state.header===null){
            return null;
        }else if(typeof this.state.header == 'function'){
            return this.state.header();
        }
        return <div style = {this.props.style}>
                {this._renderTitle()}
                {this._renderLeftButton()}
                {this._renderRightButton()}
            </div> 
    }
}
export default NavigationHeader;