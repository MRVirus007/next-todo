'use client';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './TaskFilter.module.css';
import { useState } from 'react';

export default function TaskFilter(category: any) {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const onCategorySelected = (category:any) => {
        setSelectedCategory(category);
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
                selectedCategory === 'Completed' ? 'text-primary' : ''
              }`}
              href="#"
              onClick={() => onCategorySelected('Completed')}
            >
              Completed
            </a>
          </li>
          <li>
            <a
              className={`${styles.dropdown_item} ${
                selectedCategory === 'In-Progress' ? 'text-primary' : ''
              }`}
              href="#"
              onClick={() => onCategorySelected('In-Progress')}
            >
              In Progress
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

