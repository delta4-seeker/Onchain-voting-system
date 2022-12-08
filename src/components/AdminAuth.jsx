import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Candidate from './Candidate'
import Election from './Election'
import Reset from './Reset'
import Voter from './Voter'
import Dashboard from './Dashboard'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const AdminAuth = () => {
  return (<>
        <Navbar />
    <Sidebar>

    <Routes>
      
    <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/candidate" element={<Candidate />} />
            <Route path="/election" element={<Election />} />
            <Route path="/voters" element={<Voter />} />
            <Route path="/reset" element={<Reset />} />
            <Route
              path="/*"
              element={
                <h1 className="mx-auto w-max text-4xl py-4 font-bold">
                  Coming Soon
                </h1>
              }
            />
    </Routes>
            </Sidebar>
            </>
  )
}

export default AdminAuth