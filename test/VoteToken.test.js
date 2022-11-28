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

  describe('Add voters and candidate', () => {
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
    })
    describe('failure', () => {})
  })
})
