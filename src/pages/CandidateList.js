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

import React from 'react'
import Errors from './Error'
import Complete from './Complete'
import { Link } from 'react-router-dom'

class Candilist extends React.Component {
  state = {}
  constructor(props) {
    console.log(props);
    super(props)

    this.state = {
      message: 'processing',
      address: "",
      account: "",
      balance: 1,
      candidates: [
        cat,dog,lion,parrot,wolf,owl,panda,lemur,koala,fox
      ],
      selectedCandidate: '',
    }
    this.helperFunction = this.helperFunction.bind(this)
    console.log(this.state.account)
    console.log(this.state.address)
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
    await this.setState({ selectedCandidate: candidate })
    console.log(this.state.selectedCandidate)
  }
  async handleConfirm() {
    this.setState({ message: 'processing' })

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    this.setState({ balance : 0});  

    await sleep(1000);
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
              if (this.state.selectedCandidate == candidate) {
                return (
                  <div
                    key={candidate}
                    onClick={() => this.selectCandidate(candidate)}
                    className="  relative border border-gray-200 rounded-xl w-24 h-auto"
                  >
                    <img className="p-2 object-contain w-max" src={candidate}></img>
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
                    key={candidate}
                    onClick={() => this.selectCandidate(candidate)}
                    className=" border border-gray-200 rounded-xl w-24 h-auto"
                  >
                    <img className="p-2 object-contain w-max " src={candidate}></img>
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
