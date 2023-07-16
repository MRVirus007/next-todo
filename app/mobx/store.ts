import { types, flow } from "mobx-state-tree";
import { getNotes, addNote, updateNote, deleteNote } from "../backend/api";

const Note = types.model("Note", {
  id: types.identifier,
  title: types.string,
  description: types.string,
  status: types.string,
});

const NoteStore = types
  .model("NoteStore", {
    notes: types.array(Note),
  })
  .actions((self) => ({
    fetchNotes: flow(function* (status = "in-progress") {
      try {
        const notes = yield getNotes();
        self.notes = notes.filter((note) => note.status === status);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }),

    createNote: flow(function* (note) {
      try {
        const newNote = yield addNote(note);
        self.notes.push(newNote);
      } catch (error) {
        console.error("Error creating note:", error);
      }
    }),

    updateNote: flow(function* (note) {
      try {
        yield updateNote(note);
        const index = self.notes.findIndex((n) => n.id === note.id);
        if (index !== -1) {
          self.notes[index] = note;
        }
      } catch (error) {
        console.error("Error updating note:", error);
      }
    }),

    deleteNote: flow(function* (taskId) {
      try {
        yield deleteNote(taskId);
        self.notes = self.notes.filter((note) => note.id !== taskId);
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }),
  }));

export default NoteStore.create({
  notes: [],
});
