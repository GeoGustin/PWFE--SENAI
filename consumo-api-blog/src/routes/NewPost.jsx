import blogFetch from '../axios/config'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import './NewPost.css'

const NewPost = () => {

  const navigate = useNavigate()

  const [title, setTitle] = useState()
  const [body, setBody] = useState()

  const createPost = async (e) => {
    e.preventDefault()

    const post = {title, body, userId: 1}

    await blogFetch.post('/posts', {
      body: post
    })

    navigate('/')
  }

  return (
    <div className='new-post'>

          {/* <Link to={`/posts/${post._id}`} className='btn' key={post._id}> */}
          <h2>Novo post</h2>
            <form onSubmit={(e) => createPost(e)}>           {/* post */}
              <div className='form-control'>
                {/* h2 */}
                {/* <label htmlFor="title">Título do Post:</label><br /> */}
                <input  type='text' 
                        name='title' 
                        id='title' 
                        placeholder='Digite o título'
                        onChange={(e) => setTitle(e.target.value)}
                />
              
                {/* h2 */}
                {/* <label htmlFor="title">Título do Post:</label><br /> */}
                <textarea name='body' 
                        id='body' 
                        placeholder='Digite o conteúdo'
                        onChange={(e) => setBody(e.target.value)}
                        rows={5}
                />
                <input type='submit' value='Postar' className='postar-btn' />
              </div>
            </form>

            {/* <div className='post' key={post._id}>
              <h2>{post.title}</h2>
              <p className='body-btn'>
                <div className='hr'/><br />
                {post.body}
                <br /><br /><div className='hr'/>
              </p>
            </div> */}
          {/* </Link> */}
    </div>
  )
}

export default NewPost