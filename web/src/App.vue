<template>
  <div id="app" data-app>
    <div id="allTheNav" style="background-color: black">
      <nav id="navigator" class="navbar" :class="{ navbaropen: opened }">
        <span class="open-slide">
          <a href="#" @click="opened = !opened">
            <div>
              <div class="bar" :class="{ topopen: opened }"></div>
              <div class="bar" :class="{ midopen: opened }"></div>
              <div class="bar" :class="{ botopen: opened }"></div>
            </div>
          </a>
        </span>
      </nav>
      <div id="side-menu" class="side-nav" :class="{ sidenavopen: opened }">
        <v-list style="background-color: black">
          <v-list-item>
            <v-list-item-action>
              <v-icon style="color: white">mdi-home</v-icon>
            </v-list-item-action>
            <router-link to="/"><h6>Home</h6></router-link>
          </v-list-item>

          <v-list-group
            prepend-icon="mdi-account_circle"
            style="color: white"
            value="true"
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-title style="color: white">Usuarios</v-list-item-title>
              </v-list-item>
            </template>

            <router-link to="/form"><h6>Cadastrar Candidato</h6></router-link>
            <router-link to="/viewCandidates"><h6>Ver Candidatos</h6></router-link>
          </v-list-group>
          <v-list-group
            prepend-icon="mdi-account_circle"
            style="color: white"
            value="true"
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-title style="color: white">Cursos</v-list-item-title>
              </v-list-item>
            </template>

            <router-link to="/courses"><h6>Gerenciar Cursos</h6></router-link>
          </v-list-group>
        </v-list>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data: () => ({
    opened: false,
  }),
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body {
  font-family: "Arial", Serif;
  background-color: #f5f5f5;
  overflow-x: hidden;
}

.navbar {
  background-color: #3b5998;
  overflow: hidden;
  height: 63px;
}

.navbaropen {
  background-color: #3b5998;
  overflow: hidden;
  height: 63px;
  margin-left: 250px;
}

.navbar a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.navbar ul {
  margin: 8px 0 0 0;
  list-style: none;
}

.navbar a:hover {
  background-color: #ddd;
  color: #000;
}

.side-nav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  opacity: 0.9;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.3s;
}

.sidenavopen {
  height: 100%;
  width: 250px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  opacity: 0.9;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.3s;
}

.side-nav a {
  padding: 10px 10px 10px 30px;
  text-decoration: none;
  font-size: 22px;
  color: #ccc;
  display: block;
  transition: 0.3s;
}

.side-nav a:hover {
  color: #fff;
}

.side-nav .btn-close {
  position: absolute;
  top: 0;
  right: 22px;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left 0.3s;
  padding: 20px;
  overflow: hidden;
  width: 100%;
}

.mainopen {
  transition: margin-left 0.3s;
  padding: 20px;
  overflow: hidden;
  width: 100%;
  margin-left: 250px;
}

nav {
  transition: margin-left 0.3s;
}

.bar {
  display: block;
  height: 5px;
  width: 35px;
  background: #000;
  margin: 5px auto;
}

.midopen {
  width: 0;
}
.bar {
  transition: all 0.3s ease;
}
.topopen {
  transform: translateY(10px) rotateZ(45deg);
}
.botopen {
  transform: translateY(-10px) rotateZ(-45deg);
}

v-btn {
  color: #000000;
}
</style>
