<template>
  <b-card no-body class="cardPrin shadow" v-dark-mode>
    <b-col class="w-100 d-flex align-items-center justify-content-center">
      <div>
        <h2 class="text-center mb-5 title-login">Atualizar Usuário</h2>
        <b-form>
          <b-form-group label="Nome" label-for="Nome" class="mb-2">
            <b-form-input
              class="input shadow-none"
              v-dark-mode
              v-model="userData.name"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Email" label-for="Email" class="mb-2">
            <b-form-input
              class="input shadow-none"
              type="email"
              v-dark-mode
              v-model="userData.email"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Senha" label-for="Senha" class="mb-2">
            <b-form-input
              class="input shadow-none"
              type="password"
              v-dark-mode
              v-model="userData.password"
            ></b-form-input>
          </b-form-group>
          <div class="d-flex w-100 justify-content-between">
            <b-button @click="updateUser" type="button" class="btn-enviar">
            Salvar
          </b-button>
          <b-button @click="voltar" variant="outline-secondary" class="d-flex align-items-center"><b-icon-arrow-left-short class="p-0 m-0"/>voltar</b-button>
          </div>
        </b-form>
      </div>
    </b-col>
  </b-card>
</template>
<script>
export default {
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateUser() {
      this.$http
        .patch(`users/${this.$route.params.id}`, this.userData)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "tabela" });
        })
        .catch((erro) => console.log(erro));
    },
    voltar(){
      this.$router.push({ name: "tabela" });
    }
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
.input.theme--dark {
  background-color: #17181a;
  color: white;
  border-color: #4a4d53;
}
</style>