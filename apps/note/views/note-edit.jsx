import { sendMail, eventBusService } from '../../../services/event-bus.service.js'

export class NoteEdit extends React.Component {

  state = {
    text: this.props.note.details.txt,
  }

  onChangeText = ({ target }) => {
    const text = target.value
    this.setState({ text })
  }

  onUpdateNote = () => {
    const { id } = this.props.note
    const { text } = this.state
    this.props.updateNote(id, text)
  }

  render() {
    const { note, onGoBack } = this.props

    return <div className="note-edit">
      {<textarea value={this.state.text} onChange={this.onChangeText}></textarea>}
      <div className="note-edit-btns-container">
        <img src="assets/img/icons/save-icon.png" title="save" onClick={this.onUpdateNote} alt="" />
        <img src="assets/img/icons/go-back.png" title="back" onClick={onGoBack} alt="" />
      </div>
    </div>
  }
}