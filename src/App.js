import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { setAccessToken } from './AccessToken'

import { Home, Login, Register, Profile, Logout } from './components'
import './App.css'

const App = () => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch(
			'http://localhost:4000/refresh',
			{
				method: 'POST',
				credentials: 'include'
			}
		).then(async x => {
			const data = await x.json()
			setAccessToken(data.accessToken)
			setLoading(false)
		})
	})

	if (loading) return (
		<div>
			<p>Loading...</p>
		</div>
	)

	return (
		<BrowserRouter>
			<Switch>
				<div class="div-1">
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/profile" component={Profile} />
					<Route path="/logout" component={Logout} />
				</div>
			</Switch>
		</BrowserRouter>
	)
}


export default App
