'use strict';

class TaskApp extends React.Component {
    constructor() {
        super()

        this.state = {
            tasks: [],
            tasksDone: []
        }
    }

    addTask = (task) => {


        this.setState(prevState => {
            return {
                // tasks: prevState.tasks.concat(this.state.input)
                tasks: [...prevState.tasks, task]
            }
        })

        // COMPRESSED version! (WARN!)
        // this.setState(prevState => ({ tasks: [...prevState.tasks, this.state.input], input: '' }))
    }


    // removeTask = index => this.setState(prevState => ({ tasks: prevState.tasks.filter((task, _index) => index !== _index) }))

    // UNCOMPRESSED version ,)
    removeTask = index => {
        this.setState(prevState => {
            return {
                tasks: prevState.tasks.filter((task, _index) => {
                    return index !== _index
                }),
                tasksDone:[...prevState.tasksDone, prevState.tasks[index]]
            }
        })
    }

    render() {
        return <div>
            <TaskInput onAddTask={this.addTask} />
            <TaskList tasks={this.state.tasks} onRemoveTask={this.removeTask} />
            <TaskDone tasksDone={this.state.tasksDone} />
        </div>
    }
}

function TaskDone(props) {
    return <ul id="done">
        {props.tasksDone.map(task => <li>{task}</li>)}
    </ul>
}
class TaskInput extends React.Component {
    constructor() {
        super()
        this.state = {
            input: ''
        }
    }

    keepInput = e => this.setState({ input: e.target.value })

    addTask = () => {
        if (this.state.input) { this.props.onAddTask(this.state.input)}
        this.setState({ input: '' })
    }

    render() {
        return <form onSubmit={e => {
            e.preventDefault()

            this.addTask()
        }
        }>
            <input type="text" className="round-blue-input" placeholder="Input task" onChange={this.keepInput} value={this.state.input} />
            &nbsp;
        <button type="submit" className="round-red-button">Add</button>
        </form>
    }
}

function TaskList(props) {
    return <ul>
        {props.tasks.map((task, index) => <li>{task} &nbsp; <a onClick={(e) => {
            e.preventDefault()

            props.onRemoveTask(index)
        }}>🗑</a></li>)}
    </ul>
}

ReactDOM.render(<TaskApp />,
    document.getElementById('root'))
