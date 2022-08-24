
export class NotePreview extends React.Component {


    handleInputChange = ({target}) => {
        const color = target.value
        const id = target.name
        this.props.onColorChange(id, color)
    }
// getRenderLine = (note)=> {

//     switch (note.type) {
//         case 'text':
//             return <div>{note.details.txt}</div>;
//         case 'image':
//             return <img src={note.details.txt}/>;
//         case 'todo':
//             return  `<div> {${note.details.txt}} </div>`;
//    }
// }

    render() {
        const { note,onRemoveNote,handleNote} = this.props

        return <section className="note-preview" style={{backgroundColor: note.details.color}}>
            {(note.type === 'text'|| note.type === 'todo') && <div>{`${note.details.txt}`}</div>}
            {note.type === 'image' && <img className="note-img"src={note.details.txt}/>}
            {note.type === 'video' &&<video className="note-vid"src={note.details.txt} controls autoPlay></video>}
            <div className="note-btns-container">
            <img src="assets/img/icons/trash.png" onClick={()=>onRemoveNote(note.id)}  className="note-btn"alt="" />
            
            <label >
            <img className="note-btn" src="assets/img/icons/color.png" alt=""/>
            <input name={note.id} type="color" hidden onChange={this.handleInputChange}/>
            </label>

            <img src="assets/img/icons/pencil.png" onClick={()=>handleNote(note)}  className="note-btn"alt="" />

            </div>
        </section>
    }

}