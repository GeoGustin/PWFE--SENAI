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

    await blogFetch.post('/posts', 
    { title, body })

    navigate('/')
  }

  return (
    <div className='new-post'>

          <h2>Novo post</h2>
            <form onSubmit={(e) => createPost(e)}>
              <div className='form-control'>

                <input  type='text' 
                        name='title' 
                        id='title' 
                        placeholder='Digite o título'
                        onChange={(e) => setTitle(e.target.value)}
                />
              
                <textarea name='body' 
                        id='body' 
                        placeholder='Digite o conteúdo'
                        onChange={(e) => setBody(e.target.value)}
                        rows={5}
                />
                <input type='submit' value='Postar' className='postar-btn' />
              </div>
            </form>

    </div>
  )
}

export default NewPost