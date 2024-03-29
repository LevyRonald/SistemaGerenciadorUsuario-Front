<template>
  <div class="container">
    <b-card no-body class="mb-2 cardprin shadow" v-dark-mode>
      <div class="m-2">
        <div
          class=" d-flex align-items-center justify-content-between w-100"
        >
          <div class="d-flex flex-column">
            <div class="d-flex align-items-center">
              <b-icon icon="people-fill" aria-hidden="true"></b-icon>
              <strong>Usuários</strong>
            </div>
          </div>
          <div class="pesquisar">
            <b-form-input
              v-model="filter"
              class="input"
              placeholder="Pesquisar..."
              v-dark-mode
            />
          </div>
        </div>
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
        sticky-header="460px"
        no-border-collapse
        show-empty
        empty-filtered-text="nenhum usuário encontrado"
      >
      <template #cell(name)="data">
        <span class="text-capitalize">{{data.item.name}}</span>
      </template>
        <template #cell(actions)="{ item }" v-if="TESTER">
          <b-dropdown no-caret variant="flat">
            <template #button-content>
              <b-icon
                icon="three-dots-vertical"
                :variant="switchIcon"
                class="align-middle"
              ></b-icon>
            </template>
            <b-dropdown-item
              :to="{ path: `/home/editar/${item._id}` }"
              v-if="TESTER"
            >
              <b-icon icon="box-arrow-up-right" scale="0.6"></b-icon>
              <label for="">Editar</label>
            </b-dropdown-item>
            <b-dropdown-item @click="getUsers(item)" v-if="TESTER">
              <b-icon icon="trash" scale="0.6"></b-icon>
              <label for="">Excluir</label>
            </b-dropdown-item>
          </b-dropdown>
        </template>
        <template #cell(roles)="data">
          <div class="d-flex align-items-center">
            <b-icon
              :icon="UserRole(data.item.roles)"
              size="18"
              class="IconRole"
              :class="`text-${UserRoleVariant(data.item.roles)}`"
            />
            <span class="align-text-center text-capitalize">{{ data.item.roles }}</span>
          </div>
        </template>
      </b-table>
    </b-card>
    <b-modal
      size="sm"
      id="modal-1"
      title="Confirme essa ação"
      ref="my-modal"
      :header-bg-variant="switchModal"
      :body-bg-variant="switchModal"
      hide-footer
      centered
      hide-header-close
    >
      <p class="my-4">Deseja realmente deletar este usuário?</p>
      <div class="w-75 d-flex justify-content-between">
        <b-button @click.prevent="deletar()" variant="outline-danger"
          >Excluir</b-button
        >
        <b-button @click="hideModal" variant="outline-secondary"
          >Cancelar</b-button
        >
      </div>
    </b-modal>
  </div>
</template>
<script>
import navbar from "@/components/navbar/navbar.vue";
import { SocketModule } from "@/socket/socketServer";
import { mapGetters } from "vuex";
export default {
  components: {
    navbar,
  },
  data() {
    const UserRoleVariant = roles => {
      const items = {
        'admin': 'danger',
        'usuario': 'info',
        'vendedor': 'success',
        'suporte': 'warning'
      }
      return items[roles]
    }
    const UserRole = roles => {
      const items = {
        'admin': 'hdd-stack',
        'usuario': 'people',
        'vendedor': 'currency-dollar',
        'suporte': 'headset'
      }
      return items[roles]
    }
    return {
      UserRoleVariant,
      UserRole,
      stickyHeader: true,
      noCollapse: false,
      users: [],
      editusers: {
        name: "",
        email: "",
        password: "",
      },
      editable: {},
      SocketService: SocketModule.connect(),
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
          key: "roles",
          label: "Cargo",
        },
        {
          key: "actions",
          label: "Ações",
        },
      ],
    };
  },
  async mounted() {
    await this.$http
      .get("users/listar")
      .then((response) => (this.users = response.data))
      .catch((erro) => console.log(erro));
    await this.SocketService.registerListener(
      "new-user",
      "new-user",
      ({ email: string }) =>
        this.$http.get("users/listar").then(
          (response) => (this.users = response.data),
          this.$swal({
            position: "top-start",
            text: `novo usuário adicionado`,
            icon: "info",
            width: "300px",
            timerProgressBar: true,
            timer: 1000,
            showConfirmButton: false,
          })
        )
    );
    await this.SocketService.registerListener(
      "update",
      "update",
      ({ email: string }) =>
        this.$http.get("users/listar").then(
          (response) => (this.users = response.data),
          this.$swal({
            position: "top-start",
            text: `Um usuário foi atualizado`,
            icon: "info",
            width: "300px",
            timerProgressBar: true,
            timer: 3000,
            showConfirmButton: false,
          })
        )
    );
    await this.SocketService.registerListener(
      "removed-user",
      "removed-user",
      ({ email: string }) =>
        this.$http.get("users/listar").then(
          (response) => (this.users = response.data),
          this.$swal({
            position: "top-start",
            text: `Um usuário foi deletado`,
            icon: "info",
            width: "300px",
            timerProgressBar: true,
            timer: 3000,
            showConfirmButton: false,
          })
        )
    );
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    deletar() {
      this.$http
        .delete(`users/${this.editable._id}`)
        .then((response) => {
          console.log(response);
          this.$bvModal.hide("modal-1");
        })
        .then((response) => {
          this.$swal({
            text: `usuário ${this.editable.name} deletado`,
            icon: "success",
            width: "300px",
            timerProgressBar: true,
            timer: 1000,
            showConfirmButton: false,
          });
        });
    },
    getUsers(users) {
      this.editable = {
        ...users,
      };
      this.$bvModal.show("modal-1");
    },
    hideModal() {
      this.$bvModal.hide("modal-1");
    },
  },
  computed: {
    ...mapGetters(["TESTER"]),
    switchMode() {
      return Boolean(this.$store.state.darkMode);
    },
    switchIcon() {
      return this.switchMode ? "light" : "dark";
    },
    switchModal() {
      return this.switchMode ? "dark" : "light";
    },
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
.IconRole{
  margin-right: 10px;
}
@media screen and (max-width: 800px) {
  .container{
    width: 100%;
  }
}
</style>
