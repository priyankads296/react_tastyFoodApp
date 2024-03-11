import React from 'react'
import { withAdminAuth } from '../HOC';

function AuthenticationTestAdmin() {
  return (
    <div>
      This page can be accessed by admin only
    </div>
  )
}

export default withAdminAuth(AuthenticationTestAdmin);
