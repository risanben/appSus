
export class NoteAdd extends React.Component {

    state = {
        type: 'text',
        text: '',
    }


    handleChange = ({ target }) => {
        const text = target.value
        this.setState({ text })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { text, type } = this.state
        this.props.onAddNote(text, type)
        this.setState({ text: '' })
        this.setState({ type: 'text' })

    }

    onAddImg = () => {
        this.setState({ type: 'image' })
    }
    onAddVid = () => {
        this.setState({ type: 'video' })
    }
    onAddTodo = () => {
        this.setState({ type: 'todo' })
    }

    onAddVoice = () => {
        this.setState({ type: 'voice' })
    }

    isRecording = false

    onStartRecord = () => {
        if(!this.isRecording){

            this.isRecording = true 
            navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
          
          const audioChunks = [];
          mediaRecorder.addEventListener("dataavailable", event => {
              audioChunks.push(event.data);
            });
      
            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();
            });
        });
    } else {
        
    }

    }



    render() {

        return <section className="note-add">
            <form className="note-add-form">
                {this.state.type === 'text' && <input type="text" value={this.state.text} onChange={this.handleChange} placeholder="Take a note..." />}
                {this.state.type === 'image' && <input type="text" value={this.state.text} onChange={this.handleChange} placeholder="Enter image URL..." />}
                {this.state.type === 'video' && <input type="text" value={this.state.text} onChange={this.handleChange} placeholder="Enter video URL..." />}
                {this.state.type === 'todo' && <input type="text" value={this.state.text} onChange={this.handleChange} placeholder="Type title and items separated by comma" />}
                {this.state.type === 'voice' &&<div><button onClick={this.onStartRecord}>start</button><button  onClick={this.onStopRecord}>stop</button></div>}
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