import { useMutation } from '@apollo/react-hooks'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { setAccessToken } from '../../AccessToken'
import { logoutUser } from '../../graphql/auth'

const Logout = () => {
    const [logout, , loading, error] = useMutation(logoutUser)
    const history = useHistory()

    useEffect(() => {
        logout()
        setAccessToken(null)
    }, [logout])

    if (loading) {
        return <p>Logging out...</p>
    } else if (error) {
        return <p>Error: {error.message}</p>
    } else {
        history.push('/')
        return (
            <p>You have been logged out.</p>

        )
    }
}

export default Logout
