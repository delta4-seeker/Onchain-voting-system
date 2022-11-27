import { Link } from 'react-router-dom'
import React from 'react'

class Intro extends React.Component {
  render() {
    return (
      <div className="row-2 ">
        <div className='bg-orange-500'>
          {this.props.data.data === 'No card' ? (
            <Link
              to="/candilist"
              style={{ pointerEvents: 'none' }}
              className=" absolute right-3 top-5 flex w-max h-max bg-gray-300 text-xl font-bold rounded py-3 px-7  text-white"
            >
              Start
            </Link>
          ) : (
            <Link
              to="/candilist"
              className=" absolute right-3 top-5 flex w-max h-max bg-green-500 text-xl font-bold rounded py-3 px-7  text-white"
            >
              Start
            </Link>
          )}
        </div>

        <div className=" flex justify-center items-center h-screen mx-auto  ">
            <div className="spinner-border animate-bounce inline-block w-11/12 px-5 text-center rounded-full">
              <h1 className=" text-2xl md:text-4xl font-bold  ">
                Welcome to OnChain Voting System.
                <span className="text-green-800">
                  {' '}
                  Insert your voting card!
                </span>
              </h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Intro
