import React from 'react';
import Bridge from './bridge/core.js';
import './App.css';

class Event extends React.Component {

    constructor(props) {
        super(props);
        this.state = { btnText: '' };
    }

    componentDidMount() {
        window.onListenEvent('onLeftClick', (data) => {
            console.log('event 点击返回')
            return true
        })
        window.onListenEvent('onRightClick', (data) => {
            console.log('event 点击更多')
            return false
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <button onClick={() => this.excute()}>更新标题</button>
                    <br></br>
                    <button onClick={() => this.hide()}>隐藏标题栏</button>
                    <br></br>
                    <button onClick={() => this.hideLeft()}>隐藏左边</button>
                    <br></br>
                    <button onClick={() => this.showRight()}>显示右边</button>
                    <br></br>
                    <button onClick={() => this.updateIcon()}>更新图标</button>
                    <br></br>
                    <button onClick={() => this.props.history.goBack()}>返回</button>
                </header>
            </div>
        )
    }

    excute = () => {
        var msg = {
            type: 'event',
            params: {
                name: 'updateHeader',
                //是否隐藏标题栏（默认true）
                visible: true,
                //标题栏背景色
                background: '#2a162239',
                //标题
                title: '更新',
            }
        }
        Bridge.open(msg, '')
    }

    hide = () => {
        var msg = {
            type: 'event',
            params: {
                name: 'updateHeader',
                //是否隐藏标题栏（默认true）
                visible: false,
            }
        }
        Bridge.open(msg, '')
    }


    hideLeft = () => {
        var msg = {
            type: 'event',
            params: {
                name: 'updateHeader',
                title: '隐藏左边',
                leftVisible: false,
            }
        }
        Bridge.open(msg, '')
    }

    showRight = () => {
        var msg = {
            type: 'event',
            params: {
                name: 'updateHeader',
                title: '显示右边',
                rightVisible: true,
            }
        }
        Bridge.open(msg, '')
    }


    updateIcon = () => {
        var base64 = 'data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAACR0lEQVRYhe3XT2jTUADH8V+app1pq7eJoDdFsXpNlYEXD5uH0e4qevHkn8M81A6pYMWFtbVDPUz04F0Q1HbKpCiICDPbQaYdeCiM4XD+uaxLk7QxaTxty7q0qbSJOeQLPfT1lfeBJO8RwM3GhiZmU3av6el0YjTHsRqBm1ZijOoIOJzl2CBNjVqNMcoUOJzl2FDAezURCwfsADXXFriBGxs5Ru+mKbtM22oJdAIOaAF0Cg4wADoJBwBe/ZdojmNDtG80MXKUDu0yxg2mZ7VeLEx6CNnn9fxsQHtVk5SpYnKgZDSPMMAFWuF6WV1p4NeahNJyRS0ufK9D055QfPDS01RY3gG0G9dcTVbx+G1ZLK+uf6HWg6f0yI5PEivr85G4PHSYPrgvdFwOCVP63zwAkI9HkpWqfD/zfFHgpT//BUkQwIXTh2gQODuYngtvjusnmV3qiw+5noFoPykOHOknY8wBP0luMV7Or6hvFn48yseZK4Z/jOY49tyDT9XPq3Vtaa2x7dOrJxgAzmQ+7o9Nzr2bnFmq6dd4X+a12N355Y15O+5Buy73zNiJFVHC+Q9ff6v68f49fZCVxt6WQACYTkSSvKik089KYkWwDlm8wXwT6yqtH/NTJFS14W8LBIBCnBmvSupE9oW1SLPabjNOQJrug4U4M84Lyr07+UXBDlBzHW3U04lIkheUjNUYozo+SQrXmNuEhltWYoz6p6Pu9fWTKYscLXPEWdwuF9htLrDbXGC3ucBuc4Hd5nig13yK9fXybdGtub8fW/6dxmGy/gAAAABJRU5ErkJggg=='
        var rightBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAABr0lEQVRYhWNgGAWjYBSMglEwCkYBtYFb+/GJDQ3/mYhRS5QiagNGRoa8C3ynV4c2XGUjpHZAHMjAwMCgJM7r8Yv3636/ziO8+NQNmAOzvdS4jFWEjBlZ2U47t54Qx6VuwBzIxMjIEGuvxO5uIKnEzcF4wavtpBo2dYwMDAwM7h3H/yML7qywpIo4PjAjwxzOPnbj9b8VRx98/Pnrv+uuSouzyOpY0DVkzDiJ1SBSxUkBVhqiTDycrAJz9tw+5NZxPGRXheV2mNyARTE60JMXYCz00eTiYmNZ7dl5PBomPmgcyMDAwKAozsNQFqjFzc3BOsun61QNA8MgcyA2wEJYCf3A/ZdfGCZtvfn15+8/6dvLLZcyMAwiB156+OH/nD23v//8/S8UOZPAHYieG6ktjg5wFzOWZ/Foow9w7zj+//6Hf//vf/j3f9q+x7/8ek8+x1VQD1gU//v/n2Hpofs/z9599+Drj//2e6stXmJTN2AOnLrt1re7Lz5f+P/nl8feapvPuNQNWDFz7+XnHWyfuR03leN23IAB987jPQz//zMOtDtGwSgYBaNgFIyCQQAATQOwC/FcvFYAAAAASUVORK5CYII='
        var msg = {
            type: 'event',
            params: {
                name: 'updateHeader',
                title: '新图标',
                leftIcon: base64,
                rightIcon: rightBase64,
                rightVisible: true
            }
        }
        Bridge.open(msg, '')
    }

}

export default Event;