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
                :counter="50"
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
            <v-flex xs12>
              <v-combobox
                v-model="select"
                :items="items"
                label="I use chips"
                multiple
                chips
              ></v-combobox>
            </v-flex>
          </v-col>
        </v-row>
        <v-row align="center" justify="space-around">
          <v-btn @click="submit" :disabled="formIsInvalid" depressed> ENVIAR </v-btn>
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
      (v) => !!v || "Nome é obrigatorio",
      (v) => v.length <= 50 || "O limite maximo de caracteres é 50",
      (v) =>
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(v) || "Caracteres invalidos",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail é obrigatorio",
      (v) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "Digite um  E-mail válido",
    ],
  }),
  methods: {
    async submit() {
      let request = {
        name: this.name,
        cpf: this.cpf,
        email: this.email,
        courses: this.values,
      };
      let res = await apiCand.create({ request });
      this.alert = true;
      console.log(res);
    },
  },
  async created() {
    this.items = await apiCourses.get();
  },
  computed: {
    formIsInvalid() {
      if (this.name && this.email && this.cpf) return false;
      return true;
    },
  },
};
</script>
