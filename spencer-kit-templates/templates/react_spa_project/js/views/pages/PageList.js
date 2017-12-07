'use strict'
import React,{Component} from 'react';
import ScreenComponent from './../components/ScreenComponent';

class PageList extends ScreenComponent{
    static pageConfig = {
        path:'/pagelist'
    }
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:'Page List'
        }
    }
    _renderList(){
        var items = [];
        for(var o in APPContext.Routes){
            let config = APPContext.Routes[o];
            items.push(
                <p 
                    style = {{textAlign:'left',paddingLeft:'2rem'}} 
                    key ={o}
                    onClick = {((o)=>()=>this._navigate(o))(o)}>{o}</p>
            )
        }
        return items;
    }
    _navigate(o){
        this.getScreen().getNavigation().navigate(o);
    }
    render(){

        return <div className = 'content'>
            {this._renderList()}
        </div>
    }
}
export default PageList;