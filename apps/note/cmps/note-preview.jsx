
export class NotePreview extends React.Component {

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
        const { note } = this.props

        return <section className="note-preview" style={{backgroundColor: note.details.color}}>
            {(note.type === 'text'|| note.type === 'todo') && <div>{`${note.details.txt}`}</div>}
            {note.type === 'image' && <img className="note-img"src={note.details.txt}/>}
            {note.type === 'video' &&<video className="note-vid"src={note.details.txt} controls autoPlay></video>}
            <div className="note-btns-container">
            <button onClick={()=>onRemoveNote(note.id)}  className="note-btn"> <img src="assets/img/icons/trash.png" alt="" /></button>
            </div>
        </section>
    }

}