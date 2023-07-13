'use client';
import DateComponent from './DateComponent';
import TaskFilter from './TaskFilter';
import {addNote, deleteNote, getNotes} from '../backend/api'
import { useEffect, useState } from 'react';
import {useForm} from "react-hook-form";
import Loader from './utilities/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function TaskList() {
    const {register, handleSubmit, reset, formState: {isSubmitting}} = useForm();
    const [notes, setNotes] = useState([]);

    function GetNotes() {
        getNotes().then((notes:any) => {
            setNotes(notes);
        });
    }

    useEffect(() => {
        GetNotes();
    }, [isSubmitting]);

    const onSubmit = async (data: object) => {
        await addNote(data);
        reset();
    }

    const removeNote = async (id: number) => {
        await deleteNote(id);
        GetNotes();
    }
    
    return (
        <>
            <div className="container">
                <DateComponent />
                <TaskFilter />
                <div className="clear-both"></div>
                {notes.length !== 0 ? <ul>
                    {notes.map((note:any) => (
                        <li key={note?.id}>{note?.title}<button
                        className={`btn border-none fill-close-btn`}
                        onClick={() => removeNote(note?.id)}
                        >
                           
                        {/* <FontAwesomeIcon icon="fa-regular fa-circle" className={`fs-4 text-danger`} /> */}
                        </button>
                        </li>
                    ))}
                </ul> : <Loader/>}
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder='Title' {...register("title", {required: true})}/>
                
                    <label htmlFor="description">Description</label>
                    <input type="text" placeholder='Description' {...register("description", {required: true})}/>
                
                    <button type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-green-400 transition duration-150 ease-in-out border-2 border-green-400 rounded-md shadow ${isSubmitting ? 'cursor-not-allowed' : ''}`}
                        >
                        {isSubmitting ?
                                <Loader/>
                            : "Submit"}
                    </button>
                </form>
            </div>
        </>
    );
}