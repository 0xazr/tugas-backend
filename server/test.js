const axios = require('axios');

axios.post('/', {
    nama: 'Muhammad Azril',
    email: 'azril@mail.com',
})
.then(function (res) {
    console.log(res)
})