import { Link } from 'react-router-dom'
import React from 'react'

class Intro extends React.Component {
  componentDidMount(){
    console.log('data : ' , this.props.data)
  }
  render() {
    return (
      <div className="row-2 ">
        <div className="bg-orange-500">
          {this.props.data === 'hello' ? (
            <Link
              to="/candilist"
              style={{ pointerEvents: 'none' }}
              className=" absolute right-3 top-5 flex w-max h-max bg-gray-300 text-xl font-bold rounded py-3 px-7  text-white"
            >
              Start
            </Link>
          ) : this.props.data.data === "No card" ? 
          (
            <Link
              to="/candilist"
              style={{ pointerEvents: 'none' }}
              className=" absolute right-3 top-5 flex w-max h-max bg-gray-300 text-xl font-bold rounded py-3 px-7  text-white"
            >
              Start
            </Link>
          )
          :  (
            <Link
              to="/candilist"
              className=" absolute right-3 top-5 flex w-max h-max bg-green-500 text-xl font-bold rounded py-3 px-7  text-white"
            >
              Start
            </Link>
          )}
        </div>
        {    this.props.data.data === 'No card'  ? 
        <div className=" flex justify-center items-center h-screen mx-auto  ">
          <div className="spinner-border animate-bounce inline-block w-11/12 px-5 text-center rounded-full">
            <h1 className=" text-2xl md:text-4xl font-semibold  ">
              <h1 className="mb-2"> Welcome to OnChain Voting System.</h1>
              <span className="text-green-500  font-bold">
                {' '}
                Insert your voting card!
              </span>
            </h1>
          </div>
        </div> : 
        this.props.data == 'hello'  ?  
        <div className=" flex justify-center items-center h-screen mx-auto  ">
        <div className="spinner-border animate-bounce inline-block w-11/12 px-5 text-center rounded-full">
          <h1 className=" text-2xl md:text-4xl font-semibold  ">
            <h1 className="mb-2"> Device Fault</h1>
            <span className="text-red-500  font-bold">
              {' '}
              Consult helpdesk
            </span>
          </h1>
        </div>
        </div>:

<div className=" flex justify-center items-center h-screen mx-auto  ">
<div className="spinner-border animate-bounce inline-block w-11/12 px-5 text-center rounded-full">
  <h1 className=" text-2xl md:text-4xl font-semibold  ">
    <h1 className="mb-2"> Card Detected</h1>
    <span className="text-green-500  font-bold">
      {' '}
      Click Start Botton.
    </span>
  </h1>
</div>
</div>
  }

      </div>
    )
  }
}

export default Intro
