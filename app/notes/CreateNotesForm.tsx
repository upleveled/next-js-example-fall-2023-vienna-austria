'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './notes.module.scss';

export default function CreateNoteForm() {
  const [title, setTitle] = useState('');
  const [textContent, setTextContent] = useState('');

  const router = useRouter();

  return (
    <div className={styles.noteForm}>
      <div>
        <h2>Create Note</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await fetch('/api/notes', {
              method: 'POST',
              body: JSON.stringify({
                title,
                textContent,
              }),
            });
            router.refresh();
            setTitle('');
            setTextContent('');
          }}
        >
          <label>
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
            />
          </label>

          <label>
            Note
            <input
              value={textContent}
              onChange={(event) => setTextContent(event.currentTarget.value)}
            />
          </label>

          <button>Add Note</button>
        </form>
      </div>
    </div>
  );
}
