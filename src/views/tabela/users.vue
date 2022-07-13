<template>
  <div class="container">
    <b-card no-body class="mb-2 cardPrin">
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
            class="d-flex align-items-center justify-content-end pt-3 pesquisar"
          >
            <b-form-input
              v-model="filter"
              class="d-inline-block mr-1 h-75 w-50"
              placeholder="Pesquisar..."
            />
          </div>
        </b-col>
      </b-row>
    </div>
    <div class="row">
      <Tabela v-for="user in users" :key="user.numero" :user="user" />
    </div>
    <b-table
      fixed
      striped
      hover
      responsive
      :items="users"
      :fields="column"
      :filter="filter"
      :filter-included-fields="filterOn"
      @filtered="onFiltered"
      show-empty
    >
      <template #cell(name)="data">{{ data.value }}</template>
    </b-table>
    </b-card>
  </div>
</template>
<script>
import Tabela from "@/components/users/users-tabel.vue";
import navbar from "@/components/navbar/navbar.vue";

export default {
  components: {
    Tabela,
    navbar
  },
  data() {
    return {
      users: [],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      filter: null,
      filterOn: [],
      column: [
        {
          key: "name",
          label: "Usuários",
        },
        {
          key: "email",
          label: "email",
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
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  }
};
</script>
<style scoped>
.cardPrin{
  background-color: #CAD5CA;
}
</style>
