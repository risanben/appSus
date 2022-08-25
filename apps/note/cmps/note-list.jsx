import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes, onRemoveNote, onColorChange, handleNote, onPinNote }) {

    function _getPinnedNotes() {
        const pinnedNotes = notes.filter(note => note.isNotePinned === true)
        return pinnedNotes
    }
    function _getUnPinnedNotes() {
        const unPinnedNotes = notes.filter(note => note.isNotePinned === false)
        return unPinnedNotes
    }

    return <React.Fragment>
        <h4 className="pinned">Pinned:</h4><br />
        {notes && <section className="pinned-note-list">
            {(_getPinnedNotes().length > 0) && _getPinnedNotes().map(note => <NotePreview key={note.id} onPinNote={onPinNote} note={note} onRemoveNote={onRemoveNote} onColorChange={onColorChange} handleNote={handleNote} />)}
        </section>}
        <h4 className="others">Others:</h4><br />
        {notes && <section className="note-list">
            {_getUnPinnedNotes().length && _getUnPinnedNotes().map((note) => <NotePreview key={note.id} onPinNote={onPinNote} note={note} onRemoveNote={onRemoveNote} onColorChange={onColorChange} handleNote={handleNote} />)}
        </section>}
    </React.Fragment>
}