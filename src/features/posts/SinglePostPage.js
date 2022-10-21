/**
 * Will map to /posts/post_id using react redux
 */
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const SinglePostPage = ({ match }) => {
  // get postId from url parameter
  const { postId } = match.params

  // using useSelector, get the post that matches with that id
  const post = useSelector((state) =>
    // since we know that state.posts is an array, we can use array.find() to
    // find the exact array element we need
    state.posts.find((post) => post.id === postId)
  )

  // if no post exists
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  // post does exist
  // component will rerender every time the post changes from useSelector
  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}
