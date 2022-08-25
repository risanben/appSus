import { MailFilter } from "../cmps/mail-Filter.jsx"
const { Link, NavLink, withRouter } = ReactRouterDOM
export function MailHeader({ numOfMailToDisplay, onSetFilter }) {
    return <header className="mail-header">
        <Link to="/mail/edit">
            <div>🖌compose</div>
        </Link>
        <MailFilter onSetFilter={onSetFilter} sideOrUp={'up'} />
        <span className="mail-count">{`Displays ${numOfMailToDisplay} mail${numOfMailToDisplay>1? 's':''}`}</span>
    </header>
}