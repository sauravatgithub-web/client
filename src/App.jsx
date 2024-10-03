import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loaders";
import axios from 'axios';
import { server } from '../src/components/constants/config'
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { Toaster } from 'react-hot-toast'
import { SocketProvider } from "./socket";
import { messaging } from './firebase/firebase'
import { getToken } from "firebase/messaging";
import { current } from "@reduxjs/toolkit";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLogin = lazy(() => import("./pages/admin/adminLogin"))
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManage = lazy(() => import("./pages/admin/UserManage"));
const ChatManage = lazy(() => import("./pages/admin/ChatManage"));
const MessageManage = lazy(() => import("./pages/admin/MessageManage"));

const App = () => {

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, {withCredentials: true})
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch])

  useEffect(() => {
    if(user) {
      Notification.requestPermission().then((permission) => {
        console.log(permission);
        if (permission === 'granted') {
          console.log("permission granted");
          getToken(messaging, {vapidKey: "BEvcuu81vqC2grRNhZdaoEf_tebfUcjmYLL4uxZrYqb_iY6XpSE6q1AjLaFL6OeCmuXMryM9b0LHJOCVKAaQY0I"}).then((currentToken) => {
            if (currentToken) {
              axios
                .post(`${server}/api/v1/user/savetoken`, {token: currentToken, user: user}, {withCredentials: true})
                .then(console.log("Token saved successfully"))
                .catch((err) => console.log(err));
            } else {
              // Show permission request UI
              console.log('No registration token available. Request permission to generate one.');
              // ...
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
          });
        }
      });
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Suspense fallback = {<LayoutLoader/>}>
        <Routes>
          <Route element = {
            <SocketProvider>
              <ProtectRoute user = {user}/> 
            </SocketProvider>
          }>
            <Route path = '/' element = {<Home/>}></Route>
            <Route path = '/chat/:chatId' element = {<Chat/>}></Route>
            <Route path = '/groups' element = {<Groups/>}></Route>
          </Route>
          <Route path = '/login' element = {
            <ProtectRoute user = {!user} redirect = "/">
              <Login/>
            </ProtectRoute>}>
          </Route>

          <Route path = '/admin' element = {<AdminLogin/>} />
          <Route path = '/admin/dashboard' element = {<Dashboard/>} />
          <Route path = '/admin/user-management' element = {<UserManage/>} />
          <Route path = '/admin/chat-management' element = {<ChatManage/>} />
          <Route path = '/admin/message-management' element = {<MessageManage/>} />


          <Route path = "*" element = {<NotFound/>} />
        </Routes>
      </Suspense>

      <Toaster position = "bottom-center" />
    </BrowserRouter>
  );
};

export default App;
