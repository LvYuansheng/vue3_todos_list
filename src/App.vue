<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List
        :todos="todos"
        :deleteTodo="deleteTodo"
        :updateIsTrue="updateIsTrue"
      />
      <Footer
        :todos="todos"
        :setCheckAll="setCheckAll"
        :clearIsTrueAll="clearIsTrueAll"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";
import { readTodo, saveTodo } from "./untils/localStroage";
// 引入接口
import { Todo } from "./types/todo";

export default defineComponent({
  name: "App",

  components: {
    Header,
    List,
    Footer,
  },

  setup() {
    const state = reactive<{ todos: Todo[] }>({
      todos: [],
    });

    onMounted(() => {
      state.todos = readTodo();
    });

    watch(
      () => state.todos,
      (val) => {
        saveTodo(val);
      },
      { deep: true }
    );

    // 添加数据的方法
    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo);
    };
    // 删除数据的方法
    const deleteTodo = (index: number) => {
      state.todos.splice(index, 1);
    };
    // 设置选中/不选中 复选框的方法
    const updateIsTrue = (todo: Todo, isTrue: boolean) => {
      todo.isTrue = isTrue;
      console.log(todo);
    };
    // 设置全选复选框
    const setCheckAll = (isTrue: boolean) => {
      state.todos.forEach((todo) => {
        todo.isTrue = isTrue;
      });
    };
    // 清除已完成
    const clearIsTrueAll = () => {
      state.todos = state.todos.filter((todo) => !todo.isTrue);
    };

    return {
      ...toRefs(state),
      addTodo,
      deleteTodo,
      updateIsTrue,
      setCheckAll,
      clearIsTrueAll,
    };
  },
});
</script>

<style scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
