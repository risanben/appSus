import { mailService } from '../services/mail.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'

export class MailEdit extends React.Component {
    unsubscribe
    state = {
        mail: {
            subject: this.props.mail.subject || '',
            body: this.props.mail.body || '',
            to: this.props.mail.to || '',
            status: this.props.mail.status || '',
        },

    }

    componentDidMount() {
        console.log('MailEdit-componentDidMount', this.props);
        // this.loadMail()
        this.unsubscribe = eventBusService.on('send-mail', (mail) => {
            this.setState({ mail })
        })
    }

    // componentWillUnmount() {
    //     this.unsubscribe()
    // }

    // ------------------------------------------------------------
    loadMail = () => {
        const { mailId } = this.props.match.params
        if (!mailId) return
        mailService.getById(mailId).then(mail => this.setState({ mail }))
    }
    // ------------------------------------------------------------

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        // let value = ''
        // if (field === 'to') {
        //     value = isValidEmail(email) ? target.value : alert('Please enter valid email')
        // } else {
        //     value = target.value
        // }
        this.setState((prevState) => ({
            mail: {
                ...prevState.mail,
                [field]: value
            }
        }))
    }

    onSaveMail = (ev) => {
        ev.preventDefault()
        debugger
        mailService.save(this.state.mail)
            .then(() => {
                // this.props.history.push('/mail')
                this.props.onGoBack()
            })
    }

    // isValidEmail(email) {
    //     return /\S+@\S+\.\S+/.test(email)
    // }

    onGoBack = () => {
        this.props.history.push('/mail')
    }

    render() {
        const { subject, body, to } = this.state.mail
        return <section className="mail-edit">
            <header className="header">
                <button className="btn" onClick={this.onGoBack}>X</button>
            </header>
            <form className="flex column align-center" onSubmit={this.onSaveMail}>

                {/* <label htmlFor="to">to</label> */}
                <input type="mail" name="to"
                    className="txt to"
                    value={to} id="to"
                    placeholder="To.."
                    onChange={this.handleChange}
                />

                {/* <label htmlFor="subject">subject</label> */}
                <input type="text" name="subject"
                    className="txt subject"
                    value={subject} id="subject"
                    placeholder="subject..."
                    onChange={this.handleChange}
                />

                {/* <label htmlFor="body">body</label> */}
                <input type="text" name="body"
                    className="txt body"
                    value={body} id="body"
                    onChange={this.handleChange}
                />



                <button value={'draft'} name="status" onClick={this.handleChange}>Save</button>
                <button value={'sent'} name="status" onClick={this.handleChange}>Send</button>
            </form>
        </section>
    }
}
