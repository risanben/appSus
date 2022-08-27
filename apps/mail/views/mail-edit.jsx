import { mailService } from '../services/mail.service.js'

export class MailEdit extends React.Component {
    state = {
        mail: {
            subject: this.props.mail.subject || '',
            body: this.props.mail.body || '',
            to: this.props.mail.to || '',
            status: this.props.mail.status || '',
        },

    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        console.log(target);
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
                // this.props.history.push('/mail')
                console.log(this.state.mail);
                this.props.onFinishEdit()
            })
    }

    render() {
        const { subject, body, to } = this.state.mail
        return <section className="mail-edit">
            <header className="header">
                <button className="close-btn" onClick={() => this.props.onFinishEdit()}>X</button>
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
                    {/* <img className="btn-save" value={'draft'} name="status" onClick={this.handleChange} src="assets/img/icons/save-icon.png" /> */}
                </div>
            </form>
        </section>
    }
}
