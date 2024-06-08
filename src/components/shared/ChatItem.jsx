import React, { memo } from 'react';
import { Link } from '../styles/StyledComponents';
import { Box, Stack, Typography } from '@mui/material';
import AvatarCard from './AvatarCard';
import { motion } from 'framer-motion';

const ChatItem = ({
    index = 0, 
    newMessageAlert,
    isOnline,
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    handleDeleteChat
}) => {
    console.log(newMessageAlert);
    return (
        <Link 
            sx={{ padding: "0" }}
            to={`/chat/${_id}`}
            onContextMenu={(e) => {
                e.preventDefault()
                let id = _id;
                handleDeleteChat(e, id, groupChat)
            }}
        >
            <div 
                // initial={{ opacity: 0, y: "-100%" }}
                // whileInView={{ opacity: 1, y: 0 }}
                // transition={{ delay: index * 0.1 }}
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    padding: "1rem",
                    backgroundColor: sameSender ? "black" : "unset",
                    color: sameSender ? "white" : "black",
                    position: "relative"
                }}
            >
                <AvatarCard avatar={avatar} />
                <Stack>
                    <Typography>{name}</Typography>
                    {newMessageAlert?.count && (
                        <Typography>{newMessageAlert.count} New Message</Typography>
                    )}
                </Stack>
                {isOnline && (
                    <Box sx={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "green",
                        position: "absolute",
                        top: "50%",
                        right: "1rem",
                        transform: "translateY(-50%)",
                    }} />
                )}
            </div>
        </Link>
    );
}

export default memo(ChatItem);
