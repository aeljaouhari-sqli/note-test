<script setup>
import { ref, computed } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { useRoute } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'

const route = useRoute()
const action = route.params.action
const store = useNotesStore()
store.fetchNotes()
const notes = computed(() => {
  return store.notes
})
let id = uuidv4()
const actionTitle = computed(() => (action === 'edit' ? 'Edite note' : 'Add note'))
const note = ref({
  title: '',
  content: ''
})
function submitNote() {
  console.log(id)
  const newNote = {
    title: note.value.title,
    content: note.value.content
  }
  if (action === 'edit') {
    store.editNote(route.params.id, newNote)
  } else {
    store.addNote({ ...newNote, id: id })
  }
  note.value.title = ''
  note.value.content = ''
}
</script>

<template>
  <h1 class="mb-2 text-gray-900">{{ actionTitle }}</h1>
  <div class="p-4 border rounded shadow-lg">
    <form @submit.prevent="submitNote">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          id="title"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="note.title"
        />
      </div>
      <div class="mb-4">
        <label for="content" class="block text-gray-700 text-sm font-bold mb-2">Content</label>
        <textarea
          id="content"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="note.content"
          rows="4"
        />
      </div>
      <button class="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
        save
      </button>
    </form>
  </div>
</template>
