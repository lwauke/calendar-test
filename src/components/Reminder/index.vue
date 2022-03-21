<script>
  import Modal from '../Modal/index.vue';
  import AddReminder from '../AddReminder/index.vue';
  export default {
    props: ['uuid', 'color', 'start', 'end', 'reminder', 'fullDate'],
    data () {
      return {
        showModal: false
      }
    },
    methods: {
      deleteReminder: function () {
        this.$store.commit(
          'delete',
          { date: this.fullDate, uuid: this.uuid }
        )
      }
    }
  }
</script>

<template>
  <fragment>
    <li :class="[color, 'reminder']">
      {{ reminder }}
      <button @click="deleteReminder">delete</button>
    </li>
  </fragment>
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

