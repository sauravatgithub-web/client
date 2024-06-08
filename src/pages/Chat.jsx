import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { greyColor, orange } from '../components/constants/color';
import { AttachFile as AttachFileButton, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialogues/FileMenu';
import MessageComponent from '../components/shared/MessageComponent'
import { getSocket } from '../socket';
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../components/constants/events.js';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api.js';
import { useErrors, useSocketEvents } from '../hooks/hooks.jsx';
import { useInfiniteScrollTop } from '6pp';
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../redux/reducers/misc.js';
import { removeNewMessagesAlert } from '../redux/reducers/chat.js';
import { TypingLoader } from '../components/layout/Loaders.jsx';
import { useNavigate } from 'react-router-dom';

const Chat = ({ chatId, user }) => {
    const bottomRef = useRef(null);
    const containerRef = useRef(null);
    const socket = getSocket();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]); 
    const [page, setPage] = useState(1);
    const [fileMenuAnchor, setFileMenuAnchor] = useState(null)

    const [IamTyping, setIamTyping] = useState(false);
    const [userTyping, setUserTyping] = useState(false);
    const typingTimeOut = useRef(null);

    const chatDetails = useChatDetailsQuery({chatId, skip: !chatId});
    const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

    const {data: oldMessages, setData: setOldMessages} = useInfiniteScrollTop (
        containerRef, oldMessagesChunk.data?.totalPages, page, setPage, 
        oldMessagesChunk.data?.messages
    )

    const errors = [
        { isError: chatDetails.isError, error: chatDetails.error },
        { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error }
    ]

    const members = chatDetails?.data?.chat?.members;

    const messageOnChange = (e) => {
        setMessage(e.target.value);

        if(!IamTyping) { 
            socket.emit(START_TYPING, {members, chatId});
            setIamTyping(true);
        }

        if(typingTimeOut.current) clearTimeout(typingTimeOut.current);

        typingTimeOut.current = setTimeout(() => {
            socket.emit(STOP_TYPING, { members, chatId });
            setIamTyping(false);
        }, 2000)
    }

    const handleFileOpen = (e) => {
        dispatch(setIsFileMenu(true));
        setFileMenuAnchor(e.currentTarget);
    }

    const sendHandler = (e) => {
        e.preventDefault();
        if(!message.trim()) return;

        socket.emit(NEW_MESSAGE, { chatId, members, message });
        setMessage("");
    }

    useEffect(() => {
        socket.emit(CHAT_JOINED, { userId: user._id, members })
        dispatch(removeNewMessagesAlert(chatId));
        return () => {
            setMessages([]);
            setMessage("");
            setOldMessages([]);
            setPage(1);
            socket.emit(CHAT_LEAVED, { userId: user._id, members })
        };
    }, [chatId])

    useEffect(() => {
        if(bottomRef.current) bottomRef.current.scrollIntoView({ behaviour: "smooth" });
    }, [messages])

    useEffect(() => {
        if(chatDetails.isError) return navigate('/');
    }, [chatDetails.isError])

    const newMessageHandler = useCallback((data) => {
        if(data.chatId !== chatId) return;
        setMessages((prev) => [...prev, data.message]);
    }, [chatId])

    const startTypingListener = useCallback((data) => {
        if(data.chatId !== chatId) return;
        setUserTyping(true);
    }, [chatId])

    const stopTypingListener = useCallback((data) => {
        if(data.chatId !== chatId) return;
        setUserTyping(false);
    }, [chatId])

    const alertListener = useCallback((data) => {
        if(data.chatId !== chatId) return;
        const messageForAlert = {
            content: data.message,
            sender: {
                _id: "svreuighnwigtuhbnhsdfyhi",
                name: "Admin",
            },
            chat: chatId,
            createdAt: new Date().toISOString()
        };

        setMessages((prev) => [...prev, messageForAlert]);
    })

    const eventHandler = { 
        [ALERT]: alertListener,
        [NEW_MESSAGE]: newMessageHandler ,
        [START_TYPING]: startTypingListener,
        [STOP_TYPING]: stopTypingListener
    };
    useSocketEvents(socket, eventHandler);

    useErrors(errors);

    const allMessages = [...oldMessages, ...messages];

    return chatDetails.isLoading ? <Skeleton/> :  (
        <Fragment>
            <Stack 
                ref = {containerRef}
                boxSizing = {"border-box"}
                padding = {"1rem"}
                spacing = {"1rem"}
                bgcolor={greyColor}
                height={"90%"}
                sx = {{
                    overflowX: "hidden",
                    overFlowY: "auto"
                }}
            >
                
                {
                    allMessages.map((item) => (
                        <MessageComponent key = {item._id} message = {item} user = {user} />
                    ))
                }

                {userTyping && <TypingLoader/>}
                <div ref = {bottomRef}/>

            </Stack>

            <form style = {{height: "10%"}} onSubmit={sendHandler}>
                <Stack height = {"100%"} direction={"row"} padding = {"1rem"} alignItems = {"center"} position = {"relative"}>
                    <IconButton
                        sx = {{
                            position: "absolute",
                            left: "1.5rem",
                            rotate: "30deg",
                        }}
                        onClick = {handleFileOpen}
                    >
                    <AttachFileButton/></IconButton>
                    <InputBox name = "textMessage" height = "100%" placeholder='Type message here ...' value = {message} onChange = {messageOnChange}/>
                    <IconButton 
                        type = "submit"
                        sx = {{
                            rotate: "-20deg",  
                            bgcolor: orange,
                            color: "white",
                            marginLeft: "1rem",
                            padding: "0.5rem",
                            "&:hover": {
                                bgcolor: "error.dark",
                            }
                        }}
                    >
                    <SendIcon/></IconButton>
                </Stack>
            </form>

            <FileMenu anchorE1={fileMenuAnchor} chatId = {chatId} />
        </Fragment>
    )
}

export default AppLayout()(Chat)
