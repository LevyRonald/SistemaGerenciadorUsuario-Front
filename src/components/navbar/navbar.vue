<template>
  <div>
    <b-navbar class="navbar shadow" v-dark-mode>
      <b-navbar-nav class="d-flex justify-content-between w-100">
        <nav class="d-flex align-items-center p-0">
          <b-nav-item to="inicio"
            ><p class="navbarTest m-0" v-dark-mode>ADMIN</p></b-nav-item
          >
        </nav>
        <div class="d-flex align-items-center">
          <div>
            <a @click="toggleDarkMode" style="cursor: pointer" v-if="switchMode"
              ><b-icon-sun
            /></a>
            <a @click="toggleDarkMode" style="cursor: pointer" v-else
              ><b-icon-moon
            /></a>
          </div>
          <b-nav-item to="inicio"
            ><p class="navbarTest m-0" v-dark-mode>Home</p></b-nav-item
          >
          <b-nav-item to="/home/cadastro" v-if="TESTER"
            ><p class="navbarTest m-0" v-dark-mode>Cadastrar</p></b-nav-item
          >
          <b-nav-item to="tabela"
            ><p class="navbarTest p-0 m-0" v-dark-mode>Usuarios</p></b-nav-item
          >
          <b-nav-item-dropdown
            toggle-class="d-flex align-items-center dropdown-user-link"
            right
          >
            <template #button-content>
              <div class="d-sm-flex d-none user-nav">
                <p class="user-name font-weight-bolder mb-0" v-dark-mode>
                  {{ user.name }}
                </p>
                <span class="user-status" v-dark-mode>{{user.roles}}</span>
              </div>
              <b-avatar
                variant="light-primary"
                badge
                class="badge-minimal"
                badge-variant="success"
                size="40"
                src="https://placekitten.com/300/300"
              ></b-avatar>
            </template>
            <b-dropdown-item>Conta</b-dropdown-item>
            <b-dropdown-item @click.prevent="Logout">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </div>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
import provedor from "@/provedor";
import { mapGetters } from 'vuex';
export default {
  
  data() {
    return {
      user: {
        name: "",
        email: "",
        roles: ""
      },
    };
  },
  mounted() {
    this.user = provedor.state.usuario;
  },
  methods: {
    Logout() {
      this.$store.commit("DESLOGAR_USUARIO");
      this.$router.push({ name: "login" });
    },
    toggleDarkMode: function () {
      this.$store.commit({ type: "toggleDarkMode" });
    },
  },
  computed: {
    ...mapGetters(["TESTER"]),
    switchMode() {
      return Boolean(this.$store.state.darkMode);
    },
  },
};
</script>
<style scoped>
.navbarTest.theme--dark {
  color: rgb(255, 255, 255) !important;
  padding: 0;
  margin: 0;
}
.navbar.theme--dark {
  background-color: #313336;
}
.user-name.theme--dark {
  color: rgb(255, 255, 255) !important;
}
.user-status.theme--dark {
  color: rgb(255, 255, 255) !important;
}
.user-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  float: left;
  margin-right: 4px;
}
.user-status {
  font-size: 12px;
}
</style>