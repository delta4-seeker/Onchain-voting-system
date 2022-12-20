import { result } from 'lodash'
import React, { useState } from 'react'
import Web3 from 'web3'
import VoteToken from '../abis/VoteToken.json'

const Candidate = () => {
  const [InputAddress, setInputAddress] = useState('')
  const [voteCount, setVoteCount] = useState('')
  const [resultMessage, setresultMessage] = useState('')

  const handleCheckSubmit = async () => {
    let web3 = await new Web3(Web3.givenProvider || 'http://localhost:7545')
    window.ethereum.enable()
    console.log('web3 ')
    const accounts = await web3.eth.getAccounts()
    const deployer = accounts[0]
    const abi = VoteToken.abi
    const address = VoteToken.networks['5777'].address
    // console.log("abis : " , abi);
    const voteToken = new web3.eth.Contract(abi, address)
    // console.log(voteToken);[

    const voteCount = await voteToken.methods
      .VoteCount(InputAddress)
      .call({ from: deployer, gas: 999999 })
    setVoteCount(voteCount)
  }

  const handleAddCandidateSubmit = async () => {
    console.log(InputAddress)

    let web3 = await new Web3(Web3.givenProvider || 'http://localhost:7545')
    window.ethereum.enable()
    console.log('web3 ')
    const accounts = await web3.eth.getAccounts()
    const deployer = accounts[0]
    const abi = VoteToken.abi
    const address = VoteToken.networks['5777'].address
    // console.log("abis : " , abi);
    const voteToken = new web3.eth.Contract(abi, address)
    // console.log(voteToken);[
    try {
      await voteToken.methods
        .addCandidate(InputAddress , "residence" , "image")
        .send({ from: deployer, gas: 999999 })
      setresultMessage('Candidate added')
    } catch (error) {
      setresultMessage('Error occured')
      console.log(error)
    }
  }

  return (
    <div className="flex px-12 py-2 flex-col m-2 bg-white w-[95%] shadow-lg h-5/6">
      <h1 className="text-2xl text-blue-500 font-bold py-4 border-b-2  ">
        Candidate
      </h1>
      <div className="flex flex-col px-4 py-5 items-start text-md border-b-2  w-full">
        <div className="flex justify-start items-start ">
          <h1 className="text-md mr-2">Vote Count: </h1>
          <div className="border-2  rounded-lg">
            <input
              onChange={(e) => setInputAddress(e.target.value)}
              className="p-2"
              placeholder="Input Text"
            />
            <button
              onClick={handleCheckSubmit}
              className="bg-blue-500 text-white   rounded-md py-2 px-4"
            >
              Query
            </button>
          </div>
        </div>
        <h1 className="text-md mt-2 text-gray-500">Result: {voteCount}</h1>
      </div>
      <div className="flex flex-col px-4 py-5 items-start border-b-2  w-full">
        <div className="flex justify-center items-center">
          <h1 className="text-md mr-2">Add Candidate: </h1>
          <div className="border-2  rounded-lg">
            <input  onChange={(e) => setInputAddress(e.target.value)} className="p-2" placeholder="Input Text" />
            <button    onClick={handleAddCandidateSubmit}
                        className="bg-blue-500 text-white   rounded-md py-2 px-4">
              Add
            </button>
          </div>
        </div>
        <h1 className="text-md mt-2 text-gray-500">{resultMessage}</h1>
      </div>
      {/* <div className="flex flex-col px-4 py-5 items-start border-b-2  w-full">
        <div className="flex justify-center items-center">
          <h1 className="text-md mr-2">Change Symbol: </h1>
          <div className="border-2  rounded-lg">
            <input onChange={(e)=>setInputAddress(e.target.value)} className="p-2" placeholder="Addr1, Addr2" />
            <button onClick={handleAddCandidateSubmit} className="bg-blue-500 text-white   rounded-md py-2 px-4">
              Change
            </button>
          </div>
        </div>
        <h1 className="text-md mt-2 text-gray-500">Symbol Changed</h1>
      </div> */}
    </div>
  )
}

export default Candidate
