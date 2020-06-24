import React, {useEffect, useState, useContext} from 'react'
import FirebaseContext from '../firebase/context'
import LinkItem from './LinkItem'

function LinkDetail(props) {
    const linkId = props.match.params.linkId
    const{firebase, user} = useContext(FirebaseContext)
    const [link, setLink] = useState(null)
    const [commentText, setCommentText] = useState('')
    const linkRef = firebase.db.collection('links').doc(linkId)

    useEffect(() => {
        getLink()
    }, [])

    function getLink(){
        const linkRef = firebase.db.collection('links').doc(linkId)
        linkRef.get().then(doc => {
            setLink({...doc.data(), id:doc.id})
        })
    }

    function handleAddComment(){
        if(!user){
            props.history.push('/login')
        }else{
            linkRef.get().then(doc => {
                if(doc.exists){
                    const previousComments = doc.data().comments
                    const comment =
                    {
                        postedBy:{id:user.uid, username:user.displayName},
                        created:Date.now(),
                        text: commentText
                    }
                    const updatedComments = [...previousComments, comment]
                    linkRef.update({comments:updatedComments})
                    setLink(prevState => ({
                        ...prevState,
                        comments:updatedComments
                    }))
                    setCommentText('')
                }
            })
        }

    }
    
    return !link ? (<div>Loading...</div>)
    :(
        <div>
             <LinkItem showCount={false} link={link}/>

             <textarea className="resize-y px-4 py-4 border rounded 
            focus:outline-none 
            focus:shadow-outline
            " onChange={e => setCommentText(e.target.value)}
            value={commentText}/>
            <div className="px-2 py-2">
            <button className="bg-teal-500 font-bold text-white px-4 rounded " onClick={handleAddComment}>Submit</button>
            </div>
            {link.comments.map((comment, index) => (
            <div key={index}>
            <p>{comment.postedBy.username}|{comment.created}</p>
            <p>{comment.text}</p>
            </div>
            ))}
        </div>
     )
}

export default LinkDetail
           
            

            
            
            

            
