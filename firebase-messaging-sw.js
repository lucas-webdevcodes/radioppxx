importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD-yPYD6KJatzNqp2V6Yjr6qQdEzqtBXw4",
  authDomain: "radiopx.firebaseapp.com",
  projectId: "radiopx",
  storageBucket: "radiopx.firebasestorage.app",
  messagingSenderId: "760442529866",
  appId: "1:760442529866:web:be4efd590a63334b7fdeb3"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || '📻 RadioPX', {
    body: body || 'Alguém está transmitindo na sua frequência!',
    icon: icon || '/icon.png',
    badge: '/icon.png',
    vibrate: [200, 100, 200],
    data: payload.data,
    actions: [{ action: 'open', title: 'Abrir RadioPX' }]
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
