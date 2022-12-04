// SPDX-License-Identifier: MIT
pragma solidity^0.8.17 ; 
contract VoteToken { 
    uint256 public  VoterCount  ; 
   string  public TokenName = "Maat" ; 

   mapping(address => bool) public  BlacklistVoters ; 
   mapping(uint256 => address) public  VoterList ; 
   address[] public  Voters ; 
   address[] public  Candidate ; 
   mapping(address => uint256) public  VoteCount ; 
   event VoterAdded(address voter) ; 
   event CandidateData(address candidate , uint256 count);
   event CandidateList(address candidate , string image ,string residence );
    mapping(address => uint256) public balanceOf ; 
    address public  ElectionCommission;
     constructor(){
        ElectionCommission = msg.sender ; 
     }
     function addCandidate(address _candidate , string memory image , string memory residence) public returns (bool) {
         require(msg.sender == ElectionCommission , "Only ElectionCommision can call this function.");
         require( _candidate != msg.sender) ; 
         require(!BlacklistVoters[_candidate] , "This address is Blacklisted");
         Candidate.push(_candidate) ; 
         VoteCount[_candidate] = 0 ;
         emit CandidateList(_candidate ,  image , residence );

         return true;
     }

     function searchVoter(address _voter) public view returns (bool) {
      for(uint256 i = 0 ; i < Voters.length ; i++){
         if(Voters[i] == _voter) return true ;
      }
      return false ;
     } 
        function searchCandidate(address _candidate) public view returns (bool) {
      for(uint256 i = 0 ; i < Voters.length ; i++){
         if(Voters[i] == _candidate) return true ;
      }
      return false ;
     }
     function AddVoter(address _voter) public   returns (bool) {
        require( msg.sender == ElectionCommission , "ElectionCommision can only call this function");
        require( _voter != ElectionCommission , "ElectionCommision cannot vote");
        require( !BlacklistVoters[_voter] , "Blacklisted address");
        VoterCount = VoterCount + 1 ; 
        VoterList[VoterCount] = _voter ; 
        Voters.push(_voter);
        balanceOf[_voter] = 1 ; 
      emit VoterAdded(_voter) ; 

      return true ; 

     }

     function Vote(address _candidate , address _voter) public returns (bool) { 
            require (msg.sender == ElectionCommission);
            require(balanceOf[_voter] > 0 , "Insufficient balance.");
            VoteCount[_candidate] = VoteCount[_candidate] + balanceOf[_voter] ; 
            balanceOf[_voter] = 0 ; 
            emit CandidateData( _candidate , VoteCount[_candidate]);

            return true ; 
     }
}