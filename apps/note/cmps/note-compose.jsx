import { NoteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js';


export class NoteCompose extends React.Component {
    state = {
        type: 'text',
        text: '',
    }

    componentDidMount() {
        this.loadNote()
    }

    loadNote = () => {
        const { text } = this.props.match.params
        this.setState(() => ({
            text: text,
            type: 'text',
        }))
    }

    handleChange = ({ target }) => {
        const text = target.value
        this.setState({ text })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { text, type } = this.state
        this.setState({ text: '' })
        this.setState({ type: 'text' })
        NoteService.addNote(text, type)
            .then(() => {
                showSuccessMsg('Note added')
                this.props.history.push('/mail')
            })

    }

    // onAddImg = () => {
    //     this.setState({ type: 'image' })
    // }
    // onAddVid = () => {
    //     this.setState({ type: 'video' })
    // }
    // onAddTodo = () => {
    //     this.setState({ type: 'todo' })
    // }

    // onAddVoice = () => {
    //     this.setState({ type: 'audio' })
    // }


    // record = {
    //     isRecording: false,
    //     recordingUrl: ''
    // }
    // onRecord = () => {

    //     navigator.mediaDevices.getUserMedia({ audio: true })
    //         .then(stream => {
    //             const mediaRecorder = new MediaRecorder(stream);
    //             mediaRecorder.start();

    //             const audioChunks = [];
    //             mediaRecorder.addEventListener("dataavailable", event => {
    //                 audioChunks.push(event.data);
    //             });

    //             mediaRecorder.addEventListener("stop", () => {
    //                 const audioBlob = new Blob(audioChunks);
    //                 const audioUrl = URL.createObjectURL(audioBlob);
    //                 this.record.recordingUrl = audioUrl
    //             });

    //             setTimeout(() => {
    //                 mediaRecorder.stop();
    //             }, 4000);
    //         });
    // }


    // onPlay = () => {
    //     const audio = new Audio(this.record.recordingUrl)
    //     audio.play()
    // }

    // onSaveRecording = () => {
    //     const text = this.record.recordingUrl
    //     const type = 'audio'
    //     this.props.onAddNote(text, type)
    //     this.setState({ text: '' })
    //     this.setState({ type: 'text' })
    // }



    render() {

        return <section className="note-add">
            <form className="note-add-form">
                {this.state.type === 'text' && <input type="text" value={this.state.text} onChange={this.handleChange} placeholder="Take a note..." />}
                {this.state.type === 'image' && <input type="text" value={this.state.text} onChange={this.handleChange} placeholder="Enter image URL..." />}
                {this.state.type === 'video' && <input type="text" value={this.state.text} onChange={this.handleChange} placeholder="Enter video URL..." />}
                {this.state.type === 'todo' && <input type="text" value={this.state.text} onChange={this.handleChange} placeholder="Type title and items separated by comma" />}
                {/* {this.state.type === 'audio' && <div className="audio-btns-container"><img className="rec-img img1" src="assets/img/icons/record-icon.png" title="record" onClick={this.onRecord} /><img src="assets/img/icons/play.png" title="play" className="rec-img img2" onClick={this.onPlay} /><img src="assets/img/icons/save.png" className="rec-img img3" title="save" onClick={this.onSaveRecording} /></div>} */}
                <div className="upload-options-container">
                    <img onClick={this.onAddVoice} className="btn btn0" title="record" src="assets/img/icons/recorder.png" />
                    <img onClick={this.onAddVid} className="btn btn1" title="video" src="assets/img/icons/video.png" />
                    <img onClick={this.onAddImg} className="btn btn2" title="photo" src="assets/img/icons/picture.png" />
                    <img onClick={this.onAddTodo} className="btn btn3" title="todo" src="assets/img/icons/checklist.png" />
                    <img onClick={this.onSubmit} className="btn btn4" title="Save" src="assets/img/icons/tick.png" />
                </div>
            </form>
        </section>
    }
}