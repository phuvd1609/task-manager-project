import React, { useEffect, useState } from "react";
import UserApi from "../api/UserApi";
import { useCookies } from 'react-cookie'

const Auth = ({ }) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)

    const viewLogin = (status) => {
        setError(null)
        setIsLogin(status)
    }

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault()
        if (!isLogin && password !== confirmPassword) {
            setError('Passwords are not matching');
            return
        }
        const postData = {
            email: email,
            password: password
        }
        
            const response = isLogin ? await UserApi.logIn(postData) : await UserApi.signUp(postData)
            if (response.status != 200) {
                setError(response.message)
            }
            else {
                setError(null);
                setCookie('Email', response.data.email)
                setCookie('AuthToken', response.data.token)

                window.location.reload()
            }
        
        
    }

    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <form>
                    <h2>{isLogin ? "Please log in" : "Please sign up"}</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}></input>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}></input>

                    {!isLogin &&
                        <input
                            type="password"
                            placeholder="Confirm password"
                            onChange={e => setConfirmPassword(e.target.value)}></input>}
                    <input type="submit" className="create" value={isLogin ? "Log in" : "Sign up"} onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')}></input>
                    {error && <p>{error}</p>}
                </form>
                <div className="auth-options">
                    <button
                        onClick={() => viewLogin(false)}
                        style={{ backgroundColor: !isLogin ? 'rgb(255,255,255)' : 'rgb(188,188,188)' }}>
                        Sign up
                    </button>
                    <button
                        onClick={() => viewLogin(true)}
                        style={{ backgroundColor: isLogin ? 'rgb(255,255,255)' : 'rgb(188,188,188)' }}>
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Auth;