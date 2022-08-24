import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteEdit } from "./note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteService } from "../services/note.service.js"

export class NoteApp extends React.Component {

  state = {
    notes: null,
    filterBy: null,
    selectedNote: null,
    searchByNote: null
  }


  componentDidMount() {
    this.loadNotes()
  }

  loadNotes() {
    const { filterBy } = this.state
    NoteService.query(filterBy)
      .then(notes => this.setState({ notes }))

  }

  onFilterChange = (filterBy) => {
    this.setState({ filterBy }, this.loadNotes)
  }

  onRemoveNote = (id) => {
    NoteService.removeNote(id)
      .then(this.loadNotes())
  }

  onAddNote = (text, type) => {
    NoteService.addNote(text, type)
        .then(this.loadNotes())
}

  handleNote = (note) => {
    this.setState({ selectedNote: note })
  }

  onColorChange = (id, color) => {
    NoteService.changeColor(id, color)
      .then(this.loadNotes())
  }
  render() {
    const { notes, selectedNote } = this.state

    return <section className="note-app">
      <NoteFilter onFilterChange={this.onFilterChange} />
      <div className="main-container">
        {selectedNote && <NoteEdit note={selectedNote}  />}
        <NoteAdd onAddNote={this.onAddNote}/>

        <NoteList notes={notes} handleNote={this.handleNote} onRemoveNote={this.onRemoveNote} onColorChange={this.onColorChange} />
      </div>
    </section>
  }
}