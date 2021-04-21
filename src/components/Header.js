import React from 'react'
import './Header.css'
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, Avatar } from '@material-ui/core';
import GmailLogo from '../assets/gmail-logo.png'
import SearchIcon from '@material-ui/icons/Search';
import { ArrowDropDown } from '@material-ui/icons';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import { auth } from '../db/Firebase';

function Header() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(logout())
        })
    }
    return (
        <div className='header'>
            <div className='header__left'>
                <IconButton>
                    <MenuIcon />
                </IconButton>
                <img
                    src={GmailLogo}
                    alt='Gmail Logo...'
                />
            </div>
            <div className='header__middle'>
                <SearchIcon />
                <input type='text' placeholder='Search mail' />
                <ArrowDropDown className='header__inputCaret' />

            </div>
            <div className='header__right'>
                <IconButton>
                    <AppsIcon />
                </IconButton>
                <IconButton>
                    <NotificationsIcon />
                </IconButton>
                <Avatar
                    src={user?.photoUrl}
                    onClick={signOut}
                    className='user__avatar'
                />
            </div>
        </div>
    )
}

export default Header
