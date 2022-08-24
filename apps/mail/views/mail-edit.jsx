import { mailService } from '../services/mail.service.js'

export class MailEdit extends React.Component {
    state = {
        mail: {
            subject: '',
            body: '',
            to: '',
        }
    }

    componentDidMount() {
        console.log('MailEdit-componentDidMount', this.props);
        this.loadMail()
    }

    loadMail = () => {
        const { mailId } = this.props.match.params
        if (!mailId) return
        mailService.getById(mailId).then(mail => this.setState({ mail }))
    }

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
        mailService.save(this.state.mail)
            .then(() => {
                this.props.history.push('/mail')
            })
    }

    // isValidEmail(email) {
    //     return /\S+@\S+\.\S+/.test(email)
    // }

    render() {
        const { subject, body, to } = this.state.mail
        return <section className="mail-edit">
            <form className="flex column align-center" onSubmit={this.onSaveMail}>

                <label htmlFor="subject">subject</label>
                <input type="text" name="subject"
                    value={subject} id="subject"
                    onChange={this.handleChange}
                />

                <label htmlFor="body">body</label>
                <input type="text" name="body"
                    value={body} id="body"
                    onChange={this.handleChange}
                />

                <label htmlFor="to">to</label>
                <input type="mail" name="to"
                    value={to} id="to"
                    onChange={this.handleChange}
                />

                <button>Save</button>
            </form>
        </section>
    }
}