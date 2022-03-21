<script>
import debounce from "lodash.debounce";
export default {
  props: ["list", "keySearch", "keyList", "initialFilter"],
  data() {
    return {
      filter: "",
      filteredList: [],
    };
  },
  watch: {
    filter(input) {
      debounce(() => {
        this.filteredList = this.list.filter((item) =>
          new RegExp(input, "ig").test(item[this.keySearch] || item)
        );
      }, 150)();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.filter = this.initialFilter;
    });
  },
};
</script>

<template>
  <div>
    <input type="text" v-model="filter" />
    <ul v-if="filter && filteredList.length">
      <li
        v-for="item in new Set(filteredList)"
        :key="item[keyList] || item"
        @click="$emit('selectItem', item)"
      >
        {{ item[keySearch] || item }}
      </li>
    </ul>
  </div>
</template>

<style lang="sass" scoped>
.list
  padding: 0
  margin: 0
</style>
