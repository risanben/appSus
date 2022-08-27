import { MailFilter } from "../cmps/mail-Filter.jsx"
import { MailEdit } from "../views/mail-edit.jsx"
import { MailCompose } from "./mail-compose.jsx"
const { Link, NavLink, withRouter } = ReactRouterDOM

export class MailHeader extends React.Component {
    state = {
        isShown: false,

        mail: {
            subject: '',
            body: '',
            to: '',
            status: '',
        },
    }

    setEditDisplay = () => {
        this.setState(() => ({
            isShown: true
        }))


    }

    onFinishEdit = () => {
        this.setState(() => ({
            isShown: false
        }))
    }

    render() {
        const { isShown, mail } = this.state
        const { setEditDisplay, onFinishEdit } = this
        const { numOfMailToDisplay, onSetFilter, onNewMail } = this.props
        return <header className="mail-header">
            {/* <Link to="/mail/edit"> */}
            <div onClick={() => setEditDisplay()} className="compose-btn">🖌 compose</div>
            {isShown && <MailEdit mail={mail} onFinishEdit={onFinishEdit} />}
            {/* </Link> */}
            <MailFilter onSetFilter={onSetFilter} sideOrUp={'up'} />
            <Link to={`/mail/compose`}></Link>
            <span className="mail-count">{`Displays ${numOfMailToDisplay} mail${numOfMailToDisplay > 1 ? 's' : ''}`}</span>
        </header>
    }
}