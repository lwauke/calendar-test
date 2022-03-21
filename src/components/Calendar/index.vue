<script>
  import generateMonth from '../../helpers/generateMonth';

  const now = new Date();

  export default {
    data () {
      return {
        month: now.getMonth(),
        year: now.getFullYear(), 
        days: []
      }
    },
    mounted () {
      this.days = generateMonth(this.year, this.month)
    }
  }
</script>

<template>
  <table class="calendar">
    {{ days }}
  </table>
</template>

<style lang="sass" scoped>

</style>
