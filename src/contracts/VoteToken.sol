// SPDX-License-Identifier: MIT
pragma solidity^0.8.17 ; 
contract VoteToken { 
   uint256 public  VoterCount  ; 
   uint256 public  CandidateCount  ; 
   uint256 public  TotalVoteCount  ; 
   string  public TokenName = "Maat" ; 
   bool votingStarted = false ; 
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
        BlacklistVoters[msg.sender] = true ;
     }
   function addCandidate(address _candidate , string memory image , string memory residence) public returns (bool) {
         require(msg.sender == ElectionCommission , "Only ElectionCommision can call this function.");
         require( _candidate != msg.sender) ; 
         require(!BlacklistVoters[_candidate] , "This address is Blacklisted");
         Candidate.push(_candidate) ; 
         VoteCount[_candidate] = 0 ;
         CandidateCount = CandidateCount + 1 ; 
         emit CandidateList(_candidate ,  image , residence );

         return true;
     }

     function removeCandidate(address _candidate ) public returns (bool) {
         require(msg.sender == ElectionCommission , "Only ElectionCommision can call this function.");
         require( _candidate != msg.sender) ; 
         require(!BlacklistVoters[_candidate] , "This address is Blacklisted");
         for(uint256 i = 0 ; i < Candidate.length ; i ++){
            if(Candidate[i] == _candidate){
               uint256 lastIndex = Candidate.length  -1 ; 
               address lastAddress = Candidate[lastIndex];
               Candidate[i] = lastAddress ; 
               Candidate.pop();
         }}
                  CandidateCount = CandidateCount - 1 ; 

         delete VoteCount[_candidate] ; 
         return true;
     }

      function addToBlackList(address _person ) public returns (bool) {
         require(msg.sender == ElectionCommission , "Only ElectionCommision already blacklisted.");
         require(!BlacklistVoters[_person] , "This address is already Blacklisted");
         BlacklistVoters[_person] = true  ; 
         return true;
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

     function StartVoting() public returns (bool) {
      require(!votingStarted , " Voting already started");
      votingStarted = true ; 
      return true;
      
     }


     function StopVoting() public returns (bool) {
      require(votingStarted , " Voting is not started");
      votingStarted = false ; 
      return true;
      
     }

     function Reset() public returns (bool) {
      require( msg.sender == ElectionCommission , "ElectionCommision can only call this function");
      for(uint256 i = 0 ; i < Voters.length ; i++){
         balanceOf[Voters[i]] = 1 ; 
      }
      for(uint256 i = 0 ; i < Candidate.length ; i++){
         VoteCount[Candidate[i]] = 0 ; 
      }
      require(votingStarted , " Voting is not started");
      votingStarted = false ; 
      TotalVoteCount = 0 ;
      return true;
      
     }

     function Vote(address _candidate , address _voter) public returns (bool) { 
            require (msg.sender == ElectionCommission);
            require(votingStarted , "Voting has not started");
            require(balanceOf[_voter] > 0 , "Insufficient balance.");
            VoteCount[_candidate] = VoteCount[_candidate] + balanceOf[_voter] ; 
            balanceOf[_voter] = 0 ; 
            TotalVoteCount = TotalVoteCount + 1 ; 
            emit CandidateData( _candidate , VoteCount[_candidate]);
            return true ; 
     }
}