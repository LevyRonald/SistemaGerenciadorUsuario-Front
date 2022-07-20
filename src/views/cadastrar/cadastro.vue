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
              required
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
              required
              v-dark-mode
              v-model="usuariosCadastrados.email"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group label="Senha" label-for="Senha" class="mb-3 textos">
            <b-form-input
              placeholder="Senha do Usuário"
              class="input shadow-none"
              type="password"
              required
              v-dark-mode
              v-model="usuariosCadastrados.password"
            >
            </b-form-input>
          </b-form-group>
          <div class="d-flex justify-content-between">
            <b-button type="submit" class="btn-enviar">
              cadastrar
            </b-button>
            <b-button type="reset" variant="danger">Limpar</b-button>
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
      },
    };
  },
  methods: {
    enviar() {
      this.$http
        .post("/users/adicionar", this.usuariosCadastrados)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "tabela" });
        })
        .catch((erro) => console.log(erro));
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
}
.input.theme--dark{
  background-color: #17181a;
  color: white;
  border-color: #4a4d53;
}
</style>
