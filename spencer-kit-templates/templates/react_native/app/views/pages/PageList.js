'use strict'
import React,{Component} from 'react';
import {
    View,
    ListView,
    SectionList,
    FlatList,
    TouchableOpacity,
    Text
}from 'react-native';
import NavigationManager from './../../util/NavigationManager';


import {Theme} from 'react-native-improver';
var currentTheme = Theme.getTheme();
class PageList extends Component{
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:'PageList'
        }
    }
    renderItem(item){
        if(item.item ==='PageList'){
            return null
        }
        return <TouchableOpacity
                    style = {{
                        height:60,
                        paddingLeft:20,
                        backgroundColor:'#fff',
                        borderBottomWidth:currentTheme.borderWidth,
                        borderBottomColor:'#fefefe',
                        justifyContent:'center'
                    }}
                    key = {item.item}
                    onPress = {()=>{
                        NavigationManager.navigate(item.item);
                    }}><Text>{item.item}</Text></TouchableOpacity>
    }
    render(){
        var data = APPContext.Routes;
       return  <FlatList
                    style = {{flex:1,marginTop:2}}
                    keyExtractor = {(item)=>item}
                    data = {Object.keys(data)}
                    renderItem = {(item)=>this.renderItem(item)}
                    />
    }
}
export default PageList;