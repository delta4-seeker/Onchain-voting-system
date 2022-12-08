import React, { useState } from "react";
import Web3 from 'web3'
import VoteToken from '../abis/VoteToken.json'
const Voter = () => {
  const [voter, setVoterAdd] = useState("")
  const [checkVote, setCheckVote] = useState("")
  const [balance, setBalance] = useState("")
  const [resultMessage, setresultMessage] = useState("")
 
  const handleCheckSubmit= async ()=>{
console.log(checkVote)

let web3 = await new Web3(Web3.givenProvider || 'http://localhost:7545')
     window.ethereum.enable();
    console.log("web3 " )
    const accounts = await   web3.eth.getAccounts()
    const deployer = accounts[0];
    const abi =   VoteToken.abi ; 
    const address =   VoteToken.networks['5777'].address ; 
    // console.log("abis : " , abi);
    const voteToken =   new web3.eth.Contract(abi , address)
    // console.log(voteToken);[

    const balance = await  voteToken.methods.balanceOf(checkVote).call({from : deployer , gas : 999999});
    setBalance(balance)
 

  }
  const handleAddVoterSubmit= async ()=>{
console.log(voter)

let web3 = await new Web3(Web3.givenProvider || 'http://localhost:7545')
     window.ethereum.enable();
    console.log("web3 " )
    const accounts = await   web3.eth.getAccounts()
    const deployer = accounts[0];
    const abi =   VoteToken.abi ; 
    const address =   VoteToken.networks['5777'].address ; 
    // console.log("abis : " , abi);
    const voteToken =   new web3.eth.Contract(abi , address)
    // console.log(voteToken);[
try {
  const balance = await  voteToken.methods.AddVoter(voter).send({from : deployer , gas : 999999});
  setresultMessage("Voter added")
  
} catch (error) {
  setresultMessage("Error occured")

}
 
  }
  return (
    <div className="flex px-12 py-2 flex-col m-2 bg-white w-[95%] shadow-lg h-5/6">
      <h1 className="text-2xl text-blue-500 font-bold py-4 border-b-2 border-gray-200 ">
      Voter
      </h1>
      <div className="flex flex-col px-4 py-5 items-start text-md border-b-2 border-gray-200 w-full">
        <div className="flex justify-start items-start ">
          <h1 className="text-md mr-2">Check Vote Right: </h1>
          <div className="border-2 border-gray-200 rounded-lg">
            <input onChange={(e)=>setCheckVote(e.target.value)} className="p-2" placeholder="Input Text" />
            <button onClick={handleCheckSubmit} className="bg-blue-500 text-white   rounded-md py-2 px-4">
              Query
            </button>
          </div>
        </div>
        <h1 className="text-md mt-2 text-gray-800">Balance is : {balance} </h1>
      </div>
      <div className="flex flex-col px-4 py-5 items-start border-b-2 border-gray-200 w-full">
        <div className="flex justify-center items-center">
          <h1 className="text-md mr-2">Add Voter: </h1>
          <div className="border-2 border-gray-200 rounded-lg">
            <input onChange={(e)=>setVoterAdd(e.target.value)} className="p-2" placeholder="Input Text" />
            <button onClick={handleAddVoterSubmit} className="bg-blue-500 text-white   rounded-md py-2 px-4">
              Add
            </button>
          </div>
        </div>
        <h1 className="text-md mt-2 text-gray-500">{resultMessage}</h1>
      </div>
  
    </div>
  );
};

export default Voter;
