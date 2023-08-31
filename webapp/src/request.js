import React from 'react';
import Bridge from './bridge/core.js';
import './App.css';

class Request extends React.Component {

    constructor(props) {
        super(props);
        this.state = { result: '' };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <text>{this.state.result}</text>
                    <button onClick={() => this.excuteGet()}>GET</button>
                    <br></br>
                    <button onClick={() => this.excutePost()}>POST</button>
                    <br></br>
                    <button onClick={() => this.props.history.goBack()}>返回</button>
                </header>
            </div>
        )
    }

    excuteGet = () => {
        var msg = {
            type: 'proxy',
            params: {
                method: 'get',
                url: ''
            }
        }
        Bridge.open(msg, this.showResult)
    }

    excutePost = () => {
        var msg = {
            type: 'proxy',
            params: {
                method: 'post',
                url: '',
                size: 15,
                page: 1,
                currency: "USDT",
                startAt: new Date().getMilliseconds(),
                endAt: new Date().getMilliseconds(),
            }
        }
        Bridge.open(msg, this.showResult)
    }

    showResult = (result) => {
        this.setState({
            result: result.data
        })
    }

}

export default Request;