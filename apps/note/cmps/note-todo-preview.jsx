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
                this.setState({ title: res.title, tasks: res.todoTasks })
            })
    }

    toggleisDone = (todo) => {
        const { tasks } = this.state
        const taskIdx = tasks.findIndex(task => task.id === todo.id)
        const currTask = tasks[taskIdx]
        currTask.isDone = !currTask.isDone
        this.setState({ tasks })
    }

    _getTxtDecor = (isDone) => {
        return (!isDone) ? 'line-through': 'none'
    }

    render() {
        const { tasks, title } = this.state

        return <React.Fragment>
            {(tasks && title) && <section className="todo-note-container">
                <h4>{title}</h4>
                <ul>
                    {tasks.map(task => <li onClick={() => { this.toggleisDone(task) }} style={{textDecoration: this._getTxtDecor(task.isDone)}} key={task.id}>{task.txt}</li>)}
                </ul>
            </section>}
        </React.Fragment>
    }
}