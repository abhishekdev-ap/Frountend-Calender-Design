import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { StickyNote, Trash2, Plus } from 'lucide-react';

interface Note {
  id: string;
  text: string;
  timestamp: number;
}

interface NotesSectionProps {
  currentDate: Date;
  startDate: Date | null;
  endDate: Date | null;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ currentDate, startDate, endDate }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputText, setInputText] = useState('');
  
  // Decide which "key" to use for localStorage
  // If dates are selected, use the date range. Otherwise use the month.
  const getStorageKey = () => {
    if (startDate && endDate) {
      return `notes-${format(startDate, 'yyyy-MM-dd')}-to-${format(endDate, 'yyyy-MM-dd')}`;
    } else if (startDate) {
      return `notes-${format(startDate, 'yyyy-MM-dd')}`;
    }
    return `notes-month-${format(currentDate, 'yyyy-MM')}`;
  };

  const currentKey = getStorageKey();

  const getDisplayTitle = () => {
    if (startDate && endDate) {
      return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')} Notes`;
    } else if (startDate) {
      return `${format(startDate, 'MMM d')} Notes`;
    }
    return `${format(currentDate, 'MMMM')} Memos`;
  };

  // Load notes when the key changes
  useEffect(() => {
    const savedNotes = localStorage.getItem(currentKey);
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Failed to parse notes from storage', e);
        setNotes([]);
      }
    } else {
      setNotes([]);
    }
  }, [currentKey]);

  // Save notes whenever they change
  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
    localStorage.setItem(currentKey, JSON.stringify(updatedNotes));
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const newNote: Note = {
      id: Date.now().toString(),
      text: inputText.trim(),
      timestamp: Date.now()
    };
    
    saveNotes([...notes, newNote]);
    setInputText('');
  };

  const handleDeleteNote = (id: string) => {
    saveNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="notes-section">
      <div className="notes-header">
        <StickyNote size={18} />
        {getDisplayTitle()}
      </div>
      
      <form className="notes-input-area" onSubmit={handleAddNote}>
        <input 
          type="text" 
          className="notes-input" 
          placeholder="Add a note..." 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="notes-submit" aria-label="Add note">
          <Plus size={18} />
        </button>
      </form>

      <div className="notes-list">
        {notes.length === 0 && (
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic', padding: '0.5rem 0' }}>
            No notes yet for this period.
          </div>
        )}
        {notes.map(note => (
          <div key={note.id} className="note-item">
            <span>{note.text}</span>
            <button 
              className="note-delete"
              onClick={() => handleDeleteNote(note.id)}
              aria-label="Delete note"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
