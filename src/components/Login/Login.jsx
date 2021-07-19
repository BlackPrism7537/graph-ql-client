import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loginUser } from '../../graphql/auth'
import { Link, useHistory } from 'react-router-dom'
import { setAccessToken } from '../../AccessToken'

const Login = () => {
    const [values, setValues] = useState({ email: '', password: '' })
    const [login, { loading, data }] = useMutation(loginUser)
    const history = useHistory()


    const handleSubmit = async (event) => {
        event.preventDefault()
        await login({ variables: { email: values.email, password: values.password } })
    }

    const handleChange = ({ target }) => {
        setValues({ ...values, [target.id]: target.value });
    };

    if (!loading && !data) return (
        <div>
            <h2>Login</h2>
            <Link to='/'>Back</Link><br /><br />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input required type="email" id="email" placeholder="Email" value={values.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input required type="password" id="password" placeholder="Password" value={values.password} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <Link to='/register'>Register</Link><br />
        </div>
    )

    if (loading) return (<>Loading...</>)

    if (data.login.accessToken) {
        setAccessToken(data.login.accessToken)
        history.push('/')
    } else {
        return (<>Error: {data.login.error}</>)
    }

    return ''


}

export default Login
