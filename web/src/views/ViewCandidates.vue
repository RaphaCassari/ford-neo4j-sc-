<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="usersData"
      sort-by="cursos"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="black">
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
                >Novo Usuario</v-btn
              >
            </template>

            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <Form />

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Fechar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
            </v-card-actions>
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
import Form from "../components/Form.vue";
export default {
  components: { Form },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Nome",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Tipo", value: "type" },
      { text: "Qtd. Cursos", value: "courses" },
      { text: "Qtd. Idiomas", value: "languages" },
      { text: "Pontuação", value: "score" },
    ],
    usersData: [],
    editedIndex: -1,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Usuario" : "Editar Usuario";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  async created() {
    //this.initialize();
    this.usersData = await apiCand.get();
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.usersData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.usersData.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.usersData.splice(index, 1);
    },

    close() {
      this.dialog = false;
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.usersData[this.editedIndex], this.editedItem);
      } else {
        this.usersData.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
