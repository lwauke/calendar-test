<script>
  import Modal from './Modal.vue'
  import ReminderForm from './ReminderForm.vue'
  import ReminderList from './ReminderList.vue'

  export default {
    props: ['date', 'fullDate', 'actualMonth'],
    components: {
      Modal,
      ReminderForm,
      ReminderList
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
      <ReminderList :fullDate="fullDate"/>
    </ul>
    <Modal
      v-if="showModal"
      @close="showModal = false"
    >
      <template v-slot:header>
        add a reminder
      </template>
      <template v-slot:body>
        <ReminderForm :fullDate="fullDate" />
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
</style>
