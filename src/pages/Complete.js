import React from 'react'
import { Link,Redirect } from 'react-router-dom'
class Complete extends React.Component {

  
  render() {

      return (
        <div className="row-2 ">
          <div>
            <Link
              to="/"
              className=" absolute right-3 top-5 flex w-max h-max bg-red-500 text-xl font-bold rounded py-3 px-7  text-white"
            >
              Close
            </Link>
          </div>

          <div className=" flex justify-center items-center h-screen mx-auto ">
              <div className="spinner-border animate-bounce inline-block  w-11/12 px-5 text-center   font-semibold rounded-full">
                <h1 className=" text-4xl   ">
                  Voting Process{' '}
                  <span className="text-green-500   font-bold">Successful</span>. You can
                  remove your card.
                </h1>
              </div>
          </div>

         
        </div>
      )
    }
  }


export default Complete
