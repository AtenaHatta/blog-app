import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import { UserContext } from '../UserContext';

import { formatISO9075 } from 'date-fns';
import { FiEdit } from 'react-icons/fi';


export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null)
    const {userInfo} = useContext(UserContext)
    const {id} = useParams()

    useEffect(() => { 
    console.log(id);
      fetch(`http://localhost:8000/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
            setPostInfo(postInfo)
        })
      })
    },[])

    if(!postInfo) return '';

    return(
        <div className="post-page">
            {userInfo.id === postInfo.author._id &&(
            <div className="edit-row">
              <Link className="edit-btn" to={`/edit/${postInfo._id}`}><FiEdit />Edit</Link>
            </div>
            )}
          <h1>{postInfo.title}</h1>
          {/* <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
          <div className="author">by {postInfo.author.username}</div> */}
 
          <div className="image">
            <img src={`http://localhost:8000/${postInfo.cover}`} alt='' />
          </div>
          <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} /> 
        </div>
    )
}