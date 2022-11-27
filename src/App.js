import { Route, Routes } from 'react-router-dom'
import React from 'react'
import Intro from './pages/IntroPage'
import Candilist from './pages/CandidateList'
import Complete from './pages/Complete'
import errors from './pages/Error'
import io from 'socket.io-client';

class App extends React.Component {

  state = {}

  constructor(props){
    
    super(props);
    this.state = {
      data : "hello",
    }
  }

  async componentDidMount() {
    this.socket =await  io('http://localhost:3001');
    //this.socket.open();
    await this.socket.on('serialdata', (data) => {
      // we get settings data and can do something with it
      console.log("data from react " , data)
      this.setState({
        data: data,
      })
    });
  }
  render() {
    return (
      <div className="overflow-hidden">
        <Routes>
          <Route path="/candilist" element={<Candilist data = {this.state.data} />} />
          <Route path="/errors" element={errors} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/" exact element={<Intro data = {this.state.data}   />} />
        </Routes>
      </div>
    )
  }
}

export default App
