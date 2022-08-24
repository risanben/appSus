const { Link, NavLink, withRouter } = ReactRouterDOM
export function MailHeader() {

    return <header className="mail-header">
        <Link to="/mail/edit/:mailId?">
            compose🖌
        </Link>
        <nav>
            <NavLink exact to="/">Home</NavLink>
        </nav>
    </header>
}
