import React from 'react';
import './App.css';

class App extends React.Component {

  componentDidMount() {
    window.onListenEvent('onLeftClick', (data) => {
      console.log('app 点击返回')
      return false
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => this.props.history.push('jump')}>跳转类（Jump）</button>
          <br></br>
          <button onClick={() => this.props.history.push('func')}>功能类（Func）</button>
          <br></br>
          <button onClick={() => this.props.history.push('event')}>事件类（Event）</button>
          <br></br>
          <button onClick={() => this.props.history.push('offline')}>离线资源</button>
          <br></br>
          <button onClick={() => this.props.history.push('request')}>请求类（Get/Post）</button>
        </header>
      </div>
    )
  }

}

export default App;