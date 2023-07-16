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
    error: types.maybeNull(types.string),
  })
  .actions((self) => ({
    fetchNotes: flow(function* (status = "in-progress") {
      try {
        const notes = yield getNotes();
        self.notes = notes.filter((note) => note.status === status);
        self.error = null;
      } catch (error) {
        self.error = "Error fetching notes: " + error;
        console.error("Error fetching notes:", error);
        return false;
      }
      return true;
    }),

    createNote: flow(function* (note) {
      try {
        const newNote = yield addNote(note);
        self.notes.push(newNote);
      } catch (error) {
        self.error = "Error creating notes: " + error;
        console.error("Error creating note:", error);
        return false;
      }
      return true;
    }),
    updateNote: flow(function* (note, status) {
      try {
        note.status = status;
        yield updateNote(note);
        const index = self.notes.findIndex((n) => n.id === note.id);
        if (index !== -1) {
          self.notes[index] = note;
        }
      } catch (error) {
        self.error = "Error updating notes: " + error;
        console.log("Error updating notes: " + error);
        return false;
      }
      return true;
    }),

    deleteNote: flow(function* (taskId) {
      try {
        yield deleteNote(taskId);
        self.notes = self.notes.filter((note) => note.id !== taskId);
      } catch (error) {
        self.error = "Error deleting notes: " + error;
        console.error("Error deleting note:", error);
        return false;
      }
      return true;
    }),
    clearError() {
      self.error = null;
    },
  }));

export default NoteStore.create({
  notes: [],
});
