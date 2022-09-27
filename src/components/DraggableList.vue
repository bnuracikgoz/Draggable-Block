<template>
  <div class="mt-5" v-if="blockList().length > 0">
    <!-- satır -->
    <draggable
      :list="blockList()"
      group="id"
      item-key="id"
      @change="changeRow($event)"
    >
      <template #item="{ element, index }">
        <div class="w-100 row mt-1" style="height: 40px">
          <div
            v-show="index === selectRow"
            class="d-flex justify-content-center selection-button mx-auto"
            :class="{
              'd-flex position-absolute': index === selectRow,
              'd-none': index !== selectRow,
            }"
            @mouseover="selectRow = index"
            @mouseleave="selectRow = ''"
          >
            <div class="cursor-pointer blue" @click="addRow(element)">
              <font-awesome-icon icon="fa-solid fa-plus" />
            </div>
            <div class="cursor-pointer blue">
              <font-awesome-icon icon="fa-solid fa-grip" />
            </div>
            <div class="cursor-pointer blue" @click="removeRow(element, index)">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </div>
          </div>
          <draggable
            :list="element.kolon"
            group="id"
            item-key="element.id"
            class="d-flex w-100 blue-border cursor-pointer"
            @mouseover="selectRow = index"
            @mouseleave="selectRow = ''"
            @change="changeColumn($event, index)"
          >
            <template #item="{ element }">
              <div
                :id="element.id"
                class="slate my-1 mx-2 d-flex justify-content-center black"
                :style="{ width: element.width + '%' }"
              > 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi bi-plus icon-size"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                  />
                </svg>
              </div>
            </template>
          </draggable>
        </div>
      </template>
    </draggable>
  </div>
</template>
<script>
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "../store";
import draggable from "vuedraggable";

export default defineComponent({
  components: { draggable },
  setup() {
    const store = useStore();
    const selectRow = ref("");
    const blockList = () => {
      return store.state.blockList;
    };

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

    const changeRow = (e) => {
      if (!!e.added) {
        let event = e.added;
        store.commit("addBlock", {
          id: event.newIndex,
          // value: event.element,
          value: {
            id: guid(),
            svgattr: "M100,0V50H0V0Z",
            kolon: [
              {
                id: event.element.id,
                width: 100,
              },
            ],
          },
        });
      }
    };

    const addRow = (e) => {
      let list = blockList();
      list.push(e);
      store.commit("setBlockList", list);
    };

    const removeRow = (e, i) => {
      let list = blockList();
      list.splice(i, 1);
      store.commit("setBlockList", list);
    };

    const changeColumn = (e, i) => {
      let list = blockList();
      if (!!e.removed) {
        if (list[i] && list[i].kolon) {
          let newCol = list[i].kolon.map((element) => {
            element.width = 100;
            return element;
          });
          list[i].kolon = newCol;
        }

        store.commit(
          "setBlockList",
          list.map((element) => {
            if (typeof element.id == "string") {
              return {
                id: 10,
                svgattr: "M100,0V50H0V0Z",
                kolon: [
                  {
                    id: element.id + "-" + i,
                    width: 100,
                  },
                ],
              };
            }
            return element;
          })
        );
      } else if (!!e.added) {
        let colCount = list[i].kolon.length;
        let newCol = list[i].kolon.map((element) => {
          element.width = 100 / colCount;
          return element;
        });
        // let newArr = (blockList.value[i].kolon = newCol);

        store.commit("setBlock", { id: i, value: newCol });
      }
      store.commit(
        "setBlockList",
        list.filter((x) => x.kolon && x.kolon.length > 0)
      );
      store.commit(
        "setBlockList",
        list.filter((x) => x.kolon && x.kolon.length > 0)
      );
    };

    return {
      blockList,
      changeRow,
      removeRow,
      changeColumn,
      selectRow,
      addRow,
    };
  },
});
</script>
<style scoped>
.row {
  height: 2.5rem;
}
.fa-plus,
.fa-grip,
.fa-xmark {
  color: white;
}
</style>
