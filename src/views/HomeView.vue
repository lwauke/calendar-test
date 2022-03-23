<script>
import Calendar from "../components/Calendar.vue";

export default {
  components: {
    Calendar,
  },
};
</script>

<template>
  <main class="main">
    <h2 class="title">Home</h2>
    <Calendar />
  </main>
</template>

<style lang="sass" scoped>
.main
  width: 80%
  margin: 0 auto
h2
  text-align: center
</style>
