import { MailPreview } from '../cmps/mail-preview.jsx'
import { mailService } from '../services/mail.service.js'

const { Link } = ReactRouterDOM

export class MailList extends React.Component {

  render() {
    const { mails } = this.props

    return <section className="mail-list">
      <table border="1">
        {mails.map(mail =>
          <tr >
            <td>
              {/* <input type="checkbox" name="isStared"
                    value={isStared} id="isStared"
                    onChange={this.handleChange}
                /> */}
              star
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
              X
            </td>
          </tr>
        )}

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