import { Route, Routes } from 'react-router-dom'
import React from 'react'
import Intro from './pages/IntroPage'
import Candilist from './pages/CandidateList'
import Complete from './pages/Complete'
import errors from './pages/Error'
import Web3 from 'web3'
import VoteToken from './abis/VoteToken.json'
import  io  from 'socket.io-client'
class App extends React.Component {
  state = {}

  constructor(props) {
    super(props)
    this.state = {
      data: 'hello',
    }
  }

  async componentDidMount() {
    try {
      this.socket = await io('http://localhost:3001')
      this.socket.open();
      await this.socket.on('serialdata', (data) => {
        this.setState({
          data: data,
        })
      })
    } catch (error) {}
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
    await window.ethereum.enable();
    // console.log("web3 " , web3)
    const accounts = await web3.eth.getAccounts()
    const deployer = accounts[0];

    const abi = VoteToken.abi ; 
    const address = VoteToken.networks['5777'].address ; 
    // console.log("abis : " , abi);
    console.log("token address : " , address);
    const voteToken =  new web3.eth.Contract(abi , address)
    // console.log(voteToken);
    const name = await  voteToken.methods.TokenName().call()
    console.log("name : " , name);



    let result = await voteToken.getPastEvents('CandidateList' , {    fromBlock: 0,
      toBlock: 'latest',} );
      console.log(" ");
      result.map(items => {
        console.log("candidate : " , items.returnValues.candidate)
        console.log("image : " , items.returnValues.image)
        console.log("resident : " , items.returnValues.residence)
        console.log(" "); 
      })
        let voter = "";
      result = await voteToken.getPastEvents('VoterAdded' , {    fromBlock: 0,
      toBlock: 'latest',} );
      console.log(" ");
      result.map(items => {
        console.log("voter : " , items.returnValues.voter)
        console.log(" "); 
        voter = items.returnValues.voter
      })
      


  }
  render() {
    return (
      <div className="overflow-hidden">
        <Routes>
          <Route
            path="/candilist"
            element={<Candilist data={this.state.data} />}
          />
          <Route path="/errors" element={errors} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/" exact element={<Intro data={this.state.data} />} />
        </Routes>
      </div>
    )
  }
}

export default App
