import React, {useContext} from 'react'
import useFormValidation from '../Auth/useFormValidation'
import validateCreateLink from '../Auth/validateCreateLink'
import FirebaseContext from '../firebase/context'

let INITIAL_STATE = {
    description:'',
    url:''
}

function CreateLink(props) {
    const{firebase, user} = useContext(FirebaseContext)
    const{handleSubmit, handleChange, values, errors} = useFormValidation(
        INITIAL_STATE, validateCreateLink, handleCreateLink
        )

    function handleCreateLink(){
        if(!user){
            props.history.push('/login')
        }else{
            const {url, description} = values
            const newLink = {
                url,
                description,
                postedBy:{
                    id:user.uid,
                    username:user.displayName
                },
                votes:[],
                comments:[],
                created:Date.now()
            }
            firebase.db.collection('links').add(newLink)
            props.history.push('/')
            console.log(newLink)
        }
    } 
    return (
    <form onSubmit={handleSubmit}>
        <div className="px-4 py-4 flex flex-col">
            {errors.description && <p className="text-indigo-500">{errors.description}</p>}
            <input name="description" type="text" 
            placeholder="description" 
            className="bg-gray-200 appearance-none border-2 
            border-gray-200 focus:outline-none 
            focus:border-purple-500 
            focus:bg-white rounded" value={values.description} onChange={handleChange}/>

            {errors.url && <p className="text-indigo-500">{errors.url}</p>}
            <input name="url" type="url" 
            placeholder="the url for the link" 
            className="mt-2 bg-gray-200 appearance-none border-2 
            border-gray-200 focus:outline-none focus:border-purple-500 
             focus:bg-white rounded" value={values.url} onChange={handleChange}/>

            <button type="submit" 
            className="bg-teal-400 flex flex-row 
            mt-2 h-10 px-4 text-white 
            hover:bg-teal-600 rounded">
                Submit
            </button>
        </div>
    </form>
       
    )
}

export default CreateLink
