import { mailService } from '../services/mail.service.js'

export class MailEdit extends React.Component {
    state = {
        mail: {
            subject: '',
            body: '',
            to: '',
            status: '',
        },
        // edit:{
        //     isNew: true   // new or draft
        // }
    }

    componentDidMount() {
        console.log('MailEdit-componentDidMount', this.props);
        this.loadMail()
    }

    // componentDidMount() {
    //     this.unsubscribe = eventBusService.on('show-user-msg', (msg) => {
    //       this.setState({ msg })
    //       setTimeout(this.closeMsg, 3000)
    //     })
    //   }

    //   componentWillUnmount() {
    //     this.unsubscribe()
    //   }


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
