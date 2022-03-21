<script>
export default {
  props: ["uuid", "color", "start", "end", "reminder", "fullDate"],
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    deleteReminder: function () {
      this.$store.commit("delete", { date: this.fullDate, uuid: this.uuid });
    },
  },
};
</script>

<template>
  <li :class="[color, 'reminder']">
    {{ reminder }}
    <button @click.stop="deleteReminder">delete</button>
  </li>
</template>

<style lang="sass" scoped>
.reminder
  color: #fff
  background: gray
.red
  background: red
.yellow
  background: yellow
.green
  background: green
</style>
