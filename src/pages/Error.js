

          import React from 'react'
          import { Link } from 'react-router-dom'
          class Errors extends React.Component {
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
          
                  <div className="flex justify-center items-center h-screen mx-auto ">
                      <div className="spinner-border animate-bounce inline-block w-11/12 px-5 text-center rounded-full">
                        <h1 className=" text-4xl font-bold  ">
                        <span className="text-red-800">{this.props.message}</span> Please consult helpdesk. 

                        </h1>
                    </div>
                  </div>
                </div>
              )
            }
          }
          
          export default Errors
          