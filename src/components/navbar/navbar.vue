<template>
  <div>
    <b-navbar class="navbar shadow" v-dark-mode toggleable="lg">
      <b-navbar-brand href="#" class="elements-togle"
        ><p class="navbarTest m-0 p-0" v-dark-mode>
          <img src="../../assets/navbarImage.png" title="Aqui você também pode alterar o tema" @click="toggleDarkMode"  class="imgnav" /></p
      ></b-navbar-brand>
      <div class="d-sm-flex user-nav elements-none">
        <p class="user-name font-weight-bolder mb-0" v-dark-mode>
          {{ user.name }}
        </p>
        <span class="user-status" v-dark-mode>{{ user.roles }}</span>
      </div>
      <div class="d-flex align-items-center w-25 justify-content-between">
      <div class="elements-none" v-dark-mode>
            <a
              @click="toggleDarkMode"
              style="cursor: pointer"
              v-if="switchMode"
              class=" navbarTest"
              v-dark-mode
              ><b-icon-sun
            /></a>
            <a @click="toggleDarkMode" class="" style="cursor: pointer" v-else
              ><b-icon-moon /></a
          ></div>
      <b-navbar-toggle :class="burgerToggle" target="nav-collapse"></b-navbar-toggle>
      </div>

      <b-collapse class="flex-row-reverse" id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto elements-togle">
          <b-nav-item-dropdown
            toggle-class="d-flex align-items-center dropdown-user-link"
            right
            no-caret
          >
            <template #button-content>
              <div class="d-sm-flex d-none user-nav">
                <p class="user-name font-weight-bolder mb-0" v-dark-mode>
                  {{ user.name }}
                </p>
                <span class="user-status" v-dark-mode>{{ user.roles }}</span>
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
            <b-dropdown-item :to="{ path: `/home/editar/${user._id}` }">Conta</b-dropdown-item>
            <b-dropdown-item @click.prevent="Logout">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item v-dark-mode>
            <a
              @click="toggleDarkMode"
              style="cursor: pointer"
              v-if="switchMode"
              class=" elements-togle navbarTest p-0 m-0"
              v-dark-mode
              ><b-icon-sun
            /></a>
            <a @click="toggleDarkMode" class="elements-togle" style="cursor: pointer" v-else
              ><b-icon-moon /></a
          ></b-nav-item>
          <b-nav-item to="inicio"
            ><p class="navbarTest m-0" v-dark-mode>Home</p></b-nav-item
          >
          <b-nav-item to="/home/cadastro" v-if="TESTER"
            ><p class="navbarTest m-0" v-dark-mode>Cadastrar</p></b-nav-item
          >
          <b-nav-item to="tabela"
            ><p class="navbarTest p-0 m-0" v-dark-mode>Usuarios</p></b-nav-item
          >
          <b-dropdown-divider class="elements-none"></b-dropdown-divider>
          <b-nav-item class="elements-none" :to="{ path: `/home/editar/${user._id}` }"
            ><p class="navbarTest m-0" v-dark-mode>Conta</p></b-nav-item
          >
          <b-nav-item class="elements-none" @click.prevent="Logout"
            ><p class="navbarTest m-0" v-dark-mode>Sair</p></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
  <!-- <div>
    <b-navbar class="navbar shadow" v-dark-mode>
      <b-navbar-nav class="d-flex justify-content-between w-100">
        <nav class="d-flex align-items-center p-0">
          <b-nav-item to="inicio"
            ><p class="navbarTest m-0" v-dark-mode><img src="../../assets/navbarImage.png" class="imgnav"></p></b-nav-item
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
            no-caret
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
  </div> -->
</template>
<script>
import provedor from "@/provedor";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {
        _id: "",
        name: "",
        email: "",
        roles: "",
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
    burgerToggle(){
      return this.switchMode ? "navbar-dark" : "navbar-light";
    }
  },
};
</script>
<style scoped>
.imgnav {
  height: 50px;
}
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
.elements-none {
  display: none !important;
}
.elements-none.theme--dark {
  color: rgb(255, 255, 255) !important;
}
@media screen and (max-width: 800px) {
  .elements-togle {
    display: none;
  }
  .elements-none {
    display: block !important;
  }
  .elements-none.theme--dark {
    color: rgb(255, 255, 255) !important;
  }
}
</style>