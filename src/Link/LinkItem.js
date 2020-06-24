import {Link, withRouter} from 'react-router-dom'
import React, {useContext} from 'react'
import {getDomain} from '../utils/getDomain'
import FirebaseContext from '../firebase/context'



function LinkItem({link, index, showCount, history}) {
    const{firebase, user} = useContext(FirebaseContext)
    
    
    function handleVote(){
        if(!user){
            history.push('/login')


        }else{
            const voteRef = firebase.db.collection('links').doc(link.id)
            voteRef.get().then(doc => {
                if(doc.exists){
                    const previousVotes = doc.data().votes
                    const vote= {votedBy:{id:user.uid, username:user.displayName}}
                    const updatedVotes = [...previousVotes, vote]
                    voteRef.update({votes:updatedVotes})
                }
            })
        }
    }

    function handleDeleteLink(){
        const linkRef = firebase.db.collection('links').doc(link.id)
        linkRef.delete().then(() => {
            console.log(`document with ID ${link.id} deleted`)
        }).catch(err => {
            console.error("Error deleting document:", err)
        } )

    }

    let postedByAuthUser = user && user.uid === link.postedBy.id


    return (
        <div className="bg-teal-200 py-2">
            <div  className=" flex flex-row italic text-gray-700 text-center bg-teal-300 px-4 py-2 m-2">
            {postedByAuthUser && (<div className="cursor-pointer" onClick={handleDeleteLink}><i className="fas fa-trash-alt"></i></div>)}
            <div className="px-4 cursor-pointer" onClick={handleVote}><i className="fas fa-thumbs-up"></i></div>
           
            {showCount && <span className="text-gray-800">{index}.</span>}
    
            <a href={link.url} className="text-indigo-500 px-1">{link.description}</a> <span className="px-1">({getDomain(link.url)})</span> {link.votes.length} votes by {link.postedBy.username} {''} 
            about {link.created} {"|"} <Link to={`/link/${link.id}`}>
            {link.comments.length > 0 ? `${link.comments.length} comments`
            : "discuss"}  
        </Link>
        </div>
        </div>
    )
}

export default withRouter(LinkItem)
