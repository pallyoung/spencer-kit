'use strict'
import React, { Component } from 'react';

class Main extends Component {
    static pageConfig = {
        path:'/'
    }
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title:'Main'
        }
    }
    render() {
        return <div className='content'>
            <p>welcome to use <a href='https://github.com/pallyoung/spencer-kit'>spencer-kit-cli</a></p>
            <p>get start to edit index.js</p>
            <p>project name {BuildConfig.project}</p>
            <p>current env {BuildConfig.env}</p>
        </div>
    }
}

export default Main;