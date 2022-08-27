import { LongText } from '../../../cmps/long-text.jsx'

const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {

    const textLen = 20

    return <Link to={"/mail/" + mail.id}>
        <article className="mail-preview">
            <span title={'From'}>{mail.fromName}    </span>
            <span className="subject" title={'Subject'}>{mail.subject}</span>
            <span className="body-preview" title={'Email body preview'}><LongText textLen={textLen} body={mail.body} /></span>
            <span>  {mail.fDate}  </span>
        </article>
    </Link>
}