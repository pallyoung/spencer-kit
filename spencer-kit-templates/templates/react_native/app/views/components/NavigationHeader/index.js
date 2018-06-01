import React, { Component } from 'react';
import { Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { autoSize } from 'react-native-improver';
import { View, Text, TouchableOpacity, Image } from 'react-native';
const IOS = Platform.OS === 'ios';
class Button extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        var type = this.props.type;
        var styles = {
            left: {
                left: 20,
                justifyContent: 'flex-start',
            },
            right: {
                right: 20,
                justifyContent: 'flex-end',
            },
            back: {
                left: 0,
                justifyContent: 'flex-start',
                width: 120
            }
        }
        return <View
            style={{
                width: 100,
                flexDirection: 'row',
                position: 'absolute',
                top: IOS ? 20 : 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                ...styles[type]
            }}>
            {this.props.children}
        </View>
    }
}
class Title extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        return <View
            style={{
                position: 'absolute',
                top: IOS ? 20 : 0,
                bottom: 0,
                left: 60,
                right: 60,
                overflow: 'hidden',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            {this.props.children}
        </View>
    }
}
export default class Header extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            title: this.props.title,
            canGoBack: false,
            show: this.props.header === null ? false : true,
            leftButton: this.props.leftButton,
            rightButton: this.props.rightButton,
            props: this.props
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let props = prevState.props;
        let nextState = {}
        if (nextProps.title !== props.title) {
            nextState.title = nextProps.title;
        }
        if (nextProps.leftButton !== props.leftButton) {
            nextState.leftButton = nextProps.leftButton;
        }
        if (nextProps.rightButton !== props.rightButton) {
            nextState.rightButton = nextProps.rightButton;
        }
        nextState.props = nextProps;
        return nextState;
    }

    updateInfo(info) {
        this.setState(info);
    }
    _renderLeftButton() {
        var leftButton;
        var navigation = this.props.navigation;
        if (typeof this.state.leftButton === 'object') {
            return <Button
                type='left'
                children={this.state.leftButton} />;
        } else if ((navigation.state.index !== 0 || APPContext.isLoginPopupShow)) {
            return <Button
                type='back'
                children={this._backButton(navigation)} />;
        }
        return null;
    }
    _backButton(navigation) {
        return <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', paddingLeft: 20, }}
            onPress={navigation.state.index !== 0 ? () => navigation.goBack() : () => APPContext.hideLoginPopup()}
            children={
                <Image source={require('./Arrow.png')} />
            }
        />
    }
    _renderRightButton() {
        if (typeof this.state.rightButton === 'object') {
            return <Button
                type='right'
                children={this.state.rightButton} />;
        } else {
            return null;
        }
    }
    _renderTitle() {
        var child;
        if (typeof this.state.title === 'function') {
            child = this.state.title;
        } else {
            child = <Text style={[{ fontSize: 18 }, this.props.titleStyle]}>{this.state.title}</Text>
        }
        return <Title>{child}</Title>
    }
    render() {
        if (!this.state.show) {
            return null;
        }
        return <View
            style={[
                { backgroundColor: '#fff' },
                this.props.style,
                {
                    height: IOS ? 64 : 44,
                    flexDirection: 'row',
                    paddingTop: IOS ? 20 : 0,
                }
            ]}>
            {this._renderTitle()}
            {this._renderRightButton()}
            {this._renderLeftButton()}
        </View>
    }
}
