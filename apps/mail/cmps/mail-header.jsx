import { MailFilter } from "../cmps/mail-Filter.jsx"
import { MailEdit } from "../views/mail-edit.jsx"
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

        // console.log(isShown);
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
            <div onClick={() => setEditDisplay()}>{/*<MailEdit />*/}🖌compose</div>
            {isShown && <MailEdit mail={mail} onFinishEdit={onFinishEdit} />} 
            {/* </Link> */}
            <MailFilter onSetFilter={onSetFilter} sideOrUp={'up'} />
            <span className="mail-count">{`Displays ${numOfMailToDisplay} mail${numOfMailToDisplay > 1 ? 's' : ''}`}</span>
        </header>
    }
}