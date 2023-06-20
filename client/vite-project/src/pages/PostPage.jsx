import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { UserContext } from "../UserContext";

import { formatISO9075 } from "date-fns";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";

export default function PostPage() {
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";

  // Delete
  const handleDlete = () => {
    fetch(`http://localhost:8000/post/${id}`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div className="post-page">
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <FiEdit />
            Edit
          </Link>
          <a className="edit-btn" onClick={handleDlete}>
            <AiTwotoneDelete />
            Delete
          </a>
        </div>
      )}
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by {postInfo.author.username}</div>

      <div className="image">
        <img src={`http://localhost:8000/${postInfo.cover}`} alt="" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
}
