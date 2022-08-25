import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes,onRemoveNote,onColorChange,handleNote,onPinNote }) {
    

    return <React.Fragment>
        {notes && <section className="note-list">
                {notes.map(note=><NotePreview key={note.id}onPinNote={onPinNote} note={note} onRemoveNote={onRemoveNote} onColorChange={onColorChange}handleNote={handleNote}/>)}
                </section>}
    </React.Fragment>
}