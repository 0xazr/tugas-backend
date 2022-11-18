import { defineStore } from "pinia";
import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
} from "firebase/firestore";
import Swal from 'sweetalert2';

const firebaseConfig = {
  apiKey: "AIzaSyBgZYJoUhN2if_IeCB-RQB2Hz_yV_ZCfV8",
  authDomain: "simple-todo-app-c5a3b.firebaseapp.com",
  projectId: "simple-todo-app-c5a3b",
  storageBucket: "simple-todo-app-c5a3b.appspot.com",
  messagingSenderId: "740962103721",
  appId: "1:740962103721:web:d847f722b57dc69d2894b8",
  measurementId: "G-J6X7HZLJ46"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const useApp = defineStore({
    id: "App",
    state: () => ({
      users: [],
      menu: {
        edit_user: {
          show: false,
          data: {},
        }
      },
      input: {
        user: {}
      }
    }),
    actions: {
      async getUsers() {
        onSnapshot(collection(db, "users"), (querySnapshot) => {
          let users = [];
          querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
          });
          this.users = users;
        },
        error => {
          Swal.fire({
            title: 'Error!',
            text: `Seems like there is an error while connecting to Firestore<br>${error}`,
            icon: 'error',
            confirmButtonText: 'Cool'
          });
        }
        );
      },
      async addUser(user) {
        await axios.post('http://127.0.0.1:3000/users', {
          nama: user.name,
          email: user.email
        })
        .then((response) => {
          if(response.status) {
            Swal.fire({
              title: 'Success!',
              text: `Succesesfully added user ${user.name}`,
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });
          }
        }, (error) => {
          Swal.fire({
            title: 'Error!',
            text: `Seems like there is an error while adding user ${user.name}<br>${error}`,
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
          });
        });
        this.input.user.name = '';
        this.input.user.email = '';
      },
      async deleteUser(user_id) {
        await axios.delete('http://127.0.0.1:3000/users/' + user_id)
        .then((response) => {
          if(response.status) {
            Swal.fire({
              title: 'Success!',
              text: `Succesesfully delete user ${this.users.find(user => user.id === user_id).nama}`,
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });
          }
        }, (error) => {
          Swal.fire({
            title: 'Error!',
            text: `Seems like there is an error while deleting user ${this.users.find(user => user.id === user_id).nama}<br>${error}`,
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
          });
        }
        );
      },
      showEditUserMenu(user_id) {
        let user = this.users.find(user => user.id === user_id);
        this.menu.edit_user.data = {
          id: user.id,
          nama: user.nama,
          email: user.email,
        };
        this.menu.edit_user.show = true;
      },
      closeEditUserMenu() {
        this.menu.edit_user.data = {};
        this.menu.edit_user.show = false;
      },
      async editUser(user) {
        await axios.patch('http://127.0.0.1:3000/users/' + user.id, user)
        .then((response) => {
          if(response.status) {
            Swal.fire({
              title: 'Success!',
              text: `Succesesfully update user ${user.nama}`,
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });
          }
        }, (error) => {
          Swal.fire({
            title: 'Error!',
            text: `Seems like there is an error while updating user ${user.nama}<br>${error}`,
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
          });
        });
        this.closeEditUserMenu();
      }
    },
});