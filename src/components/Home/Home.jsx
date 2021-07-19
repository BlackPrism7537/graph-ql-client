import { useLazyQuery } from '@apollo/react-hooks'
import React from 'react'
import { Link } from 'react-router-dom'
import { getAccessToken } from '../../AccessToken'
import { authQuery } from '../../graphql/auth'

//home page
const Home = () => {
    const [auth, { data, loading, error }] = useLazyQuery(authQuery, { fetchPolicy: 'network-only' })

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page</p>

            {
                (getAccessToken())
                    ? (
                        <div>
                            <button onClick={auth}>Click me</button>
                            {'  Auth:' + (loading ? 'Loading...' : ' ' + (data?.auth?.ok ? data.auth.user._id : error?.message))}<br />
                            <Link to="/profile">Profile</Link><br />
                            <Link to="/logout">Logout</Link><br />
                        </div>
                    )
                    : (
                        <div>
                            <Link to='/register'>Register</Link><br />
                            <Link to='/login'>Login</Link><br />
                        </div>
                    )
            }


        </div>
    )
}

export default Home
