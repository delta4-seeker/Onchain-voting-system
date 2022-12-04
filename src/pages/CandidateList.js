import swastik from '../images/swastik.png'
import cat from '../images/cat.jpg'
import fox from '../images/fox.jpg'
import koala from '../images/koala.jpg'
import lemur from '../images/lemur.jpg'
import panda from '../images/panda.jpg'
import owl from '../images/owl.jpg'
import wolf from '../images/wolf.jpg'
import parrot from '../images/parrot.jpg'
import lion from '../images/lion.jpg'
import dog from '../images/dog.jpg'
import Web3 from 'web3'
import VoteToken from '../abis/VoteToken.json'
import React from 'react'
import Errors from './Error'
import Complete from './Complete'
import { Link } from 'react-router-dom'
let candidateList = []; 

class Candilist extends React.Component {
  state = {}
  
  constructor(props) {
    console.log(props);
    super(props)

    this.state = {
      message: 'processing',
      address: "",
      account: "",
      balance: 0,
      candidates: [
        cat,dog,lion,parrot,wolf,owl,panda,lemur,koala,fox
      ],
      selectedCandidate: '',
    }
    this.helperFunction = this.helperFunction.bind(this)
    console.log(this.state.account)
    console.log(this.state.address)
    this.loadBlockchainData();
  }


  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const deployer = accounts[0];
    const abi = VoteToken.abi ; 
    const address = VoteToken.networks['5777'].address ; 
    console.log("token address : " , address);
    const voteToken =  new web3.eth.Contract(abi , address)
    candidateList = [];
    let result = await voteToken.getPastEvents('CandidateList' , {    fromBlock: 0,
      toBlock: 'latest',} );
      console.log(" ");

      result.map(items => {
         candidateList.push( {
          "candidate" : items.returnValues.candidate, 
          "image" :  items.returnValues.image,
          "resident" : items.returnValues.residence
         });
      
      })
    console.log("result : " , candidateList );
    this.setState({ candidates : candidateList})
    let Fetchedbalance = await voteToken.methods.balanceOf(this.state.account).call() ; 
    this.setState({ balance : Fetchedbalance})
    console.log("balance : " , Fetchedbalance);   
  }

  helperFunction = async  () => {
    const data = await JSON.parse(await this.props.data.data)
    this.setState({
      address : data.address , 
      account : data.account
    });
  }

  async componentDidMount() {
    await this.helperFunction();
    //check balance of account
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    await sleep(1000);
    if (this.state.balance >= 1) {
      this.setState({ message: 'list' })
    } else {
      this.setState({ message: 'lowBalance' })
    }
  }

  async selectCandidate(candidate) {

     this.setState({ selectedCandidate: candidate })
    console.log(this.state.selectedCandidate)
  }
  async handleConfirm() {
    this.setState({ message: 'processing' })

      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      const deployer = accounts[0];
      const abi = VoteToken.abi ; 
      const address = VoteToken.networks['5777'].address ; 
      console.log("token address : " , address);
      const voteToken =  new web3.eth.Contract(abi , address)
      console.log("candidate account is ",this.state.selectedCandidate.candidate);
      console.log("voter account is     ",this.state.account);
      let result = await voteToken.methods.Vote( this.state.selectedCandidate.candidate , this.state.account).send({
        from : deployer , 
        gas : 999999 
      }) ; 
      console.log("result is : " , result)

    
    this.setState({ message: 'complete' })


    
  }


  render() {
    if (this.state.message === 'processing') {
      return (
        <div className="flex h-screen">
          <div className="flex m-auto ">
            <div className="spinner-border animate-bounce inline-block w-screen/2 h-8  rounded-full">
              <h1 className=" text-4xl font-bold  ">Processing....</h1>
            </div>
          </div>
        </div>
      )
    }

    if (this.state.message === 'list')
      return (
        <div className="m-10">
          <ul className="flex justify-between">
            <li className="mr-3">
              <Link
                className="text-center block text-3xl rounded py-3 px-7   text-black-300 font-bold"
                to=""
              >
                Select Candidate
              </Link>
            </li>
            {this.state.selectedCandidate === '' ? (
              <li className="mr-3">
                <Link
                  style={{ pointerEvents: 'none' }}
                  className="  inline-block bg-gray-300 text-xl font-bold rounded py-3 px-7  text-white"
                  to="/complete"
                >
                  Confirm
                </Link>
              </li>
            ) : (
              <li className="mr-3">
                <button
                  onClick={() => this.handleConfirm()}
                  className="  inline-block bg-green-600 text-xl font-bold rounded py-3 px-7  text-white"
                >
                  Confirm
                </button>
              </li>
            )}
          </ul>

          <div className="grid  grid-cols-5 m-10 gap-11">
            {this.state.candidates.map((candidate) => {
              if (this.state.selectedCandidate === candidate) {
                return (
                  <div
                    key={candidate.candidate}
                    onClick={() => this.selectCandidate(candidate)}
                    className="  relative border border-gray-200 rounded-xl w-24 h-auto"
                  >
                    <img className="p-2 object-contain w-max" src={ candidate.image}></img>
                    <img
                      className="absolute  rounded-xl bottom-1 right-0 h-auto  w-8/12 z-30 "
                      width={80}
                      src={swastik}
                    ></img>
                  </div>
                )
              } else {
                return (
                  <div
                    key={candidate.candidate}
                    onClick={() => this.selectCandidate(candidate)}
                    className=" border border-gray-200 rounded-xl w-24 h-auto"
                  >
                    <img className="p-2 object-contain w-max " src={candidate.image}></img>
                  </div>
                )
              }
            })}
          </div>
        </div>
      )
    if (this.state.message === 'lowBalance') {
      return <Errors message="Insufficient balance." />
    }
    if (this.state.message === 'complete') {
      return <Complete />
    }
  }
}
export default Candilist
