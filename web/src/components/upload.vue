<template>
  <v-container fluid>
    <v-alert dismissible icon="mdi-account" type="success" v-if="sucess"
      >Enviado com Sucesso</v-alert
    >
    <input type="file" name="file" multiple ref="files" />
    <v-btn dark @click="sendFile">Enviar</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "App",
  sucess: false,
  methods: {
    async sendFile() {
      let dataForm = new FormData();
      for (let file of this.$refs.files.files) {
        dataForm.append(`file`, file);
      }
      let res = await fetch(`https://api-shopping-cidadao-2.herokuapp.com/upload`, {
        method: "POST",
        body: dataForm,
      });
      let data = await res.json();
      console.log(data);
      this.sucess = true;
    },
  },
};
</script>
