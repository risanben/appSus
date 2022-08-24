import { MailPreview } from '../cmps/mail-preview.jsx'
import { mailService } from '../services/mail.service.js'

const { Link } = ReactRouterDOM

export function MailList({ mails, onRemoveMail, onStaredMail }) {

  return <section className="mail-list">
    <table border="1">
      <tbody>
        {mails.map(mail =>
          <tr key={mail.id} className={(mail.isRead) ? "read" : "unread"}>
            <td>
              {/* <input type="checkbox" name="isStared"
                value={mail.isStared} id="isStared"
                onChange={() => onStaredMail(mail)}
              />
            */}
              {/* star */}

              <button
                className={(mail.isStared) ? "Stared" : "unStared"}
                onClick={() => onStaredMail(mail)}
              >
                <span className="star">&#9733;</span>
              </button>
            </td>
            {/* <Link to={"/mail/" + mail.id}>
              <React.Fragment> */}
            <td>
              {mail.from}
            </td>
            <td>
              <MailPreview
                key={mail.id}
                mail={mail} />
            </td>
            <td>
              date
            </td>
            {/* </React.Fragment>
            </Link> */}
            <td>
              <button onClick={() => onRemoveMail(mail.id)}>X</button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </section>
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