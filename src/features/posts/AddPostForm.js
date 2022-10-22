/**
 * React component for adding new posts
 */
import React, { useState } from 'react'

// for modifying redux state
import { useDispatch, useSelector } from 'react-redux'
// for creating new posts
import { postAdded } from './postsSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  // use the hook so that we can modify redux state
  const dispatch = useDispatch()

  const users = useSelector(state => state.users)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      // since we  added the prepare callback to accept 2 arguments, title and
      // content don't have to be wrapped in an object
      dispatch(postAdded(
        // new post object accessed through action.payload
        // id: nanoid(), // don't need this, as the prepare callback handles this automatically
        title, 
        content,
        userId
      ))
      // reset form data
      setTitle('');
      setContent('');
    }
  }

  const  canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

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
        <label htmlFor='postAuthor'>Author: </label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
