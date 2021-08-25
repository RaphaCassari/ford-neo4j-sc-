<template>
  <div>
    <v-alert v-model="alert" dismissible type="success">
      Candidato Cadastrado com Sucesso
    </v-alert>
    <v-container fluid>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">Informações Basicas</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2"
            >Cursos e Conhecimentos</v-stepper-step
          >

          <v-divider></v-divider>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-form v-model="valid">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    :counter="50"
                    label="Nome"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="cpf"
                    label="CPF"
                    v-mask="'###.###.###-##'"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="userType"
                    :items="userTypes"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="Tipo"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
            <v-btn @click="e1 = 2" :disabled="formIsInvalid"> Continue </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-row align="center">
              <v-col cols="6">
                <v-autocomplete
                  v-model="coursesId"
                  :items="courses"
                  outlined
                  dense
                  chips
                  small-chips
                  label="Cursos"
                  multiple
                ></v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="languagesId"
                  :items="languages"
                  outlined
                  dense
                  chips
                  small-chips
                  label="Idiomas"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-btn color="primary" @click="submit"> Enviar </v-btn>
            <v-btn text @click="e1 = 1">Voltar</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </div>
</template>

<script>
import { apiCand, apiMain } from "../axios";
//import axios from "axios";
export default {
  name: "Form",
  data: () => ({
    courses: [],
    languages: [],
    userTypes: ["Funcionario", "Candidato"],
    coursesId: [],
    languagesId: [],
    value: null,
    alert: false,
    valid: false,
    name: "",
    cpf: "",
    userType: "",
    e1: 1,
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
        type: this.userType,
        courses: this.coursesId,
        languages: this.languagesId,
      };
      let res = await apiCand.create({ request });
      this.alert = true;
      console.log(res);
    },
  },
  async created() {
    this.courses = await apiMain.get({ labelName: "Course" });
    this.languages = await apiMain.get({ labelName: "Language" });
  },
  computed: {
    formIsInvalid() {
      if (this.name && this.email && this.cpf && this.userType) return false;
      return true;
    },
  },
};
</script>
