import { MailFilter } from "../cmps/mail-Filter.jsx"
const { Link, NavLink, withRouter } = ReactRouterDOM
export function MailHeader({ numOfMailToDisplay, onSetFilter }) {
    console.log(numOfMailToDisplay);
    return <header className="mail-header">
        <Link to="/mail/edit">
            compose🖌
        </Link>
        <MailFilter onSetFilter={onSetFilter} sideOrUp={'up'} />
        <span className="mail-count">{`Displays ${numOfMailToDisplay} miles`}</span>
    </header>
}