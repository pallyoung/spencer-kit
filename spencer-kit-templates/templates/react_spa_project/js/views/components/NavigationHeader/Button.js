'use strict'
import React,{Component} from 'react';

const styles = {
    button:{
        position:'absolute',
        width:'4rem',
        textAlign:'left',
        height:'44px',
        lineHeight:'44px',
        overflow:'hidden',
        top:0,
    }
}
class Button extends Component{
    constructor(...props){
        super(...props);
    }
    render(){
        var child = this.props.child;        
        var style = {
            ...styles.button,
            ...this.props.style,
            ...child.props&&child.props.style||{}
        }
        return React.cloneElement(child,{style})
    }
}

export default Button;