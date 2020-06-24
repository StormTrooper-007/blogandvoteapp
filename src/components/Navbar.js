import React, {useContext} from 'react'
import {withRouter, NavLink} from 'react-router-dom'
import { FirebaseContext } from '../firebase'

function Navbar() {
  const {user, firebase} = useContext(FirebaseContext)
    return (
        <div className="flex h-16 border-b bg-teal-500">
            <div className="-mb-px mr-1">
            <NavLink to='/'className="bg-teal-500 py-4 inline-block border 
            border-yellow-500 border-solid border-12 
            rounded-t py-2 
            px-4 text-white font-semibold">HookNews</NavLink>
            </div>
           
           <div className="mr-3">
            <NavLink to='/new'className="inline-block border border-blue-500
             hover:bg-red-700 rounded w-20 
             py-4 px-5 bg-red-500 
             text-white">New</NavLink>
           </div>
           
           <div className="mr-1">
            <NavLink to='/top' className="bg-teal-500 inline-block py-4 px-4
             text-white hover:text-red-500 
             font-semibold">Top</NavLink>
           </div>
                 
           <div className="mr-1">
            <NavLink to='/search' className="bg-teal-500 inline-block py-4 px-4 
            text-white hover:text-red-500 
            font-semibold">Search</NavLink>
           </div>
        
           <div className="mr-1">
            {user && 
             <NavLink to='/create' className="bg-teal-500 inline-block py-4 px-4 
            text-white hover:text-red-500 
            font-semibold">Submit</NavLink>
            }
           </div>
           <div className="mr-1 absolute right-0">
            {user ? (
              <div className="flex flex-row py-4 px-4 font-bold text-white">
              <div className="ml-2 px-2">{user.displayName}</div>
              <div className="mr-2 h-6 w-1 bg-indigo-400"/>
              <div className="hover:text-red-400 cursor-pointer" onClick ={() => firebase.logout()}>Logout</div>
              </div>

            ) : (<NavLink to='/login' className="bg-teal-500 inline-block py-4 px-4 
            text-white hover:text-red-500 
            font-semibold">Login</NavLink>)}
           </div>
    </div>
    )
}

export default withRouter(Navbar)
