import { defineStore } from 'pinia'
import axios from 'axios'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: []
  }),
  getters: {
    // getNoteByID
    getNoteById: (state) => (id) => {
      return state.notes.find((note) => note.id === id)
    }
  },
  actions: {
    // fetch all notes
    async fetchNotes() {
      try {
        const response = await axios.get('http://localhost:3000/notes')
        this.notes = response.data
      } catch (error) {
        console.error('ERROR Fetching Notes :', error)
      }
    },
    async addNote(newNote) {
      try {
        const response = await axios.post('http://localhost:3000/notes', newNote)
        this.$patch({ notes: [newNote, ...this.notes] })
      } catch (error) {
        console.error('ERROR Adding Note:', error)
      }
    },
    async editNote(id, editedNote) {
      try {
        this.$patch({
          notes: this.notes.map((item) => {
            if (item.id == id) {
              return { ...editedNote, id: id }
            } else {
              return item
            }
          })
        })
        const response = await axios.put(`http://localhost:3000/notes/${id}`, editedNote)
      } catch (error) {
        console.error('ERROR editing Note:', error)
      }
    },
    async removeNote(id) {
      try {
        this.$patch({ notes: this.notes.filter((item) => item.id != id) })
        const response = await axios.delete(`http://localhost:3000/notes/${id}`)
      } catch (error) {
        console.error('ERROR deleting Note:', error)
      }
    }
  }
})
