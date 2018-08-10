import React, { Component } from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
        };
    }

    render() {
        const {
            invalidlogin
        } = this.state;

        return <Form>
            <legend>App login</legend>
            <Input
                onChange={(e) => this.setState({email: e.target.value})}
                required="true"
                type="email"
                name="email"
                placeholder="your login"
                invalid={invalidlogin}
            />
            <Input
                onChange={(e) => this.setState({password: e.target.value})}
                required="true"
                type="password"
                name="password"
                placeholder="your password"
                invalid={invalidlogin}
            />
            <Button color="primary" onClick={(e) => this.doLogin(e)}>Login</Button>
            <Button color="accent" onClick={(e) => this.doRegister(e)}>Register new user</Button>
        </Form>;
    }

    doLogin(e) {
        const {
            email,
            password,
        } = this.state;

        const {
            success,
        } = this.props;

        const cmp = this;
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.addEventListener('load',  function() {
            if (xhr.response.action === 'logged in') {
                cmp.setState({invalidlogin: false});
                return success();
            }

            cmp.setState({invalidlogin: true});
        });
        xhr.addEventListener('error', function() {
            console.log(xhr.response);
        });
        xhr.addEventListener('abort', function() {
            console.log(xhr.response);
        });
        xhr.open('POST', '/login', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(
            'user[email]=' + encodeURIComponent(email) +
            '&user[password]=' +  encodeURIComponent(password)
        );

        e.preventDefault();
    }

    doRegister(e) {
        const {
            email,
            password,
        } = this.state;

        const {
            success,
        } = this.props;

        const cmp = this;
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.addEventListener('load',  function() {
            if (xhr.response.user && xhr.response.user.email) {
                cmp.setState({invalidlogin: false});
                return success();
            }

            cmp.setState({invalidlogin: true});
        });
        xhr.addEventListener('error', function() {
            console.log(xhr.response);
        });
        xhr.addEventListener('abort', function() {
            console.log(xhr.response);
        });
        xhr.open('POST', '/users', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(
            'user[email]=' + encodeURIComponent(email) +
            '&user[password]=' +  encodeURIComponent(password)
        );

        e.preventDefault();
    }

}

export default Login;
