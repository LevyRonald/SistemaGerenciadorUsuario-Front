<template>
  <body id="app" v-dark-mode>
    <div>
      <router-view />
    </div>
  </body>
</template>
<script>
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app.theme--dark {
  color: white;
}

input.theme--dark {
  background-color: #17181a;
  color: white;
  border-color: #4a4d53;
}
body.theme--dark {
  background-color: #0d1117;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
