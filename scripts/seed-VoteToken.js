

const VoteToken = artifacts.require('VoteToken')

module.exports = async function (callback) {

  const candidateIcons = [
    "/static/media/cat.20c866aede53e45aa6c4.jpg",
 "/static/media/dog.4058bcdf7d7807494297.jpg",
 "/static/media/lion.3d4707222e7182cd3a5c.jpg",
 "/static/media/parrot.1da698f5ed3579148152.jpg",
 "/static/media/wolf.8a80d9c728fe1003bbc0.jpg",
 "/static/media/owl.25ddeded0d255712fee2.jpg",
 "/static/media/panda.5bda9f906d1dbcf905b1.jpg",
"/static/media/lemur.4351d43fa8e0812234ef.jpg",
 "/static/media/koala.451e751aa930ac41b649.jpg",
 "/static/media/fox.adbe94468ba7d778147e.jpg"
  ]
  const accounts = await web3.eth.getAccounts()
  const deployer = accounts[0]
  const candidates = accounts.slice(1, 6)
  // console.log('candidate are : ', candidates)
  const voters = accounts.slice(1, 10)
  // console.log('voters are : ', voters)
  // candidateIcons.sort(Math.random())
  const voteToken = await VoteToken.deployed()
  console.log('name : ', await voteToken.TokenName())

  for(let i = 0 ; i < candidates.length ; i++ ){
    await voteToken.addCandidate(candidates[i], candidateIcons[i], 'location123', {
      from: deployer,
      gas: 999999,
    })
    console.log('Candidate added : ', candidates[i])  
}


for(let i = 0 ; i < voters.length ; i++ ){

    await voteToken.AddVoter(voters[i], {
      from: deployer,
      gas: 999999,
    })
    console.log('Voter' , i+1 ," added : ")
    console.log('Voter ' ,  voters[i] )
    let balance = await voteToken.balanceOf(voters[i] , {from : deployer ,  gas : 999999}) ; 
    console. log("the balance of voter " ,i+1 , " is " , balance.toString() );

// try {
  
//   await voteToken.Vote( candidates[i] ,voters[i]  ,  { from : deployer , gas : 999999});
//   balance = await voteToken.balanceOf(voters[i] , {from : deployer ,  gas : 999999}) ; 

//   console.log("voter " , i+1 , "voted. the new balance is " , balance.toString() )
// } catch (error) {
//   console.log(error)
// }
  }

  callback()
}
