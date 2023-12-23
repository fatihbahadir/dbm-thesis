import React from 'react'
import useLogout from '../hooks/useLogout'

const Home = () => {
  const logout = useLogout();
  return (
    <div>
      Home
      <button onClick={logout}>
        Sign out
      </button>
    </div>
  )
}

export default Home
