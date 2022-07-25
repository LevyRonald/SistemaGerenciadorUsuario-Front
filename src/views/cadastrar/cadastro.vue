<template>
  <b-card no-body class="cardPrin shadow" v-dark-mode>
    <b-col class="w-100 d-flex align-items-center justify-content-center">
      <div>
        <h2 class="text-center mb-5 title-login">Cadastrar Usuário</h2>
        <b-form @submit.prevent="enviar">
          <b-form-group label="Nome" label-for="Nome" class="mb-2 textos">
            <b-form-input
              placeholder="Nome do usuário"
              class="input shadow-none"
              type="text"
              v-dark-mode
              v-model="usuariosCadastrados.name"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group label="Email" label-for="Email" class="mb-2 textos">
            <b-form-input
              placeholder="Email do usuário"
              class="input shadow-none"
              type="email"
              v-dark-mode
              v-model="usuariosCadastrados.email"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group label="Senha" label-for="Senha" class="mb-2 textos">
            <b-form-input
              placeholder="Senha do Usuário"
              class="input shadow-none"
              type="password"
              v-dark-mode
              v-model="usuariosCadastrados.password"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group label="Cargo" label-for="Cargo" class="mb-3 textos">
              <b-form-select
              placeholder="adicione um cargo de usuário"
              class="inputSelect shadow-none"
              v-dark-mode
              :options="option"
              v-model="usuariosCadastrados.roles"
              ></b-form-select>
            </b-form-group>
          <div class="d-flex justify-content-between">
            <b-button type="submit" class="btn-enviar">
              cadastrar
            </b-button>
            <b-button type="reset" variant="outline-danger">Limpar</b-button>
          </div>
        </b-form>
      </div>
    </b-col>
  </b-card>
</template>
<script>
export default {
  data() {
    return {
      usuariosCadastrados: {
        name: "",
        email: "",
        password: "",
        roles: ""
      },
      option: [
        { value: "admin", text: "admin" },
        { value: "user", text: "usuario" }
      ]
    };
  },
  methods: {
    enviar() {
      this.$http
        .post("/users/adicionar", this.usuariosCadastrados)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "tabela" });
          this.$swal({
            text: "usuário cadastrado com sucesso",
            icon: "success",
            width: "300px",
            timerProgressBar: true,
            timer: 1000,
            showConfirmButton: false, 
          })
        })
        .catch((erro) => {
          this.$swal({
            text: "error"
          })
          console.log(erro)
          });
    },
  },
};
</script>
<style scoped>
.cardPrin {
  width: 50%;
  border-radius: 20px;
  padding: 20px;
}
.cardPrin.theme--dark{
  background-color: #313336;
}
.btn-enviar {
  background-color: #6c63ff;
  border-color: #6c63ff;
}
.input.theme--dark{
  background-color: #17181a;
  color: white;
  border-color: #4a4d53;
}
.inputSelect{
  height: 5vh;
  width: 100%;
  border-radius: 5px;
}
.inputSelect.theme--dark{
  background-color: #17181a;
  color: white;
  box-shadow: none;
}
</style>
