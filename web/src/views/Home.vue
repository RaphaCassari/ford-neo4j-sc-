<template>
  <v-container fluid>
    <v-alert v-model="alert" dismissible type="success">
      Candidato Cadastrado com Sucesso
    </v-alert>
    <v-card>
      <v-container fluid>
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Nome"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="cpf"
                label="CPF"
                v-mask="'###.###.###-##'"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-row align="center">
          <v-col cols="12">
            <v-autocomplete
              v-model="values"
              :items="items"
              outlined
              dense
              chips
              small-chips
              label="Cursos"
              multiple
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row align="center" justify="space-around">
          <v-btn @click="s2" depressed> ENVIAR </v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { apiCourses, apiCand } from "../axios";
//import axios from "axios";
export default {
  data: () => ({
    items: [],
    values: [],
    value: null,
    alert: false,
    valid: false,
    name: "",
    cpf: "",
    nameRules: [
      (v) => !!v || "Name is required",
      //(v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),
  methods: {
    s2() {
      this.alert = true;
    },
    async submit() {
      let request = {
        name: this.name,
        cpf: this.cpf,
        email: this.email,
        courses: this.values,
      };
      let res = await apiCand.create({ request });
      console.log(res);
    },
  },
  async created() {
    this.items = await apiCourses.get();
  },
};
</script>
