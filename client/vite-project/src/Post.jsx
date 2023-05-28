import { formatISO9075 } from 'date-fns' // time format

export default function Post({title, summary, cover, content, createdAt}) { // props to "Post.jsx"
    return(
        <div className='post'>
        <div className='image'>
          <img src="https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg" />
        </div>
        <div className='texts'>
          <h2>{title}</h2>
          <p className='info'>
            <a className='author'>Dewid Paraz</a>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p className='summary'>{summary}</p>
        </div>
      </div>
    )
}



