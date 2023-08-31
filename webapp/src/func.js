import React from 'react';
import Bridge from './bridge/core.js';
import './App.css';

class Func extends React.Component {

    constructor(props) {
        super(props);
        this.state = { countText: '' };
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <text>{this.state.countText}</text>
                    <br></br>
                    <button onClick={() => this.excute()}>获取本地计数</button>
                    <br></br>
                    <button onClick={() => this.excutePwd()}>获取交易密码</button>
                    <br></br>
                    <button onClick={() => this.excuteToast()}>弹出提示</button>
                    <br></br>
                    <button onClick={() => this.props.history.goBack()}>返回</button>
                </header>
            </div>
        )
    }

    showCount = (result) => {
        this.setState({
            countText: result.data
        })
    }

    excute = () => {
        var msg = {
            name: 'func',
            params: { name: 'getCount' }
        }
        console.log('哈哈')
        Bridge.open(msg, this.showCount)
        // 或者 
        // Bridge.open(msg, (result)=>{
        //     this.setState({
        //         countText: result.data
        //     })
        // })
    }

    excuteToast = (data) => {
        var msg = {
            type: 'func',
            params: {
                name: 'showToast',
                value: data ? data : '这是提示'
            }
        }
        Bridge.open(msg, '')
    }

    excutePwd = () => {
        var msg = {
            type: 'func',
            params: {
                name: 'getTradePwd'
            }
        }
        console.log('被调用')
        Bridge.open(msg, (result) => {
            this.excuteToast(result.msg)
        })
    }

}

export default Func;