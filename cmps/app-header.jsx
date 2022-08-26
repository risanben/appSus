import { MailCompose } from '../apps/mail/cmps/mail-compose.jsx'
import { MailEdit } from '../apps/mail/views/mail-edit.jsx'
import { NoteApp } from '../apps/note/views/note-app.jsx'
import { UserMsg } from './user-msg.jsx'

const { Link, NavLink, withRouter } = ReactRouterDOM
export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <div className="logo-container">
                <span className="logo item item1">A</span>
                <span className="logo item item2">P</span>
                <span className="logo item item3">P</span>
                <span className="logo item item4">S</span>
                <span className="logo item item5">U</span>
                <span className="logo item item6">S</span>
            </div>
        </Link>
        <UserMsg />
        {/* <MailCompose/> */}
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
