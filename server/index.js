import bodyParser from 'body-parser';
import express from 'express';
const app = express();
const port = 3000;

app.use(bodyParser.json());

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyCm6Oe6rBqTMdBmga_41QB9qQzrr3WJtJA',
  authDomain: 'ets-vue.firebaseapp.com',
  databaseURL: 'https://ets-vue-default-rtdb.firebaseio.com',
  projectId: 'ets-vue',
  storageBucket: 'ets-vue.appspot.com',
  messagingSenderId: '299657414646',
  appId: '1:299657414646:web:ab259b05082dcb45c769d7',
  measurementId: 'G-JFVNV7YNER',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  try {
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        let users = [];
        let id;
        querySnapshot.forEach((doc) => {
          id = doc.id;
          users.push({ id, ...doc.data() });
        });
        res.send(users);
      });
  } catch (error) {
    res.send(error);
  }
});

app.post('/users', (req, res) => {
  try {
    var nama = req.body.nama;
    var email = req.body.email;

    db.collection('users').add({
      nama: nama,
      email: email,
    });

    res.send({
      status: true,
      message: 'Data berhasil disimpan',
    });
  } catch (error) {
    res.send({
      status: false,
      message: 'Data gagal disimpan',
    });
  }
});

app.delete('/users/:id', (req, res) => {
  try {
    db.collection('users')
      .doc(req.params.id)
      .delete()
      .then(() => {
        res.send({
          status: true,
          message: 'Data berhasil dihapus',
        });
      });
  } catch (error) {
    res.send({
      status: false,
      message: 'Data gagal dihapus',
    });
  }
});

app.patch('/users/:id', (req, res) => {
  try {
    db.collection('users')
      .doc(req.params.id)
      .update({
        nama: req.body.nama,
        email: req.body.email,
      })
      .then(() => {
        res.send({
          status: true,
          message: 'Data berhasil diubah',
        });
      });
  } catch (error) {
    res.send({
      status: false,
      message: 'Data gagal diubah',
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
