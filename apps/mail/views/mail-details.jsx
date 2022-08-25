import { mailService } from '../services/mail.service.js'

const { Link } = ReactRouterDOM

export class MailDetails extends React.Component {
    state = {
        mail: null
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

    render() {
        const { mail } = this.state
        if (!mail) return <div>Loading...</div>

        return <section className="mail-details">
            <h3>{mail.from}</h3>
            <h3>.</h3>
            <h3>{mail.subject}</h3>
            {<hr></hr>}
            <h3>{mail.body}</h3>
            <button onClick={this.onGoBack}>Back</button>

        </section>
    }
}