import React from 'react';
import Bridge from './bridge/core.js';
import './App.css';

class Jump extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => this.excute()}>打开本地页面</button>
          <br></br>
          <button onClick={() => this.props.history.goBack()}>返回</button>
          <a href="xxxx:///xxxx?a=xxx">原生跳转</a>
        </header>
      </div>
    )
  }

  excute = () => {
    var msg = {
      type: 'jump',
      params: {
        url: '/settings',
        coin: 'USDT',
        from: 'MAIN',
        to: 'MARGIN'
      }
    }
    Bridge.open(msg, (result) => {
      console.log(result.msg)
      console.log(result.code)
    })
  }

}

export default Jump;