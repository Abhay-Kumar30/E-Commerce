import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <div className="mt-3">
       
        <div className="text-center">
          <div className="list-group">
              <h3>Dashboard</h3>
              <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
          </div>
        </div>
    </div>
  )
}
export default UserMenu
