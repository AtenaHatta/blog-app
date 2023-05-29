import { useState } from "react";
import { Navigate } from "react-router-dom";

import Editor from "../Editor";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (files.length > 0){
        data.set("file", files[0]); // data.set("file", files[0]); // "files data" is in an array[0]
    }
    

    const response = await fetch("http://localhost:8000/post", {
      method: "POST",
      body: data,
      credentials: "include", // to send the cookies to the backend
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  // Redirect to home page
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="format-page">
    <form onSubmit={(e) => createNewPost(e)}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button type="submit" style={{ marginTop: "5px" }}>
        Create post
      </button>
    </form>
    </div>
  );
}
