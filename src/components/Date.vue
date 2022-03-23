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
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    deleteAll() {
      this.$store.commit("deleteAll", { date: this.fullDate });
    },
  },
};
</script>

<template>
  <td class="cell">
    <span :class="[{ actualMonth }, 'date', 'desk']">{{ date }}</span>
    <button
      :class="[{ actualMonth }, 'date', 'mobile', 'btn']"
      @click="showModal = true"
    >
      {{ date }}
    </button>
    <div class="container-btns">
      <button
        class="btn"
        @click="showModal = true"
        :data-test-id="`btn-add-${fullDate}`"
      >
        +
      </button>
      <button
        class="btn"
        @click="deleteAll"
        :data-test-id="`btn-remove-all-${fullDate}`"
      >
        <svg
          style="width: 15px; height: 15px; color: rgb(126 126 126)"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
          />
        </svg>
      </button>
    </div>
    <ReminderList :fullDate="fullDate" class="list" />
    <Modal v-if="showModal" @close="showModal = false">
      <template v-slot:header>Add a reminder </template>
      <template v-slot:body>
        <ReminderForm :fullDate="fullDate" />
      </template>
    </Modal>
  </td>
</template>

<style lang="sass" scoped>
.cell
  border-left: 1px solid #000
  border-top: 1px solid #000
  padding: 5px
  &:last-child
    border-right: 1px solid #000
  &:last-child, &:first-child
    .date
      color: #6ea2c9
  @media (min-width: 536px)
    height: 150px
    display: inline-grid
    grid-template-columns: 1fr auto
    grid-template-rows: auto 1fr

.btn
  background: none
  border: 0
  cursor: pointer
  &:hover
    background: rgba(0,0,0,.1)

.list
  grid-column: 1 / 3

.date
  color: #363636
  font-weight: 600
.cell .date:not(.actualMonth)
  color: rgba(0,0,0,.3)
.container-btns
  text-align: right
  display: flex

@media (max-width: 535px)
  .container-btns
    display: none
  .cell
    text-align: center
  .date
    display: inline
    font-size: 16px

.mobile
  display: grid
  @media (min-width: 535px)
    display: none

.desk
  display: none
  @media (min-width: 535px)
    display: grid
</style>
