/**
 * Will map to /posts/post_id using react redux
 */
import React from 'react'
import { Link } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useGetPostQuery } from '../api/apiSlice'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

export const SinglePostPage = ({ match }) => {
  // get postId from url parameter
  const { postId } = match.params

  const {
    data: post,
    isFetching,
    isSuccess
  } = useGetPostQuery(postId)

  let content = isFetching ? (
    <Spinner text="Loading..." />
  ) : isSuccess ? (
    <article className="post">
      <h2>{post.title}</h2>
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
      <p className="post-content">{post.content}</p>
      <Link to={`/editPost/${post.id}`} className="button">
        Edit Post
      </Link>
    </article>
  ) : null

  return (
    <section>
      {content}
    </section>
  )
}
