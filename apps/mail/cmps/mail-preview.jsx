const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {

    return <Link to={"/mail/" + mail.id}>
        <article className="mail-preview">
            <span>{mail.fromName}    </span>
            <span className="subject">{mail.subject}   </span>
            <span>  {mail.fDate}  </span>
            {/* <span>  to: {mail.to}</span> */}
        </article>
    </Link>
}