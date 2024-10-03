import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const fireBaseConfig = {
    apiKey: "AIzaSyB68sCiz0u_YGGxdqfuMWDKNxF-ALaxOKo",
    authDomain: "projectchat-43ba7.firebaseapp.com",
    projectId: "projectchat-43ba7",
    storageBucket: "projectchat-43ba7.appspot.com",
    messagingSenderId: "739632301473",
    appId: "1:739632301473:web:f969d37c22bf3f9f79b7e0",
    measurementId: "G-SWZJ6FSTZW"
};

const app = initializeApp(fireBaseConfig);
const messaging = getMessaging(app);

export { messaging };

