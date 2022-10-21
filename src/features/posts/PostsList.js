/**
 * React component that shows the list of posts
 */
import React from 'react';
import { useSelector } from 'react-redux';
// import link to link an excerpt to an individual post page
import { Link } from 'react-router-dom';

export const PostsList = () => {
  // useSelector extracts one field from the redux state object
  const posts = useSelector(state => state.posts)

  // will render a post object for each post in redux state
  const renderedPosts = posts.map(post => (
    <article className='post-excerpt' key={post.id}>
      <h3>{post.title}</h3>
      <p className='post-content'>{post.content.substring(0, 100)}</p>
      {/* links to an individual post page */}
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ))

  return (
    <section className='posts-list'>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}