<template>
  <div class="fundo">
    <navbar />
    <div class="d-flex align-items-center justify-content-center pt-4">
      <router-view/>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/navbar/navbar.vue";
export default {
  components: {
    navbar
  },
};
</script>
<style scoped>
.fundo {
  height: 100vh;
}
</style>
