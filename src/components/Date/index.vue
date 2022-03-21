<script>
  import Modal from '../Modal/index.vue'
  export default {
    props: ['date', 'fullDate', 'actualMonth'],
    components: {
      Modal
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
    <Modal v-if="showModal" @close="showModal = false">
      <template v-slot:header>
        add a reminder
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

