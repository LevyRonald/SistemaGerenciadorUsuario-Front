<template>
    <usersEdit :user-data="userData"/>
</template>
<script>
import usersEdit from './editar.vue';
import { computed, ref } from "vue";
import router from '@/router';
import provedor from '@/provedor';
export default {
  components:{
    usersEdit
  },
  setup() {
    const userData = ref({})

    const userId = computed(() => router.currentRoute.params.id)

     provedor.dispatch('fetchUser', { id: userId.value })
     .then(response => { userData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          userData.value = undefined
        }
      })

    return {
      userData,
    }
  },

};
</script>
