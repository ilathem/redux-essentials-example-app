import React, { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import { Spinner } from '../../components/Spinner'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

import { useGetPostsQuery } from '../api/apiSlice'

const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export const PostsList = () => {
  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetPostsQuery()

  const sortedPosts = useMemo(() => {
    return posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
  }, [posts])

  let content = isLoading ? (
    <Spinner text="Loading..." />
  ) : isSuccess ? (
    <div
      className={
        classnames(
          'posts-container', {
            disabled: isFetching
          }
        )}
    >
      {sortedPosts.map((post) => <PostExcerpt key={post.id} post={post} />)}
    </div>
  ) : isError ? (
    <div>{error.toString()}</div>
  ) : null

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {content}
    </section>
  )
}
