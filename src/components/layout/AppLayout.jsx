import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from './Header';
import Title from '../shared/Title';
import { Drawer, Grid, Skeleton } from '@mui/material';
import ChatList from '../specefic/ChatList'
import Profile from '../specefic/Profile'
import { useNavigate, useParams } from 'react-router-dom';
import { useMyChatsQuery } from '../../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducers/misc';
import { useErrors, useSocketEvents } from '../../hooks/hooks';
import { getSocket } from '../../socket';
import { ALERT, NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../constants/events';
import { incrementNotification, setNewMessagesAlert } from '../../redux/reducers/chat';
import { getOrSaveFromStorage } from '../../lib/features';
import DeleteChatMenu from '../dialogues/DeleteChatMenu';

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const params = useParams();
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const socket = getSocket();

        const chatId = params.chatId;
        const deleteMenuAnchor = useRef(null); 
        const [onlineUsers, setOnlineUsers] = useState([]);

        const { isMobile } = useSelector((state) => state.misc);
        const { user } = useSelector((state) => state.auth);
        const { newMessagesAlert } = useSelector((state) => state.chat);
        const {isLoading, data, isError, error, refetch} = useMyChatsQuery("");

        useErrors([{ isError, error }]);

        useEffect(() => {
            getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })
        }, [newMessagesAlert])

        const handleDeleteChat = (e, id, groupChat) => {
            e.preventDefault();
            deleteMenuAnchor.current = e.currentTarget;
            dispatch(setIsDeleteMenu(true));
            dispatch(setSelectedDeleteChat({ id, groupChat }));
        }

        const handleMobileClose = () => dispatch(setIsMobile(false));

        const newMessagesAlertHandler = useCallback((data) => {
            if(data.chatId === chatId) return;
            dispatch(setNewMessagesAlert(data));
        }, [chatId]);

        const newRequestHandler = useCallback(() => {
            dispatch(incrementNotification());
        }, [dispatch]);

        const refetchListener = useCallback(() => {
            refetch();
            navigate('/');
        },[refetch, navigate])

        const onlineUsersListener = useCallback((data) => {
            setOnlineUsers(data);
        }, [dispatch]);

        const sendAlert = useCallback(() => console.log("You are added to a new group."))

        const eventHandlers = { 
            [ALERT]: sendAlert,
            [REFETCH_CHATS]: refetchListener,
            [NEW_MESSAGE_ALERT]: newMessagesAlertHandler,
            [NEW_REQUEST]: newRequestHandler,
            [ONLINE_USERS]: onlineUsersListener,
        };
        useSocketEvents(socket, eventHandlers);

        return (
            <>  
                <Title/>
                <Header/>

                <DeleteChatMenu dispatch = {dispatch} deleteMenuAnchor={deleteMenuAnchor}/>

                {isLoading ? (
                    <Skeleton />
                ) : (
                    <Drawer open = {isMobile} onClose={handleMobileClose}>
                        <ChatList 
                            w="70vw"
                            chats = {data?.chats} 
                            chatId = {chatId}
                            handleDeleteChat={handleDeleteChat}
                            newMessagesAlert={newMessagesAlert}
                            onlineUsers={onlineUsers}
                        />
                    </Drawer>
                )}

                <Grid container height="calc(100vh - 4rem)">
                    <Grid item sm={4} md={3} sx={{ display: { xs: "none", sm: "block" } }} height="100%">
                        {
                            isLoading ? (<Skeleton />) : (
                                <ChatList 
                                    chats = {data?.chats} 
                                    chatId = {chatId}
                                    handleDeleteChat={handleDeleteChat}
                                    newMessagesAlert={newMessagesAlert}
                                    onlineUsers={onlineUsers}
                                />
                            )
                        }
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height="100%">
                        <WrappedComponent {...props} chatId = {chatId} user = {user}/>
                    </Grid>
                    <Grid item md={4} lg={3} sx={{ display: { xs: "none", sm: "block" }, padding: "2rem", bgcolor: "rgba(0, 0, 0, 0.85)" }} height="100%">
                        <Profile user = {user}/>
                    </Grid>
                </Grid>
            </>
        );
    };
};

export default AppLayout
