<template>
  <li
    @mouseenter="mouseHandler(true)"
    @mouseleave="mouseHandler(false)"
    :style="{ backgroundColor: bgcolor, color: mycolor }"
  >
    <label>
      <input type="checkbox" v-model="isTrue" />
      <span>{{ todo.title }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delTodo">
      删除
    </button>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Todo } from "../types/todo";

export default defineComponent({
  name: "Item",

  props: {
    todo: {
      type: Object as () => Todo,
    },
    deleteTodo: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    updateIsTrue: {
      type: Function,
      required: true,
    },
  },

  setup(props) {
    const bgcolor = ref("white");
    const mycolor = ref("black");
    const isShow = ref(false);
    // 设置item高亮
    const mouseHandler = (flag: boolean) => {
      if (flag) {
        bgcolor.value = "pink";
        mycolor.value = "skyblue";
        isShow.value = true;
      } else {
        bgcolor.value = "white";
        mycolor.value = "black";
        isShow.value = false;
      }
    };
    // 删除按钮的方法
    const delTodo = () => {
      if (window.confirm("确定删除吗？")) {
        props.deleteTodo(props.index);
      }
    };
    // 通过计算属性计算复选框的选中和不选中
    const isTrue = computed({
      get() {
        return props.todo.isTrue;
      },
      set(val) {
        props.updateIsTrue(props.todo, val);
        console.log(val);
      },
    });

    return {
      mouseHandler,
      delTodo,
      isTrue,
      bgcolor,
      mycolor,
      isShow,
    };
  },
});
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>