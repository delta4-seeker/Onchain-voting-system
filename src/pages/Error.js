

          import React from 'react'
          import { Link,Redirect, Navigate } from 'react-router-dom'
          let timer;
          class Errors extends React.Component {
            componentDidMount(){
              timer=setTimeout(() => {
                  
                console.log("asd")
                window.location.replace("/")
              }, 4000);
            }
            componentWillUnmount(){
              clearTimeout(timer)
            }
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
                        <h1 className=" text-4xl font-semibold  ">
                        <span className="text-red-500 font-bold">{this.props.message}</span> <h1 className='mt-2'>Please consult helpdesk. 
                        </h1>
                        </h1>
                    </div>
                  </div>
                </div>
              )
            }
          }
          
          export default Errors
          