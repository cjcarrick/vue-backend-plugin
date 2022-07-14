<script setup lang="ts">
import { ref } from 'vue'
import { TodoList, Todo } from '@api/index'
import { PlusIcon } from '@heroicons/vue/solid'

const tdl = new TodoList({ basename: '/api' })
const items = ref<Todo[]>([])

getTodos()
async function getTodos(options?: { offset?: number; limit?: number }) {
  const data = await tdl.all(options)
  data.forEach(d => {
    if (!items.value.find(e => e.id === d.id)) {
      items.value.push(d)
    }
  })
}

const newItem = ref('')

async function addItem(ev: Event) {
  ev.preventDefault()
  await fetch(`http://localhost:3001/api/new?title=${encodeURIComponent(newItem.value)}`, { method: 'POST' })
  newItem.value = ''
  await getTodos({ limit: 1, offset: items.value.length })
}
</script>

<template>
  <h3>Todos</h3>
  <label class="todo" v-for="t in items" :key="t.id">
    <input type="checkbox" :checked="t.completed" />
    <span>{{ t.title }}</span>
  </label>

  <form class="todo" @submit="addItem">
    <button type="submit" :disabled="!newItem">
      <PlusIcon />
    </button>
    <input type="text" v-model="newItem" />
  </form>
</template>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

.todo {
  display: flex;
  flex-direction: row;
  gap: $pad;
  text-align: left;
  max-width: 480px;
  margin: 0 auto;

  input {
    display: block;
  }

  + .todo {
    margin-top: $pad * 2;
  }
}

form {
  display: flex;
  align-items: center;
  gap: $pad;
  input {
    width: 100%;
    display: block;
    flex: 1;
    padding: $pad;
    border-radius: $br;
    background-color: $bgAlt;
    &:focus {
      outline: none;
    }
  }
  button {
    line-height: 0;
    background-color: $color;
    color: $bg;
    width: 1.45em;
    height: 1.45em;
    svg {
      width: 0.8em;
      height: 0.8em;
    }

    opacity: 0.3;
    &:not(:disabled) {
      cursor: pointer;
      opacity: 1;
    }
  }
}

input[type='checkbox'] {
  appearance: none;
  outline-offset: 0.15em;
  outline: 0.15em solid hsl(0, 0, 85%);
  margin: 0.15rem;
  width: 1em;
  height: 1em;

  &:checked {
    background-color: $color;
    outline-color: $color;

    opacity: 0.33;
    + span {
      opacity: 0.33;
    }
  }
}

span,
input {
  transition: 0.05s;
}

input[type='checkbox'],
button[type='submit'] {
  border-radius: 100px;
  margin-right: $pad * 3;
}

input,
button {
  padding: 0;
  border: none;
}

span {
  user-select: none;
}
</style>
