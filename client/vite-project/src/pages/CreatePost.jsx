import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';


// ReactQuill toolbar options
const modules={
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ]
}

// ReactQuill formats
const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
]


export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');

    async function crearteNewPost(){
     const data = new FormData();
     data.set('title', title);
     data.set('summary', summary);
     data.set('content', content);
     data.set('files', files[0]);
     e.preventDefault();
     const response = await fetch('http://localhost:8000/posts',{
        method: 'POST',
        body: data,
     })
     console.log(await response.json());
    }

    return (
        <form onSubmit={crearteNewPost}>
            <input type='title' 
                   placeholder={'Title'} 
                   value={title} 
                   onChange={e => setTitle(e.target.value)}
            />
            <input type='summary' 
                   placeholder={'Summary'} 
                   value={summary}
                   onChange={e => setSummary(e.target.value)}
            />
            <input type='file' 
                   onChange={(e) => setFiles(e.target.files)}
            />
            <ReactQuill value={content} 
                        onChange={newValue => setContent(newValue)}
                        modules={modules}
                        formats={formats} />
            <button style={{marginTop: '5px'}}>Create post</button>
        </form>
    );
}