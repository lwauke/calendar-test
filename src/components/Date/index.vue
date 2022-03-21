<script>
  import Modal from '../Modal/index.vue'
  import AddReminder from '../AddReminder/index.vue'
  import Reminder from '../Reminder/index.vue'

  export default {
    props: ['date', 'fullDate', 'actualMonth'],
    components: {
      Modal,
      AddReminder,
      Reminder
    },
    computed: {
      reminders: function () {
        return this.$store.getters.getByDate(this.fullDate)
      }
    },
    data () {
      return {
        showModal: false
      }
    }
  }
</script>

<template>
  <td :class="[{ actualMonth }, 'cell']">
    {{ date }}
    <button class="btn" @click="showModal = true">+</button>
    <ul class="list">
      <Reminder
        v-for="reminder in reminders"
        :key="reminder.uuid"
        v-bind="reminder"
        :fullDate="fullDate"
      />
    </ul>
    <Modal
      v-if="showModal"
      @close="showModal = false"
    >
      <template v-slot:header>
        add a reminder
      </template>
      <template v-slot:body>
        <AddReminder :fullDate="fullDate" />
      </template>
    </Modal>
  </td>
</template>

<style lang="sass" scoped>
.cell
  width: 100px
  height: 100px
  display: inline-grid
  grid-template-columns: 1fr auto
  grid-template-rows: auto 1fr
  &:hover, &:focus, &:focus-within
    & .btn
      display: block

.btn
  background: none
  border: 0
  display: none 
  cursor: pointer

.list
  padding: 0
  margin: 0
</style>
