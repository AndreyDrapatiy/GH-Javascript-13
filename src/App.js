import React, { Component } from 'react'
import Form from './components/form/formContainer'
import View from './components/view/viewContainer'
import './App.css'


class App extends Component {
  render() {
    return (
        <div className='App'>
            <Form />
            <View />
        </div>
    );
  }
}

export default App;
