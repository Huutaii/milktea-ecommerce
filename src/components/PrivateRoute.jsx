import { Navigate } from 'react-router-dom'
import React from 'react'
import { useStateValue } from '../context/StateProvider'

const PrivateRoute = ({ children }) => {
	const [{ user }] = useStateValue()
	return user ? children : <Navigate to="/signin" />
}

export default PrivateRoute
