import { MailPreview } from '../cmps/mail-preview.jsx'
import { mailService } from '../services/mail.service.js'
// import { useHistory } from "react-router-dom";
// window.location("/mail/list")

const { Link, Route, useHistory } = ReactRouterDOM

export class MailList extends React.Component {


  handleClick = (mail) => {
    // const history = useHistory()
  
   
    // <Link to={"/mail/" + mail.id} > </Link>
    // Route.route("/mail/" + mail.id)
    // this.props.history.push('/mail/' + mail.id)
    // history.push('/mail/' + mail.id)
    // this.route.transitionTo('/mail/' + mail.id)
    // window.location('/mail/' + mail.id)
  }
  render() {
    const { mails, onRemoveMail, onStaredMail, onTrashMail } = this.props
    const { handleClick } = this
    return <section className="mail-list">
      <table /*border="1"*/>
        <tbody>
          {mails.map(mail =>
            <tr key={mail.id} className={(mail.isRead) ? "read" : "unread"} onClick={() => handleClick(mail)}>
              {/* // <tr key={mail.id} className={(mail.isRead) ? "read" : "unread"} onClick={() =><Link to={"/mail/" + mail.id} > </Link>}> */}
              <td>
                <button
                  className={(mail.isStared) ? "stared" : "unStared"}
                  onClick={() => onStaredMail(mail)}
                  title={'Mark as stared email'}
                >
                  <span className="star">&#9733;</span>
                </button>
              </td>

                  {/* <td className="td-from"> 
                    <Link to={"/mail/" + mail.id}>{mail.fromName} </Link>
                  </td> */}

                  <td>
                    <MailPreview
                      key={mail.id}
                      mail={mail} />
                  </td>

                  {/* <td>
                    {mail.fDate}
                  </td> */}
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

// import { MailPreview } from '../cmps/mail-preview.jsx'
// import { mailService } from '../services/mail.service.js'

// export function MailList({ mails }) {

//   return <section className="mail-list">
//     <table border="1">
//       {mails.map(mail =>
//         <tr className={readClass}>
//           <td>
//             {/* <input type="checkbox" name="isStared"
//                     value={isStared} id="isStared"
//                     onChange={this.handleChange}
//                 /> */}
//             star
//           </td>
//           <td>
//             {mail.from}
//           </td>
//           <td>
//             <MailPreview
//               key={mail.id}
//               mail={mail} />
//           </td>
//           <td>
//             date
//           </td>
//           <td>
//             X
//           </td>
//         </tr>
//       )}

//     </table>
//   </section>

// }