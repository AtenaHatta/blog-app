import { useState, useEffect } from 'react'
import Post from '../Post'

export default function indexPage(){
  const [posts, setPosts] = useState([]) 

  console.log(posts);

    // Connect to Backend
    useEffect(() => {
        fetch('http://localhost:8000/post').then(response => {
            response.json().then(posts => {
                setPosts(posts)
            })
        })
    }, [])

 return(
    <>
        {posts.length > 0 && posts.map((post) => 
          <Post {...post} key={post._id}/> 
        )}
    </>
 )
}