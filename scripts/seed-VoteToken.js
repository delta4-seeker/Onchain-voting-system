
const VoteToken = artifacts.require('VoteToken')


module.exports = async function(callback) {

    try{

        const accounts = await web3.eth.getAccounts();
        const deployer = accounts[0] ; 
        const candidates =  accounts.slice(1,5);
        console.log("candidate are : " , candidates)
        const voters = accounts.slice(6, 10);
        console.log("voters are : " , voters)
        
        const voteToken  = await VoteToken.deployed();
        console.log(" contract adddress is : " , voteToken.address)
         voters.map(async (voter) => {

             console.log("Voter added : " , voter);
            await voteToken.AddVoter(voter , {from : deployer});
        })

         candidates.map(async (candidate) => {

             console.log("Candidate added : " , candidate);
            await voteToken.addCandidate( candidate , {from: deployer})

        })
    voteToken.AirDrop({from : deployer })
    console.log("Air drop done");

    voters.map(async (voter , index) => {

        const result = await voteToken.balanceOf(voter , {from : deployer});
        console.log("Voter " , index ,  " balance : " , result);
   })
    }
    catch(error){
        console.log(error)

    }

    callback()
}