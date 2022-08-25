import { NoteService } from "../services/note.service.js"

export class TodoPreview extends React.Component {

    state = {
        title: '',
        tasks: ''

    }

    componentDidMount = () => {
        const { note } = this.props
        const { txt } = note.details
        NoteService.getTodo(txt)
            .then((res) => {
                // console.log('res:', res)
                this.setState({ title: res.title, tasks: res.todoTasks })
            })
    }


    render() {
        const { tasks, title } = this.state
        console.log('this.state:', this.state)

        return <React.Fragment>hello from todo preview</React.Fragment>
    }
}