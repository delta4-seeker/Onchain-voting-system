// SPDX-License-Identifier: MIT
pragma solidity^0.8.17 ; 
contract VoteToken { 
    uint256 public  VoterCount  ; 
   string  public TokenName = "Maat" ; 
   bool public  airDrop ; 

   mapping(address => bool) public  BlacklistVoters ; 
   mapping(uint256 => address) public  VoterList ; 
   address[] public  Voters ; 
   address[] public  Candidate ;
   mapping(address => uint256) public  VoteCount ; 


    mapping(address => uint256) public balanceOf ; 
    address public  ElectionCommission;
     constructor(){
        ElectionCommission = msg.sender ; 
         airDrop = true ; 
     }
     function AddVoter(address _voter) public   returns (bool) {
        require( msg.sender == ElectionCommission , "ElectionCommision can only call this function");
        require( _voter != ElectionCommission , "ElectionCommision cannot vote");
        require( !BlacklistVoters[_voter] , "Blacklisted address");
        VoterCount = VoterCount + 1 ; 
        VoterList[VoterCount] = _voter ; 
        Voters.push(_voter);
        balanceOf[_voter] = 0 ; 
      return true ; 

     }
     function AirDrop() public returns (bool) {
      require ( msg.sender== ElectionCommission);
      require( airDrop , " AirDrop already done!" );
      for(uint256 id= 1 ; id < Voters.length ; id++){
         balanceOf[Voters[id]] = 1 ; 
      }
      airDrop = false ; 
      return true ; 
     }

     function Vote(address _candidate , address voter) public returns (bool) { 
            require (msg.sender == ElectionCommission);
            require(balanceOf[voter] > 0 , "Insufficient balance.");
            VoteCount[_candidate] = VoteCount[_candidate] + balanceOf[voter] ; 
            balanceOf[voter] = 0 ; 
            return true ; 
     }
}