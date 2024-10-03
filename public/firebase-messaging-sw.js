// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyB68sCiz0u_YGGxdqfuMWDKNxF-ALaxOKo",
    authDomain: "projectchat-43ba7.firebaseapp.com",
    projectId: "projectchat-43ba7",
    storageBucket: "projectchat-43ba7.appspot.com",
    messagingSenderId: "739632301473",
    appId: "1:739632301473:web:f969d37c22bf3f9f79b7e0",
    measurementId: "G-SWZJ6FSTZW"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
});

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
