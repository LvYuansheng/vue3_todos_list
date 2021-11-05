<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isTrue" />
    </label>
    <span>
      <span>已完成{{ count }}</span> / 全部{{ todos.length }}
    </span>
    <button class="btn btn-danger" @click="clearIsTrue">清除已完成任务</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Todo } from "../types/todo";

export default defineComponent({
  name: "Footer",

  props: {
    todos: {
      type: Array as () => Todo[],
      required: true,
    },
    setCheckAll: {
      type: Function,
      required: true,
    },
    clearIsTrueAll: {
      type: Function,
      required: true
    }
  },

  setup(props) {
    // 计算已完成的数量
    const count = computed(() => {
      return props.todos.reduce((pre, todo) => pre + (todo.isTrue ? 1 : 0), 0);
    });
    // 计算按钮的全选和全不选
    const isTrue = computed({
      get() {
        return count.value > 0 && props.todos.length == count.value;
      },
      set(val) {
        props.setCheckAll(val);
      },
    });
    // 清除已完成
    const clearIsTrue = () => {
      props.clearIsTrueAll()
    };

    return {
      count,
      isTrue,
      clearIsTrue,
    };
  },
});
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>