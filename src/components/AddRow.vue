<template>
  <div class="w-100 p-5 mt-5 add-body">
    <div class="text-center">
      <div
        class="cursor-pointer"
        @mouseenter="beatVisable = true"
        @mouseleave="beatVisable = false"
        @click="changeSelectComponent"
      >
        <font-awesome-icon
          icon="fa-solid fa-circle-plus"
          size="3x"
          :beat-fade="beatVisable"
        />
      </div>

      <i class="d-block mt-4 fw-normal fs-5"> Yeni Satır Ekle</i>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useStore } from "../store";
export default defineComponent({
  name: "addRow",
  setup() {
    const store = useStore();
    const beatVisable = ref(false);

    const changeSelectComponent = () => {
      store.commit("setSelectComponent", "block-list");
    };

    return {
      beatVisable,
      changeSelectComponent,
    };
  },
});
</script>

<style scoped>
.add-body {
  height: 25vh;
  border: 4px dashed #e5e8eb;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fa-circle-plus {
  color: #142248;
}
</style>
