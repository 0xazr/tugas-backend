<template>
  <div class="flex justify-center w-full h-screen bg-neutral-100 text-neutral-200">
    <div class="w-1/2">

    </div>  
  </div>
</template>

<script>
import {useApp} from '../stores/index';
export default {
  data() {

  },
  setup() {
    const App = useApp();
    return {
      App,
    }
  },
  created() {
  }
}
</script>
