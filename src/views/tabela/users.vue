<template>
  <div class="container">
    <b-card no-body class="mb-2 cardprin shadow" v-dark-mode>
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <div class="d-flex flex-column">
              <div class="d-flex align-items-center">
                <b-icon icon="people-fill" aria-hidden="true"></b-icon>
                <strong>Usuários</strong>
              </div>
            </div>
          </b-col>
          <b-col cols="12" md="6">
            <div
              class="
                d-flex
                align-items-center
                justify-content-end
                pt-3
                pesquisar
              "
            >
              <b-form-input
                v-model="filter"
                class="d-inline-block mr-1 h-75 w-50 input"
                placeholder="Pesquisar..."
                v-dark-mode
              />
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="row">
        <Tabela v-for="user in users" :key="user.numero" :user="user" />
      </div>
      <b-table
        striped
        hover
        responsive
        :dark="switchMode"
        :items="users"
        :fields="column"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
        sticky-header="470px"
        no-border-collapse
        show-empty
      >
        <template #cell(actions)="{ item }">
          <b-dropdown no-caret variant="flat">
            <template #button-content>
              <b-icon
                icon="three-dots-vertical"
                :variant="switchIcon"
                class="align-middle"
              ></b-icon>
            </template>
            <b-dropdown-item :to="{ path: `/home/editar/${item._id}` }">
              <b-icon icon="box-arrow-up-right" scale="0.6"></b-icon>
              <label for="">Editar</label>
            </b-dropdown-item>
            <b-dropdown-item>
              <b-icon icon="trash" scale="0.6"></b-icon>
              <label for="">Excluir</label>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
      <b-modal
        id="modal-center"
        title="Editar usuário"
        ok-title="Atualizar"
        cancel-variant="outline-secondary"
        cancel-title="fechar"
        centered
        :header-bg-variant="switchModal"
        :body-bg-variant="switchModal"
        :footer-bg-variant="switchModal"
        content-class="shadow"
      >
        <b-form @submit.prevent="update">
          <b-form-group label="Nome" label-for="Nome">
            <b-form-input class="input shadow-none"  v-model="editable.name" v-dark-mode></b-form-input>
          </b-form-group>
          <b-form-group label="Email" label-for="Email  ">
            <b-form-input class="input shadow-none" type="email"  v-model="editable.email"  v-dark-mode></b-form-input>
          </b-form-group>
          <b-form-group label="Senha" label-for="Senha">
            <b-form-input class="input shadow-none" type="password" v-model="editable.password"  v-dark-mode></b-form-input>
          </b-form-group>
          <b-button type="submit">atualizar</b-button>
        </b-form>
      </b-modal>
    </b-card>
  </div>
</template>
<script>
import Tabela from "@/components/users/users-tabel.vue";
import navbar from "@/components/navbar/navbar.vue";

export default {
  components: {
    Tabela,
    navbar,
  },
  data() {
    return {
      stickyHeader: true,
      noCollapse: false,
      users: [],
      editusers: {
        name: "",
        email: "",
        password: "",
      },
      editable: {},
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      filter: null,
      filterOn: [],
      column: [
        {
          key: "name",
          label: "Usuários",
        },
        {
          key: "email",
          label: "Email",
        },
        {
          key: "actions",
          label: "Ações",
        },
      ],
    };
  },
  mounted() {
    this.$http
      .get("users/listar")
      .then((response) => (this.users = response.data))
      .catch((erro) => console.log(erro));
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getUsers(users){
      this.editable = {
        ...users
      }
      this.$bvModal.show('modal-center')
    },
    // update({id}){
    //   this.$http
    //     .patch(`/users/update/${id}`, this.editusers)
    //     .then((response) => {
    //       console.log(response);
    //       this.$router.push({ name: "tabela" });
    //     })
    //     .catch((erro) => console.log(erro));
    // },
  },
  computed: {
    switchMode() {
      return Boolean(this.$store.state.darkMode);
    },
    switchIcon() {
      return this.switchMode ? "light" : "dark";
    },
    switchModal(){
      return this.switchMode ? "dark" : "light";
    }
  },
};
</script>
<style scoped>
.cardprin.theme--dark {
  background-color: #313336;
}

.input.theme--dark {
  background-color: #17181a;
  color: white;
  border-color: #4a4d53;
}
</style>
