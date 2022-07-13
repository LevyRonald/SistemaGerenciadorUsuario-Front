<template>
  <div>
    <b-navbar type="dark"  class="navbar">
      <b-navbar-nav class="d-flex justify-content-between w-100">
        <nav class="d-flex align-items-center p-0">
          <b-nav-item to="inicio">ADMIN</b-nav-item>
        </nav>
        <div class="d-flex align-items-center">
          <b-nav-item to="inicio">home</b-nav-item>
          <b-nav-item to="/home/cadastro">cadastrar</b-nav-item>
          <b-nav-item to="tabela">usuários</b-nav-item>
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon icon="people-fill" aria-hidden="true"></b-icon>
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
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<style scoped>
.navbar{
    background-color: #140F2D;
}
</style>