import {Link} from 'react-router-dom';
import React from 'react';


class Intro extends React.Component {




  render(){
    return <div className="row-2 ">
          <div>   

            { this.props.data.data === "No card" ?      <Link

to='/candilist'

style={{pointerEvents: 'none'}}
    className=" inline-block m-10 float-right bg-gray-300 text-xl font-bold rounded py-3 px-7  text-white"
 >
   Start
 </Link>:  
    <Link

to='/candilist'


    className=" inline-block m-10 float-right bg-green-600 text-xl font-bold rounded py-3 px-7  text-white"
 >
   Start
 </Link> }   
      
          </div>
        
        <div className="container flex h-screen ">
        <div className=" mx-auto mt-40">
          <div className="spinner-border animate-bounce inline-block w-screen/2  rounded-full">
            <h1 className=" text-4xl font-bold  ">
              Welcome to OnChain Voting System.
              <span className="text-green-800"> Insert your voting card!</span>
            </h1>
          </div>
        </div>
      </div>
      </div>    
  }

}

export default Intro  ; 
