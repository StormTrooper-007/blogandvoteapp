import React, { useState, useContext, useEffect} from 'react'
import FirebaseContext from '../firebase/context'
import LinkItem from './LinkItem'

function SearchLinks() {
    const {firebase} = useContext(FirebaseContext)
    const [filteredLinks, setFilteredLinks] = useState([])
    const [links, setLinks] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        getInitialLinks()
    }, [])

    function getInitialLinks(){
        firebase.db.collection('links').get().then(snapshot => {
            const links = snapshot.docs.map(doc =>{
                return{id: doc.id, ...doc.data()}
            })
            setLinks(links)
        })
    }


    function handleSearch(e){
        e.preventDefault()
        const query=filter.toLowerCase()
        const matchedLinks = links.filter(link => {
            return(
            link.description.toLowerCase().includes(query) || 
            link.url.toLowerCase().includes(query) || link.postedBy.username.toLowerCase().includes(query)
            )
        })
        setFilteredLinks(matchedLinks)
    }


    return (
        <div className="flex flex-col px-4 py-4">
            <form onSubmit={handleSearch}>
            <input type="text" 
            placeholder="Enter search query" 
            className="py-2 bg-gray-200 appearance-none border-2 
            border-gray-200 focus:outline-none 
            focus:border-purple-500 
            focus:bg-white rounded" onChange={(e) => setFilter(e.target.value)}/>
                <button className="bg-teal-500 px-4 py-2 rounded 
                text-white font-bold m-2 hover:bg-red-500">Ok</button>
            </form>
            {filteredLinks.map((filteredLink, index) => (
                <LinkItem key={filteredLink.id} showCount={false} link={filteredLink} index={index}/>
            ))}
        </div>
    )
}

export default SearchLinks

