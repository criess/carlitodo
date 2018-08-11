import React, { Component } from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import moment from 'moment';

class Todo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            name: '',
            state:'open',
            dueDate: null,
            dueDateError: null,
            inEditing: null,
        };
    }

    componentDidMount() {
        this.refreshTodos();
    }

    componentDidUpdate(prevProps, prevState) {

        const {
            inEditing,
            state,
        } = this.state;
        if (inEditing != prevState.inEditing || state != prevState.state) {
            this.refreshTodos();
        }

    }

    render() {

        const {
            inEditing,
            id,
            todos,
            name,
            dueDate,
            dueDateError,
        } = this.state;

        const {
            navigator,
            filter,
        } = this.props;

        return inEditing ?
            <Form>
                <legend>Task:</legend>
                <Input
                    onChange={(e) => this.setState({name: e.target.value})}
                    required="true"
                    type="text"
                    name="name"
                    placeholder="todo name"
                    value={name}
                />
                <legend>Due Date:</legend>
                <Input
                    onChange={(e) => {
                        const dateStr = e.target.value;
                        if (moment(dateStr, "YYYY-MM-DD").isValid()) {
                            this.setState({dueDate: moment(dateStr, "YYYY-MM-DD"), dueDateError: false});
                        } else {
                            this.setState({dueDate: dateStr, dueDateError: true});
                        }
                    }}
                    required="true"
                    type="text"
                    name="due_date"
                    placeholder="YYYY-MM-DD"
                    invalid={dueDateError || false}
                />
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        this.save(id)
                    }}
                >Save</Button>
                <Button
                    onClick={
                        (e) => this.setState({inEditing: false, id: null, name: ''})
                    }
                >Abort</Button>
            </Form> :
            <Container>
                <h2>Todos {filter.project_id && filter.project_name ? `for project: ${filter.project_name}` : 'for all projects'}</h2>
                <Row className="todo-overview-controls">
                    <Col sm="6">
                        <Button
                            color="accent"
                            onClick={(e) => navigator('project')}
                        >back to projects
                        </Button>
                    </Col>
                    <Col sm="6">
                        <Button
                            color="primary"
                            onClick={(e) => this.setState({inEditing: true})}
                        >create todo
                        </Button>

                    </Col>
                </Row>
                { todos.map((todo, i) =>
                    <Row key={'todo-' + i}>
                        <Col sm="8" style={{backgroundColor: todo.state === 'closed' ? '#6ef442' : 'transparent'}}>
                            <span className="todo-overview-field-name">
                                <h4>{todo.name}</h4>
                                <hr/>
                                <i>until {todo.due_date}</i><br/>
                                <i> created by {todo.created_by.email}</i><br/>
                                <i> updated by {todo.updated_by.email}</i>
                            </span>
                        </Col>
                        <Col sm="4">
                            <span className="todo-overview-field-options">
                                <Button
                                    color="primary"
                                    onClick={(e) => this.setState({inEditing: true, id: todo.id, name: todo.name})}
                                >edit todo
                                </Button>
                                { todo.state === 'open' &&
                                    <Button
                                        color="accent"
                                        onClick={(e) => {
                                            const cmp = this;
                                            this.setState(
                                                {state: 'closed'},
                                                () => cmp.save(todo.id)
                                            );
                                        }}
                                    >close todo
                                    </Button>
                                }
                                <Button
                                    color="danger"
                                    onClick={(e) => this.deleteTodo(todo.id)}
                                >delete todo
                                </Button>
                            </span>
                        </Col>
                    </Row>
                )}
            </Container>;
    }

    deleteTodo(id) {
        const cmp = this;
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.addEventListener('load',  function() {
            cmp.refreshTodos();
        });
        xhr.addEventListener('error', function() {
            console.log(xhr.response);
        });
        xhr.addEventListener('abort', function() {
            console.log(xhr.response);
        });
        xhr.open(
            'DELETE',
            `/todos/${id}.json`,
            true
        );
        xhr.send();
    }


    refreshTodos() {
        const {
            filter
        } = this.props;

        let extraQuery = '';
        if (filter.project_id) {
            extraQuery += `?project_id=${filter.project_id}`;
        }

        const cmp = this;
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.addEventListener('load',  function() {
            cmp.setState({todos: xhr.response.todos})
        });
        xhr.addEventListener('error', function() {
            console.log(xhr.response);
        });
        xhr.addEventListener('abort', function() {
            console.log(xhr.response);
        });
        xhr.open('GET', '/todos' + extraQuery, true);
        xhr.send();
    }

    save(id = null) {
        const {
            name,
            state,
            dueDate,
        } = this.state;

        const {
            filter
        } = this.props;

        let extraQuery = '';

        if (filter.project_id) {
            extraQuery += '&todo[project_id]=' + encodeURIComponent(filter.project_id);
        }

        if (name) {
            extraQuery += '&todo[name]=' + encodeURIComponent(name);
        }

        if (state) {
            extraQuery += '&todo[state]=' + encodeURIComponent(state);
        }

        if (dueDate) {
            extraQuery += '&todo[due_date]=' + encodeURIComponent(
                moment(dueDate).toISOString()
            );
        }

        const cmp = this;
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.addEventListener('load',  function() {
            cmp.setState({inEditing: false, id: null, name: null, state: 'open', dueDate: null});
        });
        xhr.addEventListener('error', function() {
            console.log(xhr.response);
        });
        xhr.addEventListener('abort', function() {
            console.log(xhr.response);
        });
        xhr.open(
            id ? 'PATCH' : 'POST',
            '/todos' + (id ? `/${id}.json` : ''),
            true
        );
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(
            extraQuery.replace(/^&/,'')
        );

    }

}

export default Todo;
