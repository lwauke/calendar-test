<script>
  export default {
    props: ['fullDate', 'edit', 'uuid'],
    data () {
      return {
        color: '',
        reminder: '',
        start: '',
        end: ''
      }
    },
    methods: {
      addReminder () {
        const reminder = {
          color: this.color,
          reminder: this.reminder,
          start: this.start,
          end: this.end
        }
        this.$store.commit(
          'add',
          { date: this.fullDate, reminder }
        )
      }
    },
    mounted () {
      if (this.edit) {
        console.log(this.$store.getters.getByUUID(this.uuid))
      }
    }
  }
</script>

<template>
  <form>
    teste
    <textarea maxlength="30" v-model="reminder" />
    <select name="" id="" v-model="color">
      <option>green</option>
      <option>yellow</option>
      <option>red</option>
    </select>
    <label for="start" aria-labelledby="time which the reminder will begin">Start</label>
    <input type="time" id="start" name="start" v-model="start"/>
    <label for="end" aria-labelledby="time which the reminder will finish">End</label>
    <input type="time" id="end" name="end" v-model="end"/>
    <button @click.prevent="addReminder">add</button>
  </form>
</template>

<style lang="sass" scoped>
</style>
