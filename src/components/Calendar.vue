<script>
import generateMonth from "../helpers/generateMonth";
import DateComponent from "./Date.vue";

const now = new Date();

export default {
  components: {
    Date: DateComponent,
  },
  data() {
    return {
      month: now.getMonth(),
      year: now.getFullYear(),
      days: [],
      weeks: 0,
    };
  },
  mounted() {
    this.getDaysFromDate()
  },
  computed: {
    headers: function () {
      return [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
    }
  },
  methods: {
    getDaysFromDate () {
      this.days = generateMonth(this.year, this.month);
    },
    getWeek(n) {
      const index = (n - 1) * 7;
      return this.days.slice(index, index + 7);
    },
    handleDate(e) {
      const selectedDate = new Date(e.target.value)
      this.month = selectedDate.getMonth()
      this.year = selectedDate.getFullYear()
      this.getDaysFromDate()
    }
  },
};
</script>

<template>
  <div>
    <input type="date" @change="handleDate" step="30">
    <table class="calendar">
      <thead class="header-row">
        <th v-for="day in headers" :key="day" class="header">{{ day }}</th>
      </thead>
      <tr v-for="i in days.length / 7" :key="i" class="row">
        <Date
          v-for="{ date, relativeMonth } in getWeek(i)"
          :key="date + month"
          :date="date"
          :actualMonth="month + relativeMonth"
          :fullDate="`${year}-${month + relativeMonth}-${date}`"
        />
      </tr>
    </table>
  </div>
</template>

<style lang="sass" scoped>
.calendar
  display: block
.row
  display: flex
.row:last-child
  position: relative
  &::after
    content: ""
    width: 100%
    position: absolute
    bottom: 0
    height: 1px
    background: #000
.header-row
  display: flex
  background: #6ea2c9
  color: #fff
.header
  padding: 5px
  flex-grow: 1
</style>
