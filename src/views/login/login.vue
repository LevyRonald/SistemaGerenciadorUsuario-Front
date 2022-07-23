<template>
  <b-row class="vh-100 vw-100">
    <b-col
      sm="5"
      class="d-flex justify-content-center align-items-center left-login"
      v-dark-mode
    >
      <div class="col-8 coluna-login">
        <h2 class="text-center mb-5 title-login">Login</h2>
        <b-form @submit.prevent="enviar">
          <b-form-group label="Email" label-for="Email" class="mb-2 textos">
            <b-form-input
              placeholder="Digite seu Email"
              class="input shadow-none"
              type="email"
              v-dark-mode
              required
              v-model="usuario.email"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group label="Senha" label-for="Senha" class="mb-3 textos">
            <b-form-input
              placeholder="Digite sua Senha"
              class="input shadow-none"
              type="password"
              required
              v-dark-mode
              v-model="usuario.password"
            >
            </b-form-input>
          </b-form-group>
          <b-button type="submit" class="w-100 btn-enviar">
            <b-icon-door-open />Entrar
          </b-button>
        </b-form>
      </div>
    </b-col>
    <b-col
      sm="7"
      class="d-flex justify-content-center align-items-center coluna-imagem"
    >
      <img src="@/assets/Login.svg" class="img-login" />
    </b-col>
  </b-row>
</template>
<script>
export default {
  data() {
    return {
      usuario: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    enviar() {
      this.$store
        .dispatch("efetuarLogin", this.usuario)
        .then((response) => {
          this.$router.push({ name: "home" }),
            setTimeout(() => {
              this.$swal({
                position: "top-start",
                text: "Usuário logado com sucesso",
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
                width: "200px",
              });
            }, 400);
        })
        .catch((error) => {
          this.$swal({
            position: "top-end",
            text: "Email ou senha incorreto",
            icon: "error",
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
            width: "200px",
          });
        });
    },
  },
};
</script>
<style scoped>
*, /*resetar o estilo da página*/
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

.row-login {
  margin-left: 0;
}

.left-login {
  background-color: #cad5ca;
}

.left-login.theme--dark {
  background-color: #313336;
}

.title-login {
  font-weight: bold;
}

.img-login {
  width: 600px;
  height: 600px;
}

.input {
  border-radius: 10px;
  padding: 3px;
  background-color: #f2f2f2;
  border-color: #6c63ff;
}

.btn-enviar {
  background-color: #6c63ff;
}

.textos {
  text-align: left;
}

.input.theme--dark {
  background-color: #17181a;
  color: white;
  border-color: #4a4d53;
}
</style>
