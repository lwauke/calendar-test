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
  <li :class="[color, 'reminder']" :data-test-id="`reminder-item-${fullDate}`">
    <span class="text">{{ reminder }}</span>
    <button class="btn" @click.stop="deleteReminder">delete</button>
  </li>
</template>

<style lang="sass" scoped>
.reminder
  color: #fff
  background: #a5a5a5
  display: flex
  justify-content: space-between
  align-items: start
  cursor: pointer
  padding: 5px 10px
  border-radius: 5px
  margin-top: 5px
.red
  background: #ff5f5f
.yellow
  background: #c2c510
.green
  background: #11a111
.btn
  background: rgba(255,255,255, .8)
  border: none
  border-radius: 2px
  cursor: pointer
  &:hover
    background: #fff
.text
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
</style>
