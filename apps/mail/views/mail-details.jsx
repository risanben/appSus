import { mailService } from '../services/mail.service.js'
import { MailEdit } from './mail-edit.jsx'
import { mailToNote } from '../../../services/event-bus.service.js'

const { Link } = ReactRouterDOM

export class MailDetails extends React.Component {
    state = {
        mail: null,
        isShown: false,
    }

    componentDidMount() {
        this.loadMail()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
            this.loadMail()
        }
    }

    loadMail = () => {
        const { mailId } = this.props.match.params
        mailService.getById(mailId)
            .then((mail) => {
                if (!mail) return this.onGoBack()
                mail.isRead = true
                mailService.update(mail)
                this.setState({ mail })
            })
    }

    onGoBack = () => {
        this.props.history.push('/mail')
    }

    setEditDisplay = () => {
        this.setState(() => ({
            isShown: true
        }))

        // console.log(isShown);
    }

    onFinishEdit = () => {
        this.setState(() => ({
            isShown: false
        }))
    }

    onMailToNote = () => {
        debugger
        mailToNote(this.state.mail.body)
    }

    render() {
        const { mail, isShown } = this.state
        const { onGoBack, setEditDisplay, onFinishEdit, onMailToNote } = this
        if (!mail) return <div>Loading...</div>

        return <section className="mail-details">
            <h3>{mail.from}</h3>
            <h3>.</h3>
            <h3>{mail.subject}</h3>
            {<hr></hr>}
            <h3>{mail.body}</h3>
            <button onClick={onGoBack}>Back</button>
            {/* <Link to={`/mail/edit/${mail.id}`}>Edit</Link> */}
            <div onClick={() => setEditDisplay()}>Edit</div>
            {isShown && <MailEdit mail={mail} onFinishEdit={onFinishEdit} />}
            <button onClick={onMailToNote}>mail to note</button>

        </section>
    }
}