import React, { Component } from 'react';
import Login from 'screens/login';
import Project from 'screens/project';
import Todo from 'screens/todo';
import User from 'screens/user';
import Container from 'muicss/lib/react/container';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: null,
            mask: 'login',
            currentProject: null,
            currentTodo: null,
        }
    }

    render() {
        const {
            login,
            mask,
            currentProject,
            currentTodo,
        } = this.state;
        switch (mask) {
            case 'login':
                return this.wrapWithContainer(<Login
                    success={() => this.setState({mask: 'project'})}
                    setLogin={(id) => this.setState({login: id})}
                />);
            case 'project':
                return this.wrapWithContainer(<Project
                    login={login}
                    currentProject={currentProject}
                    selectProject={(id) => this.setState({currentProject: id})}
                    selectTodo={(id) => this.setState({mask: 'todo', currentTodo: id})}
                />);
            case 'todo':
                return this.wrapWithContainer(<Todo
                    login={login}
                    currentProject={currentProject}
                    currentTodo={currentTodo}
                    selectProject={(id) => this.setState({currentProject: id})}
                    selectTodo={(id) => this.setState({mask: 'todo', currentTodo: id})}
                />);
            case 'user':
                return this.wrapWithContainer(<User
                    login={login}
                    currentProject={currentProject}
                    currentTodo={currentTodo}
                    selectProject={(id) => this.setState({currentProject: id})}
                    selectTodo={(id) => this.setState({mask: 'todo', currentTodo: id})}
                />);
            default:
                return this.wrapWithContainer(<span>error: unknown mask; value: `{mask}`</span>);
       }
    }

    wrapWithContainer(node) {
        return <Container>
                {node}
            </Container>;
    }

}

export default Main;
