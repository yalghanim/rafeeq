import firebase from 'firebase';

class Backend {
  uid = '';
  messagesRef = null;

  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyDisbHYhw_VKwvHR1f7G3FTS3Kzrs6gWm0",
       authDomain: "rafeeq-f92c5.firebaseapp.com",
       databaseURL: "https://rafeeq-f92c5.firebaseio.com",
       projectId: "rafeeq-f92c5",
       storageBucket: "rafeeq-f92c5.appspot.com",
       messagingSenderId: "629639249481"
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid);
      } else {
        firebase.auth().signInAnonymously().catch((error) => {
          alert(error.message);
        });
      }
    });
  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }

  loadMessages(callback) {
    this.messagesRef = firebase.database().ref('messages');
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      console.log(message);
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }

  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }

  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();
