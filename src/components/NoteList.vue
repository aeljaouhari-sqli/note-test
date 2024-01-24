<script setup>
import { computed } from 'vue'
import NoteItem from './NoteItem.vue'
import { useNotesStore } from '@/stores/notes'

const store = useNotesStore()
store.fetchNotes()
const notes = computed(() => store.notes)
</script>

<template>
  <router-link
    class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mb-4 inline-block ml-8"
    to="noteEditor/add/newnote"
    >Add a note</router-link
  >
  <div class="notes-parent">
    <NoteItem class="space-y-4" v-for="note in notes" :key="note.id" :note="note" />
  </div>
</template>

<style scoped></style>
