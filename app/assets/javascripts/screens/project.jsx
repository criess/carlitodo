import React, { Component } from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inEditing: null,
            id: null,
            name: null,
            projects: [],
        };
    }

    componentDidMount() {
        this.refreshProjects();
    }

    componentDidUpdate(prevProps, prevState) {

        const { create } = this.state;
        if (create != prevState.create) {
            this.refreshProjects();
        }

    }

    render() {
        const {
            create,
            id,
            name,
            projects,
        } = this.state;

        return create ?
            <Form>
                <Input
                    onChange={(e) => this.setState({name: e.target.value})}
                    required="true"
                    type="text"
                    name="name"
                    placeholder="project name"
                    value={name}
                />
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        this.save(id)
                    }}
                >Save</Button>
                <Button
                    onClick={
                        (e) => this.setState({inEditing: false, id: null, name: null})
                    }
                >Abort</Button>
            </Form> :
            <Container>
                <Row className="project-overview-controls">
                    <Col sm="6">
                    </Col>
                    <Col sm="6">
                        <Button
                            color="primary"
                            onClick={(e) => this.setState({inEditing: true})}
                        >create project
                        </Button>
                    </Col>
                </Row>
                { projects.map((project, i) =>
                    <Row key={'project-' + i}>
                        <Col sm="8">
                            <span className="project-overview-field-name">
                                {project.name}
                            </span>
                        </Col>
                        <Col sm="4">
                            <span className="project-overview-field-options">
                                <Button
                                    color="primary"
                                    onClick={(e) => this.setState({inEditing: true, id: project.id, name: project.name})}
                                >edit project
                                </Button>
                                <Button
                                    color="danger"
                                    onClick={(e) => this.deleteProject(project.id)}
                                >delete project
                                </Button>
                            </span>
                        </Col>
                    </Row>
                )}
            </Container>;
    }

    refreshProjects() {
        const cmp = this;
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.addEventListener('load',  function() {
            cmp.setState({projects: xhr.response.projects})
        });
        xhr.addEventListener('error', function() {
            console.log(xhr.response);
        });
        xhr.addEventListener('abort', function() {
            console.log(xhr.response);
        });
        xhr.open('GET', '/projects', true);
        xhr.send();
    }

    save(id = null) {
        const {
            name
        } = this.state;

        const cmp = this;
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.addEventListener('load',  function() {
            cmp.setState({inEditing: false, id: null, name: null});
        });
        xhr.addEventListener('error', function() {
            console.log(xhr.response);
        });
        xhr.addEventListener('abort', function() {
            console.log(xhr.response);
        });
        xhr.open(
            id ? 'PATCH' : 'POST',
            '/projects' + (id ? `/${id}.json` : ''),
            true
        );
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(
            'project[name]=' + encodeURIComponent(name)
        );

    }

}

export default Project;
