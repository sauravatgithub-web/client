import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Typography } from '@mui/material'

const Home = () => {
    return (
        <Typography p = {"2rem"} variant = "h6" textAlign = {"center"}>
            Select a friend to chat.
        </Typography>
    )
}

export default AppLayout()(Home);
