'use strict'
import React,{Component} from 'react';
const styles = {
    title:{
        height:'44px',
        width:'100%',
        textAlign:'center',
        lineHeight:'44px'
    }
}
class Title extends Component{
    constructor(...props){
        super(...props);
    }
    render(){
        return <p style = {styles.title}>{this.props.title}</p>
    }
}
export default Title;