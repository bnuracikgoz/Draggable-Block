<template>
  <div class="w-100 p-5 mt-5 add-body">
    <div class="text-end cursor-pointer" @click="changeSelectComponent">
      <font-awesome-icon icon="fa-xmark fa-6x" size="2x" />
    </div>
    <div class="w-100 mx-auto block-list">
      <div class="row container">
        <h5 class="text-center">SATIR YAPISINI SEÇİNİZ</h5>
        <div
          class="col-12 col-md-6 col-lg-2 block-item mt-5"
          v-for="item in store.state.data"
          :key="item.id"
        >
          <!-- id => {{ item }} -->
          <svg
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 100 50"
            @click="selectedRow(item)"
            class="w-75"
          >
            <path :d="item.svgattr" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useStore } from "../store";
import _ from "lodash";
export default defineComponent({
  name: "blockList",
  setup() {
    const store = useStore();

    const guid = () => {
      let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };
      //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
      return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
      );
    };

    const changeSelectComponent = () => {
      store.commit("setSelectComponent", "add-row");
    };

    const selectedRow = (item) => {
      var newItem = _.cloneDeep(item);
      newItem.id = guid();
      if (newItem.kolon && newItem.kolon.length > 0) {
        newItem.kolon.forEach((col) => {
          col.id = guid();
        });
      }
      store.commit("insertBlockList", newItem);
      changeSelectComponent();
    };

    return {
      guid,
      store,
      changeSelectComponent,
      selectedRow,
      guid,
    };
  },
});
</script>

<style scoped>
.add-body {
  height: fit-content;
  border: 4px dashed #e5e8eb;
}
.block-list {
  justify-content: center;
  align-items: center;
  display: flex;
}
.block-item {
  margin: 10px 0px;
}
.block-item svg {
  width: 100px;
  fill: #b7c4cf;
}
.block-item svg:hover {
  fill: black;
  cursor: pointer;
}
.fa-xmark {
  color: #e5e8eb;
}
</style>
