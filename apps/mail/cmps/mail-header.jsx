import { MailFilter } from '../cmps/mail-Filter.jsx'
import { MailEdit } from '../views/mail-edit.jsx'
const { Link } = ReactRouterDOM

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
            <div onClick={() => setEditDisplay()} className="compose-btn">🖌 compose</div>
            {isShown && <MailEdit mail={mail} onFinishEdit={onFinishEdit} />}
            <MailFilter onSetFilter={onSetFilter} sideOrUp={'up'} />
            <Link to={`/mail/compose`}></Link>
            <span className="mail-count">{`Displays ${numOfMailToDisplay} mail${numOfMailToDisplay > 1 ? 's' : ''}`}</span>
        </header>
    }
}