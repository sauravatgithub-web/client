import React from 'react'
import { Avatar, Stack, Typography } from '@mui/material'
import {Face as FaceIcon, AlternateEmail as UserNameIcon, CalendarMonth as CalendarIcon} from '@mui/icons-material'
import moment from 'moment';
import { transformImage } from '../../lib/features';

const Profile = ({ user }) => {
    return (
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
            <Avatar 
                src = {transformImage(user?.avatar?.url)}
                sx={{
                    width: 150,
                    height: 150,
                    objectFit: "contain",
                    marginBottom: "1rem",
                    border: "2px solid black",
                }}
            />
            <ProfileCard heading={"Bio"} text={user?.bio || "Hi, I am using Chat App"}/>
            <ProfileCard heading={"Username"} text={user?.username} icon={<UserNameIcon/>}/>
            <ProfileCard heading={"Name"} text={user?.name} icon={<FaceIcon/>}/>
            <ProfileCard heading={"Joined"} text={moment(user?.createdAt).fromNow()} icon={<CalendarIcon/>}/>
        </Stack>
    )
}

const ProfileCard = ({text, icon, heading}) => (
    <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        color={"white"}
        textAlign={"center"}
    >
        {icon && icon}

        <Stack>
            <Typography variant='body1'>{text}</Typography>
            <Typography color = "grey" variant='caption'>{heading}</Typography>
        </Stack>

    </Stack>
);

export default Profile
