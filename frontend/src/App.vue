<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
/* Overwrite some default stylings from element-ui */
.el-container {
  height: 100vh;
}
.el-menu {
  border-right: none !important;
}
.el-main {
  padding: 50px;
}
</style>
