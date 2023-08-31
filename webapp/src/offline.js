import React from 'react';
import './App.css';

class Offline extends React.Component {

    componentDidMount() {
        
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={require('./h5/example.jpg')} alt=''></img>
                </header>
            </div>
        )
    }

}

export default Offline;