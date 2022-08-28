import { MailPreview } from '../cmps/mail-preview.jsx'
import { mailService } from '../services/mail.service.js'

const { Link, Route, useHistory } = ReactRouterDOM

export class MailList extends React.Component {

  render() {
    const { mails, onRemoveMail, onStaredMail, onTrashMail } = this.props
    const { handleClick } = this
    return <section className="mail-list">
      <table>
        <tbody>
          {mails.map(mail =>
            <tr key={mail.id} className={(mail.isRead) ? "read" : "unread"} /*onClick={() => handleClick(mail)}*/>
              <td>
                <button
                  className={(mail.isStared) ? "stared" : "unStared"}
                  onClick={() => onStaredMail(mail)}
                  title={'Mark as stared email'}
                ><span className="star">&#9733;</span>
                </button>
              </td>
              <td>
                <MailPreview
                  key={mail.id}
                  mail={mail} />
              </td>
              <td>
                {mail.status === 'trash' ?
                  <button onClick={() => onRemoveMail(mail.id)} title={'Delete forever'}>Delete forever</button>
                  : <button onClick={() => onTrashMail(mail)}><img className="filter-icon" src="assets/img/icons/trash.png" title={'Move to trash'} /></button>}
              </td>
              <td>
                <Link to={`/note/compose/${mail.body}`} title={'Save as note'}>Note </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  }
}