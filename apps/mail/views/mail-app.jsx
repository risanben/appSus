
import {MailList} from '../cmps/mail-list.jsx'
import { MailFilter } from "../cmps/mail-Filter.jsx"
import { MailEdit } from "../cmps/mail-edit.jsx"

export class MailApp extends React.Component{




    render (){
       return  <div>
         <MailFilter />
        <h1>hello from MailApp</h1>
        <MailList />
        <MailEdit/>
        </div>
    }
}