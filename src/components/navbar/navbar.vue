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
          <b-nav-item to="/home/cadastro"
            ><p class="navbarTest m-0" v-dark-mode>Cadastrar</p></b-nav-item
          >
          <b-nav-item to="tabela"
            ><p class="navbarTest p-0 m-0" v-dark-mode>Usuários</p></b-nav-item
          >
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-avatar
                badge
                badge-variant="success"
                size="30px"
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
export default {
  methods: {
    Logout() {
      this.$store.commit("DESLOGAR_USUARIO");
      this.$router.push({ name: "login" });
    },
    toggleDarkMode: function () {
      //chamada do metodo no toggleDarkMode criado no Vuex
      this.$store.commit({ type: "toggleDarkMode" });
    },
  },
  computed: {
    switchMode(){
      return Boolean(this.$store.state.darkMode)
    }
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
</style>