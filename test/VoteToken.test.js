const VoteToken = artifacts.require('./VoteToken')
require('chai').use(require('chai-as-promised')).should()

contract('VoteToken', ([deployer, candidate, voter1, voter2, voter3]) => {
  const name = 'Maat'
  let voteToken

  beforeEach(async () => {
    voteToken = await VoteToken.new()
  })

  describe('testing deployment', () => {
    describe('success', () => {
      it('track the name', async () => {
        const result = await voteToken.TokenName()
        result.should.equal(name)
      })
      it('Should compare deployer with ElectionCommision address', async () => {
        const result = await voteToken.ElectionCommission()
        result.toString().should.equal(deployer.toString())
      })
    })

    describe('failure', () => {})
  })

  describe('Add voters', () => {
    describe('success', async () => {
      let result
      let OldVoterCount
      let NewVoterCount
      beforeEach(async () => {
          OldVoterCount = await voteToken.VoterCount()
        result = await voteToken.AddVoter(voter1, { from: deployer })
      })

      it('VoterCount increment after adding voter ', async () => {
        NewVoterCount = await voteToken.VoterCount()
        OldVoterCount.toString().should.equal((NewVoterCount - 1).toString())
      })
      it('voter added to VoterList', async () => {
        result = await voteToken.VoterList(NewVoterCount)
        result.toString().should.equal(voter1.toString())
      })

      it('balance of voter should be one', async () => {
        result = await voteToken.balanceOf(voter1) ; 
        result.toString().should.equal("0")
      })
    })
    describe('failure', () => {})
  })

  describe("Air drop" , () => {
    it("should make balance of voter to 1" , async () => {
       await voteToken.AddVoter(voter1, { from: deployer })

      await voteToken.AirDrop({from: deployer});
      (await voteToken.balanceOf(voter1 , {from: deployer})).toString().should.equal("1");

    })
  })
  describe('Add candidate', () => {
    describe('success', async () => {
      let result
      beforeEach(async () => {
        result = await voteToken.addCandidate(candidate, { from: deployer })
        

      })

      it('Candidate index 0 should be candidate address', async () => {
        const result = await voteToken.Candidate(0);
        result.toString().should.equal(candidate)
      })


      it('VoteCount of candidate should be zero', async () => {
        result = await voteToken.VoteCount(candidate , {from : deployer}) ; 
        console.log( "vOTE Count of candidate is |: "  , result.toString() );
        result.toString().should.equal("0")
      })

   
    })
    describe('failure', () => {})
  })
})
