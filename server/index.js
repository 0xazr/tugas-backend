import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { body, validationResult } from 'express-validator';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyBgZYJoUhN2if_IeCB-RQB2Hz_yV_ZCfV8',
  authDomain: 'simple-todo-app-c5a3b.firebaseapp.com',
  projectId: 'simple-todo-app-c5a3b',
  storageBucket: 'simple-todo-app-c5a3b.appspot.com',
  messagingSenderId: '740962103721',
  appId: '1:740962103721:web:d847f722b57dc69d2894b8',
  measurementId: 'G-J6X7HZLJ46',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const email = 'admin@tutorial-backend.gov';
const password = 's3cretp4ssw0rd';

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

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

app.post('/users', body('email').isEmail(), (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
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
