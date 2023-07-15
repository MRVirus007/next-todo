import { observable, action, makeObservable } from "mobx";
import {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
  updateStatus,
} from "../backend/api";

class NoteStore {
  @observable notes: any[] = [];

  @action
  fetchNotes = async (status: string = "in-progress") => {
    try {
      console.log("from store:: ", status);
      const notes = await getNotes();
      this.notes = notes.filter((note: any) => note.status === status);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  @action
  createNote = async (note: any) => {
    try {
      const newNote = await addNote(note);
      console.log("store createNote:: ", newNote);
      this.notes.push(newNote);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  @action
  updateNote = async (note: any) => {
    try {
      await updateNote(note);
      const index = this.notes.findIndex((n) => n.id === note.id);
      if (index !== -1) {
        this.notes[index] = note;
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  @action
  deleteNote = async (taskId: number) => {
    try {
      await deleteNote(taskId);
      this.notes = this.notes.filter((note) => note.id !== taskId);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  constructor() {
    makeObservable(this);
  }
}

export default new NoteStore();
