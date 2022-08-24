
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
        console.log('note.details.txt:', note.details.txt)

        return <section className="note-preview">
            {(note.type === 'text'|| note.type === 'todo') && <div>{`${note.details.txt}`}</div>}
            {note.type === 'image' && <img src={note.details.txt}/>}
        </section>
    }

}