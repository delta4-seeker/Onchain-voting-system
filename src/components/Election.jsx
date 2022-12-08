import React from "react";
import Web3 from 'web3'
import VoteToken from '../abis/VoteToken.json'

const Election = () => {
  let handleStart = async ()=> {
    console.log("Before web3 " )
      const web3 = await new Web3(Web3.givenProvider || 'http://localhost:7545')
       window.ethereum.enable();
      console.log("web3 " )
      const accounts = await   web3.eth.getAccounts()
      const deployer = accounts[0];
  
      const abi =   VoteToken.abi ; 
      const address =   VoteToken.networks['5777'].address ; 
      const voteToken =   new web3.eth.Contract(abi , address)
  
      const result = await  voteToken.methods.StartVoting().send({from : deployer , gas : 999999});
      console.log(result)
  }
  let handleStop = async ()=> {
    console.log("Before web3 " )
      const web3 = await new Web3(Web3.givenProvider || 'http://localhost:7545')
       window.ethereum.enable();
      console.log("web3 " )
      const accounts = await   web3.eth.getAccounts()
      const deployer = accounts[0];
  
      const abi =   VoteToken.abi ; 
      const address =   VoteToken.networks['5777'].address ; 
      const voteToken =   new web3.eth.Contract(abi , address)
  
      const result = await  voteToken.methods.StopVoting().send({from : deployer , gas : 999999});
      console.log(result)
  }
  return (
    <div className="flex px-12 py-2 flex-col m-2 bg-white w-[95%] shadow-lg h-5/6">
      <h1 className="text-2xl text-blue-500 font-bold py-4 border-b-2 border-gray-200 ">
        Election
      </h1>
      <div className="flex flex-col px-4 py-5 items-start text-md border-b-2 border-gray-200 w-full">
        <div className="flex justify-start items-start ">
          <h1 className="text-md mr-2">Start Election: </h1>
          <div className="border-2 border-gray-200 rounded-lg">
            <button onClick={handleStart} className="bg-blue-500 text-white   rounded-md py-2 px-4">
              Start
            </button>
          </div>
        </div>
        <h1 className="text-md mt-2 text-gray-500">Election is in progress</h1>
      </div>
      <div className="flex flex-col px-4 py-5 items-start border-b-2 border-gray-200 w-full">
        <div className="flex justify-center items-center">
          <h1 className="text-md mr-2">Stop Election: </h1>
          <div className="border-2 border-gray-200 rounded-lg">
            <button onClick={handleStop} className="bg-red-500 text-white   rounded-md py-2 px-4">
              Stop
            </button>
          </div>
        </div>
        <h1 className="text-md mt-2 text-gray-500">Election is in progress</h1>
      </div>

    </div>
  );
};

export default Election;
