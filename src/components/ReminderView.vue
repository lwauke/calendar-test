<script>
import msToHours from "../helpers/msToHours.js";

export default {
  props: ["uuid", "fullDate"],
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    reminderData: function () {
      return this.$store.getters.getByUUID({
        date: this.fullDate,
        uuid: this.uuid,
      });
    },
  },
  methods: {
    msToHours,
  },
};
</script>

<template>
  <section :data-test-id="`reminder-view-${fullDate}`">
    <p>{{ reminderData.reminder }}</p>
    <h5>Time</h5>
    <p>
      {{ fullDate }}
      from {{ msToHours(reminderData.start) }} to
      {{ msToHours(reminderData.end) }}
    </p>
    <h5>Weather</h5>
    <p>{{ reminderData.weather || "No data available" }}</p>
    <h5>Location</h5>
    <p>{{ reminderData.city }} - {{ reminderData.country }}</p>
  </section>
</template>

<style lang="sass" scoped>
p
  margin-bottom: 22px
h5
  margin-bottom: 10px
</style>
