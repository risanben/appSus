const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {

    return <Link to={"/mail/" + mail.id}>
        <article className="mail-preview">
            <span>{mail.subject}   </span>
            {/* <span>  to: {mail.to}</span> */}
        </article>
    </Link>
}