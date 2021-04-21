import React from 'react'
import './Login.css'
import GmailLogo from '../assets/gmail-logo.png'
import { Button } from '@material-ui/core'
import { auth, provider } from '../db/Firebase'
import { login } from '../features/userSlice'
import { useDispatch } from 'react-redux'

function Login() {

    const dispatch = useDispatch()

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then(({ user }) => {
                dispatch(
                    login({
                        displayName: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL
                    }))
            })
            .catch((error) => alert(error.message))
    }

    return (
        <div className='login'>
            <div className='login__container'>
                <img src={GmailLogo} alt='Gmail Logo...' />
                <Button
                    variant='contained'
                    color='primary'
                    onClick={signIn}>login</Button>
            </div>
        </div>
    )
}

export default Login
