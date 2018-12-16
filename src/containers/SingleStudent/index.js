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
import { withRouter, Link } from 'react-router';
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

    renderUserTags(tags) {
        console.log(tags);
        if (!tags || !tags.length) {
            return <p>Korisnik nema tagova</p>;
        }

        return tags.map((tag, key) => 
            <li key={key}>{tag.tagName}</li>
        );
    }

    renderUserCategories(categories) {
        if (!categories || !categories.length) {
            return <p>Korisnik nema kategorija</p>;
        }

        return categories.map((category, key) =>
            <span className="tags tags--blue" key={key}>{category.name}</span>
        );
    }

    renderSocialLinks (social) {
        if (!social || !social.length) {
            return <div></div>;
        }

        return social.map((social, key) => 
            <Col xs={12} sm={3} className="emphasis">
                <a style={{textDecoration: "none"}} href={social.socialLink} target="__blank"><Button className={"btn-" + social.socialName.toLowerCase()} block> Prati me</Button></a>
            </Col>
        );
    }

    render () {
        const { students } = this.props;
        const rawStudent = students.toJS();
        const student = rawStudent.students.data;

        return (
            <Container className="main-container" fluid>
                <Row>
                    {student ?
                    <Card>
                        <CardTitle className="card-header">{student.firstName} {student.lastName}</CardTitle>
                        <CardBody>
                            <Col md={12}>
                                <Row>
                                    <Col xs={12} sm={3} md={3} className="text-center">
                                        <figure>
                                            <img src={require(`assets/images/avatars/test.png`)} alt="" className="img-circle img-responsive" />
                                        </figure>
                                    </Col>
                                    <Col xs={12} sm={8}>
                                        <p><strong>E-mail:</strong> <a href={"mailto:" + student.email}>{student.email}</a></p>
                                        <p><strong>Zivotopis: </strong> <a href={student.cvLink}>{student.cvLink ? student.cvLink : "Student nema zivotopis"}</a></p>
                                        <p><strong>Studijski program: </strong>
                                            {this.renderUserCategories(student.categories)}
                                        </p>
                                        <p><strong>Uže područije interesa: </strong>
                                            <ul>
                                                {this.renderUserTags(student.tags)}
                                            </ul>
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="divider text-center">
                                    {/* {this.renderSocialLinks(student.socialLinks)} */}
                                </Row>
                            </Col>
                        </CardBody>
                    </Card>
                    : ""}
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
    students: state.get('students')
}))(SingleStudent));