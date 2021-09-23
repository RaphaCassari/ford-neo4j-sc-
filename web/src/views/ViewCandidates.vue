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
          <v-toolbar-title>Area do Gestor</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <div class="text-center">
            <v-dialog v-model="dialog" width="1500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                  Adicionar Usuario
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Adicionar 1 novo usuario
                </v-card-title>

                <Form />

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false"> Fechar </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>

          <div class="text-center">
            <v-dialog v-model="dialog2" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                  Upload em Massa
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Upload em Massa via Planilha
                </v-card-title>

                <upload />

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog2 = false"> Fechar </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
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
    <br /><br /><br />
    <v-alert color="green" icon="mdi-account" type="success">Visão Geral</v-alert>
    <apex-simple-pie />
    <v-alert color="green" icon="mdi-account" type="success"
      >Score médio por area</v-alert
    >
    <apex-column />
    <v-container fluid>
      <v-row>
        <v-expansion-panels inset>
          <v-expansion-panel>
            <v-expansion-panel-header disable-icon-rotate>
              Tecnologia
              <template v-slot:actions>
                <v-icon color="primary"> $expand </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-alert color="green" icon="mdi-account" type="success"
                >Visão Geral - Tecnologia</v-alert
              >
              <apex-simple-pie />
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <v-alert color="green" icon="mdi-account" type="success"
                >Distribuição dos Conhecimentos - Tecnologia</v-alert
              >
              <apex-treemap />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header disable-icon-rotate>
              Marketing
              <template v-slot:actions>
                <v-icon color="primary"> $expand </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-alert color="green" icon="mdi-account" type="success"
                >Visão Geral - Marketing</v-alert
              >
              <apex-simple-pie />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { apiCand } from "../axios";
import ApexColumn from "../components/apexColumn.vue";
import ApexSimplePie from "../components/apexSimplePie.vue";
import ApexTreemap from "../components/apexTreemap.vue";
import Form from "../components/Form.vue";
import Upload from "../components/upload.vue";
//import Upload from "../components/upload.vue";
export default {
  components: { Form, Upload, ApexColumn, ApexSimplePie, ApexTreemap },
  data: () => ({
    dialog: false,
    dialog2: false,
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
    total() {
      return this.data.reduce((acc, item) => acc + item.one, 0);
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  async created() {
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.usersData[this.editedIndex], this.editedItem);
      } else {
        this.usersData.push(this.editedItem);
      }
    },
  },
};
</script>
