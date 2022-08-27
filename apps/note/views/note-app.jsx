import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteEdit } from "./note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js';


// import { eventBusService } from '../../../services/event-bus.service.js'

export class NoteApp extends React.Component {
  state = {
    notes: null,
    filterBy: null,
    selectedNote: null,
    text: '',
    type: '',
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
      .then(showSuccessMsg('Note removed'))


  }

  onAddNote = (text, type) => {
    NoteService.addNote(text, type)
      .then(this.loadNotes())
      .then(showSuccessMsg('Note added'))

  }

  handleNote = (note) => {
    this.setState({ selectedNote: note })
  }

  onPinNote = (id) => {
    NoteService.togglePin(id)
      .then(this.loadNotes())
  }

  onColorChange = (id, color) => {
    NoteService.changeColor(id, color)
      .then(this.loadNotes())
  }

  onGoBack = () => {
    this.setState({ selectedNote: null })
  }

  updateNote = (id, text) => {
    NoteService.saveUpdatedNote(id, text)
      .then(this.loadNotes())
      .then(this.setState({ selectedNote: null }))
      .then(showSuccessMsg('Note was Updated'))

  }

  render() {
    const { notes, selectedNote } = this.state
    return <section className="note-app">
      <NoteFilter onFilterChange={this.onFilterChange} />
      {selectedNote && <NoteEdit note={selectedNote} updateNote={this.updateNote} onGoBack={this.onGoBack} />}
      <div className="main-container">
        <NoteAdd onAddNote={this.onAddNote} />
        <NoteList notes={notes} onPinNote={this.onPinNote} handleNote={this.handleNote} onRemoveNote={this.onRemoveNote} onColorChange={this.onColorChange} />
      </div>
    </section>
  }
}