const VoteToken = artifacts.require('./VoteToken')

require('chai').use(require('chai-as-promised')).should()

contract('VoteToken' , ([deployer , candidate , voter1 , voter2 , voter3]) => {
        const name = 'Maat' ; 

        beforeEach( async () => { 
            voteToken = await VoteToken.new() ;
        })

        describe('deployment' , () => {
            it('track the name' , async () =>  {

                const result = await voteToken.name() ; 
                result.should.equal(name)

            })
        })
})