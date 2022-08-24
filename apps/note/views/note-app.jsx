import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteEdit } from "./note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteService } from "../services/note.service.js"

export class NoteApp extends React.Component {

  state = {
    notes: null,
    filterBy: null,
    chosenNote: null,
    searchByNote: null
  }


  componentDidMount() {
    this.loadNotes()
  }

  loadNotes() {
    const { filterBy} = this.state
    NoteService.query(filterBy)
        .then(notes => this.setState({ notes }))

}

onFilterChange = (filterBy) => {
  this.setState({ filterBy }, this.loadNotes)
}

  render() {
    const { notes} = this.state

    return <section className="note-app">
      <NoteFilter onFilterChange={this.onFilterChange}/>
      <NoteList notes={notes} />
      {/* <NoteEdit /> */}
    </section>
  }
}