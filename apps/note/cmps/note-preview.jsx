import { TodoPreview } from "../cmps/note-todo-preview.jsx"
import { eventBusService } from "../../../services/event-bus.service.js";
const { Link, NavLink, withRouter } = ReactRouterDOM

export class NotePreview extends React.Component {


    handleInputChange = ({ target }) => {
        const color = target.value
        const id = target.name
        this.props.onColorChange(id, color)
    }

    render() {
        const { note, onRemoveNote, handleNote, onPinNote } = this.props

        return <section className="note-preview" style={{ backgroundColor: note.details.color }}>
            {note.type === 'text' && <div>{`${note.details.txt}`}</div>}
            {note.type === 'image' && <img className="note-img" src={note.details.txt} />}
            {note.type === 'video' && <video className="note-vid" src={note.details.txt} controls autoPlay></video>}
            {note.type === 'todo' && < TodoPreview note={note} />}
            {note.type === 'audio' && <audio ref="audio_tag" src={note.details.txt} controls />}

            <div className="note-btns-container">
                <img src="assets/img/icons/trash.png" title="Discard" onClick={() => onRemoveNote(note.id)} className="note-btn" alt="" />
                <label >
                    <img className="note-btn" src="assets/img/icons/color.png" title="Color" alt="" />
                    <input name={note.id} type="color" hidden onChange={this.handleInputChange} />
                </label>
                <img src="assets/img/icons/pencil.png" onClick={() => handleNote(note)} title="Edit" className="note-btn" alt="" />
                <img src="assets/img/icons/pin-icon.png" onClick={() => onPinNote(note.id)} title="Pin" className="note-btn" alt="" />
                <Link to={`/mail/compose/${note.details.txt}`}> <img className="note-btn" src="assets/img/icons/send-icon.png" title="send as mail" alt="" /></Link>
            </div>
        </section>
    }

}