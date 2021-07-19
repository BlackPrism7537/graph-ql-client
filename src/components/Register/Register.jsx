import { useMutation } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { registerUser } from '../../graphql/auth'

const Register = () => {
    const [values, setvalues] = useState({ email: '', password: '', confirmPassword: '', firstname: '', lastname: '' })
    const [register, { data, loading }] = useMutation(registerUser, { fetchPolicy: 'network-only' })
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password, confirmPassword, firstname, lastname } = values
        if (password !== confirmPassword) {
            return false
        }

        await register({ variables: { email, password, firstname, lastname } })
    }

    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }

    const handleClear = (e) => {
        setvalues({ email: '', password: '', confirmPassword: '', firstname: '', lastname: '' })
    }

    if (!loading && !data) return (
        <div>
            <h1>Register</h1>
            <Link to='/'>Back</Link><br /><br />


            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} value={values.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} value={values.password} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={values.confirmPassword} />
                </div>
                <div className="form-group">
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" className="form-control" name="firstname" placeholder="Firstname" onChange={handleChange} value={values.firstname} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Lastname</label>
                    <input type="text" className="form-control" name="lastname" placeholder="Lastname" onChange={handleChange} value={values.lastname} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </form>
            <button className="btn btn-secondary" onClick={handleClear}>cancel</button>
        </div>
    )

    if (loading) return (<>Loading...</>)

    if (!data.register) {
        return (<>Registration Error!</>)
    } else {
        history.push('/login')
    }


}

export default Register
