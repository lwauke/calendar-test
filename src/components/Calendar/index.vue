<script>
  import generateMonth from '../../helpers/generateMonth';
  import DateComponent from '../Date/index.vue';

  const now = new Date();

  export default {
    components: {
      Date: DateComponent
    },
    data () {
      return {
        month: now.getMonth(),
        year: now.getFullYear(), 
        dates: [],
        weeks: 0
      }
    },
    mounted () {
      this.dates = generateMonth(this.year, this.month);
    },
    methods: {
      getWeek (n) {
        const index = (n - 1) * 7;
        return this.dates.slice(index, index + 7);
      }
    }
  }
</script>

<template>
  <table class="calendar">
    <tr
      v-for="i
      in dates.length / 7"
      :key="i"
    >
      <Date
        v-for="{date, actualMonth } in getWeek(i)"
        :key="date + month"
        :date="date"
        :actualMonth="actualMonth"
        :fullDate="`${year}-${month}-${date}`"
      />
    </tr>
  </table>
</template>

<style lang="sass" scoped>

</style>
