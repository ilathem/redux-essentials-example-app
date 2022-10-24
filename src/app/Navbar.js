import React from 'react'
import { Link } from 'react-router-dom' // for navigation
import { useDispatch, useSelector } from 'react-redux'

import { 
  fetchNotifications,
  selectAllNotifications
} from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const numUnreadNotifications = notifications.filter(n => !n.read).length

  const fetchNewNotifications = () => {
    console.log("fetching notifications")
    dispatch(fetchNotifications())
  }

  let unReadNotificationBadge

  if (numUnreadNotifications > 0) {
    unReadNotificationBadge = (
      <span className='badge'>{numUnreadNotifications}</span>
    )
  }
  
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks"></div>
          <div className='navLinks'>
            <Link to="/">Posts</Link>
            <Link to='/users/'>Users</Link>
            <Link to="/notifications">
              Notifications {unReadNotificationBadge}
            </Link>
          </div>
          <button className='button' onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
