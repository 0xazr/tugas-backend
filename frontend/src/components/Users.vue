<template>
    <div>
        <div class="flex justify-center w-full h-screen bg-neutral-200 text-neutral-900">
            <div class="m-9 p-9 w-full bg-neutral-50 shadow-lg">
                <h1 class="font-bold text-2xl">List Users</h1>
                <h1 class="text-sm"></h1>
        
                <div class="overflow-x-auto relative">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">
                                    Name
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Email
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in App.users" :key="user.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{user.nama}}
                                </th>
                                <td class="py-4 px-6">
                                    {{user.email}}
                                </td>
                                <td>
                                    <span @click="App.showEditUserMenu(user.id)" class="material-symbols-outlined mr-3 cursor-pointer">
                                        edit
                                    </span>
                                    <span @click="App.deleteUser(user.id)" class="material-symbols-outlined text-red-700 cursor-pointer">
                                        delete
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>  
        </div>
        <transition>
            <EditUser v-show="this.App.menu.edit_user.show"/>
        </transition>
    </div>
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>

<script>
import {useApp} from '../stores/index';
import EditUser from './EditUser.vue';
export default {
    setup() {
      const App = useApp();
      return {
        App,
      }
    },
    components: {
        EditUser,
    },
    created() {
        this.App.getUsers();
    }
  }
</script>
  