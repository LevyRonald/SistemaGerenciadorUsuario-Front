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
          <b-form-group label="Cargo" label-for="Cargo" class="mb-3 textos">
            <b-form-select
              placeholder="adicione um cargo de usuário"
              class="inputSelect shadow-none"
              v-dark-mode
              v-model="userData.roles"
              :options="option"
            ></b-form-select>
          </b-form-group>
          <div class="d-flex w-100 justify-content-between">
            <b-button @click="updateUser" type="button" class="btn-enviar">
              Salvar
            </b-button>
            <b-button
              @click="voltar"
              variant="outline-secondary"
              class="d-flex align-items-center"
              ><b-icon-arrow-left-short class="p-0 m-0" />voltar</b-button
            >
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
  data() {
    return {
      option: [
        { value: "admin", text: "admin" },
        { value: "user", text: "usuario" },
      ],
    };
  },
  methods: {
    updateUser() {
      this.$http
        .patch(`users/${this.$route.params.id}`, this.userData)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "tabela" });
          this.$swal({
            text: `usuário ${this.userData.name} atualizado com sucesso`,
            icon: "success",
            width: "300px",
            timerProgressBar: true,
            timer: 1500,
            showConfirmButton: false,
          });
        })
        .catch((erro) => {
          this.$swal({
            text: "faltam dados na sua requisição",
            icon: "error",
            width: "300px",
          });
          console.log(erro);
        });
    },
    voltar() {
      this.$router.push({ name: "tabela" });
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
.cardPrin.theme--dark {
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
.inputSelect {
  height: 5vh;
  width: 100%;
  border-radius: 5px;
}
.inputSelect.theme--dark {
  background-color: #17181a;
  color: white;
  box-shadow: none;
}
</style>