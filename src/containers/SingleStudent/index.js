import React, { Component } from 'react';
import {
    Row, Col, Container,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, 
    FormGroup, Input, Form, Label,
    InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchSingleStudent } from '../../actions/students';




class SingleStudent extends Component {

    constructor() {
        super();
        this.getSingleStudent = this.getSingleStudent.bind(this);
    }

    componentWillMount() {
        this.getSingleStudent();
    }

    getSingleStudent() {
        const { dispatch } = this.props;
        const id = this.props.match.params.id;
        dispatch(fetchSingleStudent(id));
    }

    render () {
        const { students } = this.props;
        const student = students.data[0];

        return (
            <Container className="main-container" fluid>
                <Row>
                    <Card>
                        <CardTitle className="card-header">{student.firstName} {student.lastName}</CardTitle>
                        <CardBody>
                            <Col md={12}>
                                    <Row>
                                    <Col xs={12} sm={8}>
                                        <p><strong>About: </strong> Web Designer / UI. </p>
                                        <p><strong>Hobbies: </strong> Read, out with friends, listen to music, draw and learn new things. </p>
                                        <p><strong>Skills: </strong>
                                            <span class="tags">html5</span>
                                            <span class="tags">css3</span>
                                            <span class="tags">jquery</span>
                                            <span class="tags">bootstrap3</span>
                                        </p>
                                    </Col>
                                    <Col xs={12} sm={4} className="text-center">
                                        <figure>
                                            <img src="http://www.localcrimenews.com/wp-content/uploads/2013/07/default-user-icon-profile.png" alt="" class="img-circle img-responsive" />
                                        </figure>
                                    </Col>
                                    </Row>
                                    <Row className="divider text-center">
                                        <Col xs={12} sm={3} className="emphasis">
                                            <h2><strong> 20,7K </strong></h2>
                                            <p><small>Followers</small></p>
                                            <Button color="success" block><span className="fa fa-plus-circle"></span> Follow </Button>
                                        </Col>
                                        <Col xs={12} sm={3} className="emphasis">
                                            <h2><strong>245</strong></h2>
                                            <p><small>Following</small></p>
                                            <Button color="info" block><span className="fa fa-user"></span> View Profile </Button>
                                        </Col>
                                        <Col xs={12} sm={3} className="emphasis">
                                            <h2><strong>245</strong></h2>
                                            <p><small>Following</small></p>
                                            <Button color="info" block><span className="fa fa-user"></span> View Profile </Button>
                                        </Col>
                                        <Col xs={12} sm={3} className="emphasis">
                                            <h2><strong>245</strong></h2>
                                            <p><small>Following</small></p>
                                            <Button color="info" block><span className="fa fa-user"></span> View Profile </Button>
                                        </Col>
                                    </Row>
                            </Col>
                        </CardBody>
                    </Card>
                </Row>
            </Container>
        );
    }
}

SingleStudent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    students: PropTypes.object.isRequired,
    error: PropTypes.string
};

export default withRouter(connect(state => ({
    students: state.students
}))(SingleStudent));