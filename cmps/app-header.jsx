import { MailCompose } from '../apps/mail/cmps/mail-compose.jsx'
import { MailEdit } from '../apps/mail/views/mail-edit.jsx'
import { NoteApp } from '../apps/note/views/note-app.jsx'
import { UserMsg } from './user-msg.jsx'

const { Link, NavLink, withRouter } = ReactRouterDOM
export function AppHeader() {


    function _onOpenMenu(){
        const elnav = document.querySelector('.header-nav')
        if (elnav.classList.contains("open")){
            elnav.classList.remove("open")
        }else {
            elnav.classList.add("open")
        }
    }

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
        <img src="assets/img/icons/men.png" className="burger" onClick={_onOpenMenu} alt="" />
        <nav className="header-nav">
            <NavLink exact to="/"><img title="home" src="assets/img/icons/home.png" className="nav-home-img navimg" onClick={_onOpenMenu}alt="" /></NavLink>
            <NavLink to="/about"><img title="about" src="assets/img/icons/info.png" className="nav-info-img navimg" onClick={_onOpenMenu}alt="" /></NavLink>
            <NavLink to="/mail"><img title="mail" src="assets/img/icons/gmail.png" className="nav-gmail-img navimg" onClick={_onOpenMenu}alt="" /></NavLink>
            <NavLink to="/note"><img title="note" src="assets/img/icons/note-icon.png" className="nav-note-img navimg" onClick={_onOpenMenu}alt="" /></NavLink>
            <NavLink to="/book"><img title="book" src="assets/img/icons/books-icon.png" className="nav-note-img navimg" onClick={_onOpenMenu}alt="" /></NavLink>
        </nav>
    </header>


}
