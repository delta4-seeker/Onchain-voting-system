import React, { useEffect, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Progress from "./Progress";
import Web3 from 'web3'
import VoteToken from '../abis/VoteToken.json'

const Dashboard = () => {

  const [voterCount, setVoterCount] = useState("")
  const [CandidateCount, setCandidateCount] = useState("")
  const [voteCount, setVoteCount] = useState("")
  const [remainingVote, setRemainingVote] = useState("")
  const [timeStarted, setTimeStarted] = useState("")

let web3
let LoadBlockchainData= async ()=> {
  console.log("Before web3 " )

     web3 = await new Web3(Web3.givenProvider || 'http://localhost:7545')
     window.ethereum.enable();
    console.log("web3 " )
    const accounts = await   web3.eth.getAccounts()
    const deployer = accounts[0];

    const abi =   VoteToken.abi ; 
    const address =   VoteToken.networks['5777'].address ; 
    // console.log("abis : " , abi);
    const voteToken =   new web3.eth.Contract(abi , address)
    // console.log(voteToken);[
      const name = await  voteToken.methods.TokenName().call()

    const voterCount = await  voteToken.methods.VoterCount().call();
    console.log("voterCount : " , voterCount )
    setVoterCount(voterCount)
    const CandidateCount = await  voteToken.methods.CandidateCount().call();
    setCandidateCount(CandidateCount)
    const voteCount = await  voteToken.methods.TotalVoteCount().call();
    console.log("voteCount : " , voteCount )
    setVoteCount(voteCount)
    setRemainingVote(voterCount - voteCount)


    let result =  voteToken.getPastEvents('CandidateList' , {    fromBlock: 0,
      toBlock: 'latest',} );
      console.log(" ");
 
     

      
      
      
    }
    useEffect(() => {
    
       LoadBlockchainData()
    }, [web3])

  
  ChartJS.register(ArcElement, Tooltip, Legend);
  let votes = voteCount;
  console.log("votes",votes)
  const totalVotes = voterCount;
  console.log("total",totalVotes)

  let givenVotes = (votes * 100) / totalVotes;
  console.log(givenVotes)
  const data = {
    labels: ["Given Votes", "Total Votes"],
    datasets: [
      {
        label: "No. of Votes",
        data: [givenVotes, 100 - givenVotes],
        backgroundColor: ["rgba(0, 0, 255, 1)", "rgba(187, 247, 258, 1)"],

        borderWidth: 1,
      },
    ],
  };
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  var start =
    current.getHours() +
    ":" +
    current.getMinutes() +
    ":" +
    current.getSeconds();
  var timeRemaining =
    24 -
    Number(current.getHours()) +
    ":" +
    (60 - Number(current.getMinutes())) +
    ":" +
    (60 - Number(current.getSeconds()));
  //

  let [timer, setTimer] = useState(60);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };
  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };
  const handleStart=()=>{
    localStorage.setItem("timeStarted",timeStarted)
    localStorage.setItem("timeRemaining",timer)
    console.log(timeStarted)
  }
  const handleReset=()=>{
    localStorage.removeItem("timeStarted")
    localStorage.removeItem("timeRemaining")
  }
  let interval;
  const today = new Date();
  const tomorrow = new Date(today);
  useEffect(() => {
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log(tomorrow);
    setTimeStarted(start)
    console.log("start",start)
    setInterval(() => {
      interval = startTimer(tomorrow);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex px-12 py-2 flex-col m-2 shadow-lg bg-white w-[95%] h-5/6  ">
      <h1 className="text-2xl text-blue-500 font-bold py-4 border-b-2 ">
        Dashboard
      </h1>
     <div className="grid grid-row2">
      <div className="row-start-1 row-end-4">
      <div className="text-sm py-5 font-semibold">
      <h1 className="">Total Voters: {voterCount}</h1>
      <h1 className="">Total Vote Received: {voteCount}</h1>
        <h1 className="">Remaining Votes: {remainingVote}</h1>
        <h1 className="">
          Time Started: {date}, {localStorage.getItem("timeStarted")}
        </h1>
        <h1 className="">Time Remaining: {timer}</h1>
        <div className="row-start-2 w-56 m-10 row-end-4">
      <Doughnut data={data} />

      </div>
      </div>
      </div>
      <div className="row-start-1 row-end-4">
      <div className="text-sm py-5 font-semibold">
      <h1 className="">Total Candidates: {CandidateCount}</h1>
      <h1 className="">Total election poll: 32</h1>
        <h1 className="">Total EVM nodes: 160</h1>
        <h1 className="">
          Time Started: {date}, {timeStarted}
        </h1>
        <h1 className="">Time Remaining: {timer}</h1>
        <div className="row-start-2  m-10 w-56 row-end-4">
      <Doughnut data={data} />

      <button onClick={handleStart}>Start</button>
      <button onClick={handleReset}>Reset</button>
      </div>
      </div>
      </div>

     </div>

  
    </div>
  );
};

export default Dashboard;
