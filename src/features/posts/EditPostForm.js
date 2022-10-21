/**
 * form for editing a existing post
 */
import React, { useState } from 'react' // component state
import { useDispatch, useSelector } from 'react-redux' // global state
import { useHistory } from 'react-router-dom' // navigation

import { postUpdated } from './postsSlice' // altering global state

export const EditPostForm = ({ match }) => {
  const { postId } = match.params // get id from url

  // find post based on id
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  const [title, setTitle] = useState(post.title) // initialize with post title
  const [content, setContent] = useState(post.content) // initialize with post content

  const dispatch = useDispatch() // for executing actions on global state
  const history = useHistory() // for navigating programmatically

  // event listeners
  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onSavePostClicked = () => {
    if (title && content) {
      // if fields not null
      // pass in new post object through postUpdated
      // note: title and content are shorthand for title: title and content: content
      dispatch(postUpdated({ id: postId, title, content }))
      // navigate to new updated post listing
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What\'s on your mind?"
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
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}
