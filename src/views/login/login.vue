<template>
    <b-row class="vh-100 vw-100">
    <b-col
      sm="5"
      class="d-flex justify-content-center align-items-center left-login"
    >
      <div class="col-8 coluna-login">
        <h2 class="text-center mb-5 title-login">Login</h2>
        <b-form @submit.prevent="enviar">
          <b-form-group label="Email" label-for="Email" class="mb-2 textos">
            <b-form-input
              placeholder="Digite seu Email"
              class="input shadow-none"
              type="email"
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
              v-model="usuario.password"
            >
            </b-form-input>
          </b-form-group>
          <b-button type="submit" class="w-100 btn-enviar">
             <b-icon-door-open/>Entrar
          </b-button>
        </b-form>
      </div>
    </b-col>
    <b-col sm="7" class="d-flex justify-content-center align-items-center coluna-imagem">
      <img src="@/assets/Login.svg" class="img-login" />
    </b-col>
  </b-row>
</template>
<script>
export default{
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
      this.$http
        .post("/login", this.usuario)
        .then((response) => {
          console.log(response);
          localStorage.setItem("token", response.data.access_token);
          this.$router.push({ name: "home" });
        })
        .catch((erro) => console.log(erro));
    },
  },
}
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
  background-color: #CAD5CA;
}
 
.title-login {
  font-weight: bold;
}

.img-login {
  width: 600px;
  height: 600px;
}

.input{
  border-radius: 10px;
  padding: 3px;
  background-color: #f2f2f2;
  border-color: #6C63FF;
  }

.btn-enviar{
  background-color: #6C63FF;
}

.textos{
    text-align: left;
}

</style>
