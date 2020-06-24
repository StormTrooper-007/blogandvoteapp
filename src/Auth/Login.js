import React, {useState} from 'react'
import useFormValidation from './useFormValidation'
import validateLogin from './validateLogin'
import firebase from '../firebase/firebase'
import {Link} from 'react-router-dom'


let INITIAL_STATE = {
    username:'',
    email:'',
    password:''
}

function Login(props) {
    
    const {handleSubmit, handleChange, handleBlur, values, errors, isSubmitting} = useFormValidation(
        INITIAL_STATE,
        validateLogin,
        authenticateUser
        )
    const[login, setLogin] = useState(true)
    const [firebaseError, setFirebaseError] = useState(null)

    async function authenticateUser(){
        const {username, email, password}=values
        try{
            login
        ? await firebase.login(email, password)
        : await firebase.register(username, email, password)
        props.history.push('/')
        }catch(err){
            console.error('Authentication error', err)
            setFirebaseError(err.message)
        }
    }

        return (
            <div>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                 <div className="mb-4">
                 <h1 className="block text-teal-600 text-3xl font-bold mb-2">{login ? 'Login': 'Register'}</h1>
                 <div className="h-1 bg-red-500 w-64"></div>
                   {!login && <label className="block text-teal-600 text-lg font-bold mb-2" for="username">
                       Username
                   </label>}
                    {!login && 
                    <input className=" italic bg-gray-200 appearance-none border-2 border-gray-200
                    w-auto py-2 px-4 text-gray-700 leading-tight 
                    focus:outline-none focus:bg-white 
                    focus:border-purple-500" value={values.username} 
                    name="username" type="text" placeholder="username" 
                    onChange={handleChange} />}

                    {errors.email && <p className="text-red-400">{errors.email}</p>}
    
                    <label className="block text-teal-600 text-lg font-bold mb-2" for="todo">
                       Email
                    </label>
                    <input className="italic bg-gray-200 appearance-none border-2 border-gray-200
                    w-auto py-2 px-4 text-gray-700 leading-tight 
                    focus:outline-none focus:bg-white 
                    focus:border-purple-500" value={values.email}
                     name="email" type="text" placeholder="email" 
                     onChange={handleChange} onBlur={handleBlur}/>

                    {errors.password && <p className="text-red-400">{errors.password}</p>}
                    {firebaseError && <p className="text-indigo-400">{firebaseError}</p>}
    
                    <label className="block text-teal-600 text-lg font-bold mb-2" for="todo">
                       Password
                    </label>
                    <input className="italic bg-gray-200 appearance-none border-2 border-gray-200
                    w-auto py-2 px-4 text-gray-700 leading-tight 
                    focus:outline-none focus:bg-white 
                    focus:border-purple-500" value={values.password} 
                    name="password" password="password" type="password" 
                    placeholder="password" onChange={handleChange} onBlur={handleBlur}/>
    
                    <div flex flex-row>
                    <button type="submit" className="mt-4 bg-red-500 h-10 ml-4 hover:bg-red-700 
                    text-white font-bold py-2 px-4 rounded" disabled={isSubmitting}
                     style={{background:isSubmitting?"teal":"tomato"}}>
                        Submit
                    </button>
                    <button  type="button" className="bg-red-500 h-10 ml-4 hover:bg-red-700 
                    text-white font-bold py-2 px-4 rounded" onClick={() => setLogin(prevLogin => !prevLogin)}>
                    {login ? 'register':'go to login'}
                    </button>
                    </div>
                 </div>
                </form>
                <div className="italic text-indigo-500">
                    <Link to="/forgot">
                        Forgot password?
                    </Link>
                </div>
            </div>
        )
    } 

export default Login
