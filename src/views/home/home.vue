<template>
  <div class="fundo">
    <navbar />
    <div class="d-flex align-items-center justify-content-center pt-4">
      <router-view />
    </div>
  </div>
</template>
<script>
import { SocketModule } from "@/socket/socketServer";
import navbar from "@/components/navbar/navbar.vue";
export default {
  data() {
    return {
      SocketService: SocketModule.connect(),
    };
  },
  components: {
    navbar,
  },
  async mounted() {
    await this.SocketService.registerListener(
      "is-logged",
      "is-logged",
      (UserEmail = this.email) => {
        this.$swal({
          position: "top-start",
          text: "Um usuário fez login",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
          width: "200px",
        });
      }
    );
  },
};
</script>
<style scoped>
.fundo {
  height: 100vh;
}
</style>
