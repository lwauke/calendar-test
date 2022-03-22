<script>
import Modal from "./Modal.vue";
import ReminderForm from "./ReminderForm.vue";
import ReminderList from "./ReminderList.vue";

export default {
  props: ["date", "fullDate", "actualMonth"],
  components: {
    Modal,
    ReminderForm,
    ReminderList,
  },
  computed: {
    reminders: function () {
      return this.$store.getters.getByDate(this.fullDate);
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    deleteAll () {
      this.$store.commit('deleteAll', { date: this.fullDate })
    }
  }
};
</script>

<template>
  <td :class="[{ actualMonth }, 'cell']">
    {{ date }}
    <div>
      <button class="btn" @click="showModal = true">+</button>
      <button @click="deleteAll">delete all</button>
    </div>
    <ReminderList :fullDate="fullDate" class="list"/>
    <Modal v-if="showModal" @close="showModal = false">
      <template v-slot:header> add a reminder </template>
      <template v-slot:body>
        <ReminderForm :fullDate="fullDate" />
      </template>
    </Modal>
  </td>
</template>

<style lang="sass" scoped>
.cell
  width: 14%
  height: 150px
  display: inline-grid
  grid-template-columns: 1fr auto
  grid-template-rows: auto 1fr
  border-left: 1px solid #000
  border-top: 1px solid #000
  padding: 5px
  &:last-child
    border-right: 1px solid #000
  flex-grow: 1
  // &:hover, &:focus, &:focus-within
  //   & .btn
  //     display: block

.btn
  background: none
  border: 0
  // display: none
  cursor: pointer

.list
  grid-column: 1 / 3
</style>
