import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailApp } from "./apps/mail/views/mail-app.jsx"
import { NoteApp } from "./apps/note/views/note-app.jsx"
import { MailDetails } from "./apps/mail/views/mail-details.jsx"
import { MailEdit } from "./apps/mail/views/mail-edit.jsx"
import { MailCompose } from "./apps/mail/cmps/mail-compose.jsx"
import { NoteAdd } from "./apps/note/cmps/note-add.jsx"
import { NoteCompose } from "./apps/note/cmps/note-compose.jsx"
import { BookApp } from "./apps/book/views/book-app.jsx"
import { BookDetails } from "./apps/book/views/book-details"
import { BookEdit } from "./apps/book/views/book-edit.jsx"
import { MailList } from "./apps/mail/cmps/mail-list.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Switch>
                <Route path="/mail/edit/:mailId?" component={MailEdit} />
                <Route path="/mail/compose/:body?" component={MailCompose} />
                <Route path="/note/compose/:text?" component={NoteCompose} />
                <Route path="/mail/:mailId" component={MailDetails} />
                <Route path="/mail/list" component={MailList} />
                <Route path="/mail" component={MailApp} />
                <Route path="/note" component={NoteApp} />
                <Route path="/book/edit/:bookId?" component={BookEdit} />
                <Route path="/book/:bookId" component={BookDetails} />
                <Route path="/book" component={BookApp} />
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}
