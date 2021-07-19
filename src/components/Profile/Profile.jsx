import { useLazyQuery } from '@apollo/react-hooks'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { authQuery } from '../../graphql/auth'

const Profile = () => {
    const [auth, { data, loading, error }] = useLazyQuery(authQuery, { fetchPolicy: 'network-only' })

    useEffect(() => {
        auth()
    }, [auth])

    return (
        <div>
            <h1>Profile</h1>
            {loading && <div>Loading...</div>}
            {!loading && error && <div>Error: {error}</div>}
            {!loading && data && <div>
                <p>
                    <b>Name:</b> {data.auth.user.firstname + " " + data.auth.user.lastname}<br />
                    <b>Email:</b> {data.auth.user.email}<br /><br />
                    <Link to="/">Back to home</Link><br />
                    <Link to="/logout">Logout</Link>
                </p>
            </div>}
        </div>
    )
}

export default Profile
