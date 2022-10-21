/**
 * React component for adding new posts
 */
import React, { useState } from 'react'

// for modifying redux state
import { useDispatch } from 'react-redux'
// for creating new posts
import { postAdded } from './postsSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // use the hook so that we can modify redux state
  const dispatch = useDispatch()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      // since we  added the prepare callback to accept 2 arguments, title and
      // content don't have to be wrapped in an object
      dispatch(postAdded(
        // new post object accessed through action.payload
        // id: nanoid(), // don't need this, as the prepare callback handles this automatically
        title, 
        content
      ))
      // reset form data
      setTitle('');
      setContent('');
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked}>Save Post</button>
      </form>
    </section>
  )
}
