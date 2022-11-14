import { defineStore } from "pinia";
import axios from "axios";

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
        axios.get('http://127.0.0.1:3000/users')
          .then((response) => {
            this.users = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
      },
      async addUser(user) {
        await axios.post('http://127.0.0.1:3000/users', {
          nama: user.name,
          email: user.email
        });
        this.input.user.name = '';
        this.input.user.email = '';
        this.getUsers();
      },
      async deleteUser(user_id) {
        await axios.delete('http://127.0.0.1:3000/users/' + user_id);
        this.getUsers();
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
        await axios.patch('http://127.0.0.1:3000/users/' + user.id, user);
        this.getUsers();
        this.closeEditUserMenu();
      }
    },
});