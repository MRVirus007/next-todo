'use client';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './TaskFilter.module.css';
import { useState } from 'react';
import store from '../../mobx/store';

export default function TaskFilter(status: string) {
  const [open, setOpen] = useState(false);
  const {fetchNotes } = store;
    const [selectedCategory, setSelectedCategory] = useState('in-progress');
    const onCategorySelected = (category:any) => {
      setSelectedCategory(category);
      fetchNotes(category);
    };

  return (
    <div className="float-right relative">
      <button className={`btn ${styles.btn_light}`} onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faEllipsis} className="fa-solid fs-4"/>
      </button>
          {open && (
              <ul className={ `${styles.dropdown_menu}`}>
          <li>
            <a
              className={`${styles.dropdown_item} ${
                selectedCategory === 'completed' ? 'text-blue-500 !important' : ''
              }`}
              href="#"
              onClick={() => onCategorySelected('completed')}
            >
              Completed
            </a>
          </li>
          <li>
            <a
              className={`${styles.dropdown_item} ${
                selectedCategory === 'in-progress' ? 'text-blue-500 !important' : ''
              }`}
              href="#"
              onClick={() => onCategorySelected('in-progress')}
            >
              In Progress
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

