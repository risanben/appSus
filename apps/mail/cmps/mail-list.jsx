import { MailPreview } from '../cmps/mail-preview.jsx'
import { mailService } from '../services/mail.service.js'

export function MailList({ mails }) {

  return <section className="mail-list">
    hello from mail-list
    {mails.map(mail => <MailPreview
      key={mail.id}
      mail={mail} />)}
  </section>

}