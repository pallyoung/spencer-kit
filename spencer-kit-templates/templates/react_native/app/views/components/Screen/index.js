'use strict'
import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import NavigationHeader from './../NavigationHeader';

import Toast from './../Toast';
import Alert from './../Alert';
import Popup from './../Popup';


const MODAL_PREFIX = 'MODAL_PREFIX_';
const HEADER_REF = 'HEADER_REF';
const POPUP_REF = 'POPUP_REF';
const ALERT_REF = 'ALERT_REF';
const TOAST_REF = 'TOAST_REF';

var ID = 1;

const SCREEN_INSTS = [];
function Screen(component) {
    class $Screen extends component {
        static childContextTypes = {
            screen: PropTypes.any,
            parent: PropTypes.any
        }
        static contextTypes = {
            screen: PropTypes.any,
            parent: PropTypes.any
        }
        constructor(...props) {
            super(...props);
            this._readyList = [];
            this._isReady = false;
            this.navigationOptions = this.navigationOptions || { header: null };
            this._key;
        }

        getScreen() {
            return this;
        }
        getParent() {
            return null;
        }
        getChildContext() {
            return {
                parent: this,
                screen: this
            }
        }
        getNavigation() {
            return this.props.navigation;
        }
        componentDidMount() {
            this._isReady = true;
            this._fireReadyList();
            let { navigation } = this.props;
            let state = navigation ? navigation.state : {};
            let key = state.key;

            if (key) {
                this._key = key;
                SCREEN_INSTS[key] = this;
            }
            if (super.componentDidMount) {
                super.componentDidMount();
            }
        }
        componentWillUnmount() {
            if (this._key) {
                delete SCREEN_INSTS[this._key];
            }
            if (super.componentWillUnmount) {
                super.componentWillUnmount();
            }
        }

        _ready(callback) {
            if (this._isReady) {
                callback();
            } else {
                this._readyList.push(callback);
            }
        }
        _fireReadyList() {
            var callback = this._readyList.shift();
            while (callback) {
                callback();
                callback = this._readyList.shift();
            }
        }
        alert(config) {
            this._ready(() => this.refs[ALERT_REF].show(config));
        }
        toast(message, callback, timeout) {
            this._ready(() => this.refs[TOAST_REF].show(message, callback, timeout));
        }
        showPopup(config) {
            var id = MODAL_PREFIX + (++ID);
            config.id = id;
            this._ready(() => {
                this.refs[POPUP_REF].showContent(config);
            })
            return id;
        }
        hidePopup(id) {
            this._ready(() => {
                this.refs[POPUP_REF].hideContent(id);
            })
        }
        updateHeader(props) {
            this.refs[HEADER_REF] && this.refs[HEADER_REF].updateInfo(props);
        }
        render() {
            let { navigation } = this.props;
            let state = navigation ? navigation.state : {};
            let params = state.params ? state.params : {};
            let key = params.key;

            let headerProps = {
                ...this.navigationOptions || { header: null },
                ...params
            }
            return <View
                collapsable={true}
                style={[{ flex: 1, flexDirection: 'column' }]}>
                <NavigationHeader
                    ref={HEADER_REF}
                    navigation={navigation}
                    {...headerProps} />
                <View
                    collapsable={true}
                    style={{ flex: 1, flexDirection: 'column' }}
                    children={super.render()} />
                <Popup ref={POPUP_REF} />
                <Alert ref={ALERT_REF} />
                <Toast ref={TOAST_REF} />
            </View>
        }
    }
    $Screen.navigationOptions = {
        header: function (props) {
            return null;
        }
    }
    return $Screen;
}

function getScreen(key) {
    return SCREEN_INSTS[key];
}
Screen.getScreen = getScreen;
export default Screen;


