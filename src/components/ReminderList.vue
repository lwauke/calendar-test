<script>
import Modal from "./Modal.vue";
import ReminderForm from "./ReminderForm.vue";
import ReminderItem from "./ReminderItem.vue";

export default {
  props: ["fullDate"],
  components: {
    ReminderItem,
    Modal,
    ReminderForm,
  },
  data() {
    return {
      showModal: false,
      activeUUID: "",
    };
  },
  computed: {
    reminders: function () {
      return this.$store?.getters?.getByDate(this.fullDate) || [];
    },
  },
};
</script>

<template>
  <div>
    <Modal v-if="showModal" @close="showModal = false">
      <template v-slot:body>
        <ReminderForm :edit="true" :uuid="activeUUID" :fullDate="fullDate" />
      </template>
    </Modal>
    <ul class="list">
      <ReminderItem
        v-for="reminder in reminders"
        :key="reminder.uuid"
        v-bind="reminder"
        :fullDate="fullDate"
        @click="
          showModal = true;
          activeUUID = reminder.uuid;
        "
      />
    </ul>
  </div>
</template>

<style lang="sass" scoped>
.list
  padding: 0
  margin: 0
</style>
