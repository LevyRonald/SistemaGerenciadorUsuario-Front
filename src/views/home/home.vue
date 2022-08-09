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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      SocketService: SocketModule.connect(),
    };
  },
  components: {
    navbar,
  },
  computed: {
    ...mapGetters(["EMAILUSER"]),
  },
  async mounted() {
    const sessionUser = localStorage.getItem("email");
    await this.SocketService.registerListener(
      "is-logged",
      "is-logged",
      (data) => {
        if (sessionUser == this.EMAILUSER) {
          localStorage.clear()
           this.$store.commit("DESLOGAR_USUARIO");
          this.$router.push({ name: "login" });
          this.$swal({
            text: "usuario ja logado",
          });
        }
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