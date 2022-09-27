<template>
  <div class="mx-5 my-2 p-2">
    <draggable-list></draggable-list>
    <component :is="store.state.selectComponent"></component>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useStore } from "./store";
import AddRow from "./components/AddRow.vue";
import BlockList from "./components/BlockList.vue";
import DraggableList from "./components/DraggableList.vue";

export default defineComponent({
  components: { AddRow, BlockList, DraggableList },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>

<style scoped>
</style>