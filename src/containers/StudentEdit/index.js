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

// https://bootsnipp.com/snippets/40P1m

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

    render() {
        const { students } = this.props;

        console.log(students);

        return (
            <Container>
                <Row>
                    <Col md={10}>
                        <Form>
                            <FormGroup row>
                                <Col md={2} sm={2}><Label className="control-label" for="FullName">Ime i prezime</Label></Col>
                                <Col md={4}>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="fas fa-user"></i></InputGroupText>
                                        </InputGroupAddon>
                                        <Input id="FullName" name="Name (Full name)" type="text" placeholder="Name (Full name)" />
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={2} sm={2}><Label className="control-label" for="UploaPhoto">Slika profila</Label></Col>
                                <Col md={4}>

                                    <Input id="UploadPhoto" name="Upload photo" className="input-file" type="file" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={2} sm={2}><Label className="control-label" for="DoB">Datum rodenja</Label></Col>
                                <Col md={4}>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="fas fa-birthday-cake"></i></InputGroupText>
                                        </InputGroupAddon>
                                        <Input id="Date Of Birth" name="Datum rodenja" type="text" placeholder="Date Of Birth" className="form-control input-md" />
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
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