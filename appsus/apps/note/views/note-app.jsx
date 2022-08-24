import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteEdit } from "./note-edit.jsx"

export class NoteApp extends React.Component {

    render (){

       return <div className="note-app">
           <NoteFilter />
         hello from note-app 
         <NoteEdit/>
         </div>
    }
   }