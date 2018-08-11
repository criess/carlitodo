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
            mask: 'wait',
            currentProject: null,
            currentTodo: null,
            filter: {},
        }
    }

    componentDidMount() {
        this.checkLogin();
    }

    render() {
        const {
            mask,
            filter,
        } = this.state;
        switch (mask) {
            case 'login':
                return this.wrapWithContainer(<Login
                    success={() => this.setState({mask: 'project'})}
                />);
            case 'project':
                return this.wrapWithContainer(<Project
                    navigator={(mask, filter = {}) => this.setState({mask: mask, filter: filter})}
                    filter={filter}
                />);
            case 'todo':
                return this.wrapWithContainer(<Todo
                    navigator={(mask, filter = {}) => this.setState({mask: mask, filter: filter})}
                    filter={filter}
                />);
            case 'user':
                return this.wrapWithContainer(<User
                />);
            case 'wait':
                return this.wrapWithContainer(<p>please wait preparing to start …</p>);
            default:
                return this.wrapWithContainer(<span>error: unknown mask; value: `{mask}`</span>);
       }
    }

    wrapWithContainer(node) {
        return <Container>
                {node}
            </Container>;
    }

    checkLogin() {
        const cmp = this;
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.addEventListener('load',  function() {
            if (xhr.response.action === 'logged in') {
                cmp.setState({mask: 'project'});
            } else {
                cmp.setState({mask: 'login'});
            }
        });
        xhr.addEventListener('error', function() {
            cmp.setState({mask: 'login'});
            console.log(xhr.response);
        });
        xhr.addEventListener('abort', function() {
            console.log(xhr.response);
        });
        xhr.open('GET', '/loggedin', true);
        xhr.send();
    }

}

export default Main;
