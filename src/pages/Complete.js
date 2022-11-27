import React from 'react'
import { Link } from 'react-router-dom'
class Complete extends React.Component {



  render() {

      return (
        <div className="row-2 ">
          <div>
            <Link
              to="/"
              className=" inline-block m-10 float-right bg-red-600 text-xl font-bold rounded py-3 px-7  text-white"
            >
              Close
            </Link>
          </div>

          <div className=" container flex h-screen">
            <div className=" mx-auto mt-40 ">
              <div className="spinner-border animate-bounce inline-block w-screen/2  rounded-full">
                <h1 className=" text-4xl font-bold  ">
                  Voting Process{' '}
                  <span className="text-green-800">Successful</span>. You can
                  remove your card.
                </h1>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }


export default Complete
