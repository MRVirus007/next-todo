import { observable, action, makeObservable } from "mobx";
import { getNotes, addNote, updateNote, deleteNote } from "../backend/api";

class NoteStore {
  @observable notes: any[] = [];

  @action
  async fetchNotes() {
    try {
      const notes = await getNotes();
      this.notes = notes;
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  @action
  async createNote(note: any) {
    try {
      const newNote = await addNote(note);
      this.notes.push(newNote);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }

  @action
  async updateNote(note: any) {
    try {
      await updateNote(note);
      const index = this.notes.findIndex((n) => n.id === note.id);
      if (index !== -1) {
        this.notes[index] = note;
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  @action
  async deleteNote(taskId: number) {
    try {
      await deleteNote(taskId);
      this.notes = this.notes.filter((note) => note.id !== taskId);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }
  constructor() {
    makeObservable(this);
  }
}

export default new NoteStore();
