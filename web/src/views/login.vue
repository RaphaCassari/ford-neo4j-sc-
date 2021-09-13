<template>
  <v-app id="inspire">
    <v-main>
      <v-alert
        border="left"
        color="red"
        dismissible
        elevation="24"
        type="error"
        v-if="userErro"
        >Usuario ou Senha Incorreto</v-alert
      >
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="10">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <div class="text-center mt-4">
                          <v-img
                            max-height="1500"
                            max-width="1500"
                            src="@/assets/images/sc-fiap2.png"
                          ></v-img>
                        </div>
                        <h4 class="text-center mt-4">
                          Insira suas informações para logar.
                        </h4>
                        <v-form>
                          <v-text-field
                            v-model="email"
                            label="Email"
                            name="Email"
                            prepend-icon="mdi-email"
                            type="text"
                            color="blue"
                          />

                          <v-text-field
                            v-model="password"
                            id="password"
                            label="Senha"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            color="blue"
                          />
                        </v-form>
                        <h3 class="text-center mt-4">Esqueceu a senha ?</h3>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn rounded color="blue" dark @click="login">LOGAR</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="blue">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Olá, Bem Vindo!</h1>
                        <h5 class="text-center">
                          Caso seja seu primeiro acesso, clique no botão abaixo para criar
                          sua conta.
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">CADASTRAR</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="blue">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Bem vindo de volta!</h1>
                        <h5 class="text-center">
                          Caso já possua conta conosco, clique no botão abaixo para logar.
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">LOGAR</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">
                          Criar Conta
                        </h1>

                        <h4 class="text-center mt-4">
                          Cadastre suas informações para acessar nosso portal.
                        </h4>

                        <v-stepper v-model="e1">
                          <v-stepper-header>
                            <v-stepper-step :complete="e1 > 1" step="1">
                              Informações Básicas
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step :complete="e1 > 2" step="2">
                              Complementos
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step step="3"
                              >Cursos e Conhecimentos</v-stepper-step
                            >
                          </v-stepper-header>

                          <v-stepper-items>
                            <v-stepper-content step="1">
                              <v-form>
                                <v-text-field
                                  v-model="name"
                                  label="Nome"
                                  name="Name"
                                  prepend-icon="mdi-face"
                                  type="text"
                                  color="blue"
                                />
                                <v-text-field
                                  v-model="email"
                                  label="Email"
                                  name="Email"
                                  prepend-icon="mdi-email"
                                  type="text"
                                  color="blue"
                                />

                                <v-text-field
                                  v-model="password"
                                  id="password"
                                  label="Senha"
                                  name="password"
                                  prepend-icon="mdi-lock"
                                  type="password"
                                  color="blue"
                                />
                                <v-text-field
                                  v-model="cpf"
                                  label="CPF"
                                  prepend-icon="mdi-pen"
                                  v-mask="'###.###.###-##'"
                                  required
                                ></v-text-field>
                              </v-form>

                              <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="2">
                              <v-form>
                                <v-select
                                  v-model="userType"
                                  :items="userTypes"
                                  prepend-icon="mdi-face"
                                  :rules="[(v) => !!v || 'Item is required']"
                                  label="Tipo"
                                  required
                                ></v-select>
                                <v-select
                                  v-model="userArea"
                                  :items="userAreas"
                                  prepend-icon="mdi-switch"
                                  :rules="[(v) => !!v || 'Item is required']"
                                  label="Area"
                                  required
                                ></v-select>
                              </v-form>

                              <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>

                              <v-btn text @click="e1 = 1"> Voltar </v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="3">
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

                              <v-btn
                                color="primary"
                                @click="submit"
                                :disabled="formIsInvalid"
                              >
                                Enviar
                              </v-btn>

                              <v-btn text @click="e1 = 2"> Voltar </v-btn>
                            </v-stepper-content>
                          </v-stepper-items>
                        </v-stepper>
                      </v-card-text>
                      <div class="text-center mt-n5"></div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { apiCand, apiMain, apiCourses } from "../axios";
import { mapMutations } from "vuex";
export default {
  data: () => ({
    step: 1,
    e1: 1,
    userTypes: ["CANDIDATO", "FUNCIONARIO", "GESTOR"],
    userAreas: ["GERAL", "TECNOLOGIA", "MARKETING"],
    userType: "",
    userArea: "",
    name: "",
    email: "",
    password: "",
    cpf: "",
    courses: [],
    languages: [],
    coursesId: [],
    languagesId: [],
    userErro: false,
  }),
  methods: {
    ...mapMutations(["setCpfUser"]),
    async submit() {
      let request = {
        name: this.name,
        email: this.email,
        password: this.password,
        cpf: this.cpf,
        type: this.userType,
        area: this.userArea,
        courses: this.coursesId,
        languages: this.languagesId,
      };
      await apiCand.create({ request });
      this.setCpfUser(request.cpf);
      this.$router.push("courses");
    },
    async login() {
      let request = {
        email: this.email,
        password: this.password,
      };
      let res = await apiCand.login({ request });
      if (res.length == 0) this.userErro = true;
      else {
        this.setCpfUser(res[0].user.cpf);
        if (res[0].type.name == "GESTOR") this.$router.push("viewCandidates");
        else {
          this.$router.push("courses");
        }
      }
    },
  },
  async created() {
    this.languages = await apiMain.get({ labelName: "Language" });
  },
  computed: {
    formIsInvalid() {
      if (
        (this.name != "" && this.email && this.password && this.userType, this.userArea)
      )
        return false;
      return true;
    },
  },
  watch: {
    async userArea() {
      this.courses = await apiCourses.getByArea({ nameArea: this.userArea });
    },
  },
};
</script>
