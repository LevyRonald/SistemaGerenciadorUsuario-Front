<template>
  <b-row class="vh-100 vw-100">
    <b-col
      sm="5"
      class="d-flex justify-content-center align-items-center left-login"
      v-dark-mode
    >
      <div class="col-8 coluna-login">
        <h2 class="text-center mb-5 title-login">Login</h2>
        <validation-observer ref="observer">
          <b-form @submit.prevent="enviar">
            <validation-provider
              name="email"
              rules="required"
              #default="{ errors }"
            >
              <b-form-group label="Email" label-for="Email" class="mb-2 textos">
                <b-form-input
                  placeholder="Digite seu Email"
                  class="input shadow-none"
                  type="email"
                  aria-describedby="input-email-live-feedback"
                  v-dark-mode
                  required
                  :state="errors.length > 0 ? false : null"
                  v-model="usuario.email"
                >
                </b-form-input>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>

            <validation-provider
              name="senha"
              vid="Password"
              rules="required|password"
              #default="{ errors }"
            >
              <b-form-group label="Senha" label-for="Senha" class="mb-3 textos">
                <b-form-input
                  placeholder="Digite sua Senha"
                  class="input shadow-none"
                  type="password"
                  aria-describedby="input-2-live-feedback"
                  required
                  v-dark-mode
                  :state="errors.length > 0 ? false : null"
                  v-model="usuario.password"
                >
                </b-form-input>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
            <div class="pt-4 w-100 d-flex justify-content-center">
              <b-button type="submit" class="w-75 btn-enviar">
                <b-icon-door-open />Entrar
              </b-button>
            </div>
          </b-form>
        </validation-observer>
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
import password from '@/validations/validation'
export default {
  data() {
    return {
      password,
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
          localStorage.setItem("email", this.usuario.email);
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
.div-btn {
  width: 100%;
}
.btn-enviar {
  height: 35px;
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
@media screen and (max-width: 800px) {
  .left-login {
    width: 100vw;
    height: 100vh;
  }
  .coluna-imagem .img-login {
    width: 0;
    height: 0;
  }
}
</style>
