import { mailService } from '../services/mail.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'

export class MailCompose extends React.Component {
    unsubscribe
    state = {
        mail: {
            subject: '',
            body: '',
            to: '',
            status: '',
        },

    }

    componentDidMount() {
        this.loadMail()
        this.unsubscribe = eventBusService.on('send-mail', (mail) => {
            this.setState({ mail })
        })
    }

    loadMail = () => {
        const { body } = this.props.match.params
        this.setState((prevState) => ({
            mail: {
                ...prevState.mail,
                body: body,
                subject: 'mail from my note',
            }
        }))
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState((prevState) => ({
            mail: {
                ...prevState.mail,
                [field]: value
            }
        }))
    }

    onSaveMail = (ev) => {
        ev.preventDefault()
        mailService.save(this.state.mail)
            .then(() => {
                this.props.history.push('/note')
                // this.props.onFinishEdit()
            })
    }

    render() {
        const { subject, body, to } = this.state.mail
        if (!body) return <span></span>
        return <section className="mail-edit">
            <header className="header">
                <button className="btn" onClick={() => this.props.onFinishEdit()}>X</button>
            </header>
            <form className="flex column align-center" onSubmit={this.onSaveMail}>

                <input type="mail" name="to"
                    className="txt to"
                    value={to} id="to"
                    placeholder="To.."
                    onChange={this.handleChange}
                />

                <input type="text" name="subject"
                    className="txt subject"
                    value={subject} id="subject"
                    placeholder="subject..."
                    onChange={this.handleChange}
                />

                <textarea type="text" name="body"
                    className="txt body"
                    value={body} id="body"
                    onChange={this.handleChange}
                />
                <div className="btn-container">
                    <button className="btn-send" value={'sent'} name="status" onClick={this.handleChange}>Send</button>
                    <button className="btn-save" value={'draft'} name="status" onClick={this.handleChange}>Save</button>
                </div>
            </form>
        </section>
    }
}
