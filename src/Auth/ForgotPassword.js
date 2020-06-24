import React, {useState, useContext} from 'react'
import  FirebaseContext from '../firebase'

function ForgotPassword() {
    const {firebase} = useContext(FirebaseContext)
    const[resetPasswordEmail, setResetPasswordEmail] = useState('')
    const[isPasswordReset, setIsPasswordReset]=useState(false)
    const[passwordResetError, setPasswordResetError]=useState(null)

    async function handleResetPassword(){
        try{
          await firebase.resetPassword(resetPasswordEmail)
          setIsPasswordReset(true)
          setPasswordResetError(null)
        }catch(err){
            setPasswordResetError(err.message)
            setIsPasswordReset(false)
            console.error("Error sending email", err)
        }
    }

    return (
        <div className="absolute px-8 py-8 mt-2">
            <input className="italic bg-gray-200 appearance-none border-2 border-gray-200
                    w-auto py-2 px-4 text-gray-700 leading-tight 
                    focus:outline-none focus:bg-white 
                    focus:border-purple-500 rounded" 
                    placeholder="please provide your email"
                    onChange={(e) => setResetPasswordEmail(e.target.value)}
            />
            <button type="button" 
            className="bg-teal-400 flex flex-row 
            mt-2 h-10 px-4 text-white 
            hover:bg-teal-600 rounded" 
            onClick={handleResetPassword}>
                Reset password?
            </button>
            {isPasswordReset && <p className="italic text-indigo-400">Check email to reset password</p>}
            {passwordResetError && <p className="text-indigo-400">{passwordResetError}</p>}
        </div>
    )
}

export default ForgotPassword
