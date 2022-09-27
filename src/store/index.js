import { createStore } from "vuex";
import sectionData from "../sectiondata.json";
const store = createStore({
  state() {
    return {
      selectComponent: "add-row",
      blockList: [],
      data: sectionData,
    };
  },
  mutations: {
    setSelectComponent(state, value) {
      state.selectComponent = value;
    },
    insertBlockList(state, value) {
      state.blockList.push(value);
    },
    addBlock(state, obj) {
      state.blockList.splice(obj.id, 1, obj.value);
    },
    setBlock(state, obj) {
      state.blockList.map((item, i) => {
        obj.id === i ? (item = obj.value) : "";
        return item;
      });
    },
    setBlockList(state, value) {
      state.blockList = value;
    },
  },
});
export function useStore() {
  return store;
}
export default store;
