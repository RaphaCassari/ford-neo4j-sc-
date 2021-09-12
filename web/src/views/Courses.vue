<template>
  <v-container fluid>
    <v-alert color="green" dismissible icon="mdi-account" type="success"
      >Bem vindo <b>{{ userInfos.user.name }}</b
      >.
      <div v-if="userInfos.type.name === 'CANDIDATO'">
        Analizamos suas competencias e recomendamos que faça o curso de Curso para
        melhorar suas chances.
      </div></v-alert
    >
    <v-data-table
      :headers="headers"
      :items="courses"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Conhecimentos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
                >Adicionar Conhecimento</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.text" label="Nome"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { apiCand } from "../axios";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    name: "Courses",
    dialog: false,
    headers: [
      {
        text: "Nome",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Ações", value: "actions", sortable: false },
    ],
    courses: [],
    userInfos: [],
    editedIndex: -1,
    editedItem: {
      name: "",
    },
    defaultItem: {
      name: "",
    },
  }),

  computed: {
    ...mapGetters({
      cpfUser: "getCpfUser",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "Adicionar Conhecimento" : "Editar Curso";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  async created() {
    this.userInfos = await apiCand.getByCpf({ cpf: this.cpfUser });
    this.courses = [...this.userInfos.courses, ...this.userInfos.languages];
    console.log(this.userInfos);
    console.log(this.cpfUser);
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.courses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      await this.close();
    },
  },
};
</script>
