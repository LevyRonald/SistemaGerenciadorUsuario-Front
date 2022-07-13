<template>
  <div class="fundo">
    <navbar />
    <div class="d-flex align-items-center justify-content-center pt-4">
      <router-view/>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/navbar/navbar.vue";
import users from "@/views/tabela/users.vue";
import inicio from "@/components/inicio/inicio.vue"

export default {
  components: {
    navbar,
    users,
    inicio
  },
};
</script>
<style scoped>
.fundo {
  background-color: #5b635b8f;
  height: 100vh;
}
</style>
