import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
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
// import { fetchCategories } from '../../actions/categories';
import { fetchPostTypes, createNewPost, fetchPostCategories } from '../../actions/posts';
import { isRequired } from '../../middleware/validator';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import FormInput from 'components/FormInput';
import SelectInput from 'components/SelectInput';
import ErrorMsg from 'components/ErrorMessage';
import SuccessMessage from 'components/SuccessMessage';

import 'react-datepicker/dist/react-datepicker.css';

export const validate = (values) => {
    const errors = {};
    const { info, typeId } = values.toJS();

    errors.info = isRequired(info, 'hr');
    errors.typeId = isRequired(typeId, 'hr');

    return errors;
};

class AddPost extends Component {

    constructor() {
        super();
        this.state = {
            startDate: moment(),
            endDate: moment(),
        };
        
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.getPostTypes = this.getPostTypes.bind(this);
        this.getPostCategories = this.getPostCategories.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
    }

    componentWillMount() {
        this.getPostTypes();
        this.getPostCategories();
    }

    getPostTypes() {
        const { dispatch } = this.props;

        return dispatch(fetchPostTypes());
    }

    getPostCategories() {
        const { dispatch } = this.props;

        return dispatch(fetchPostCategories());
    }

    onFormSubmit(values) {
        const { dispatch, profile } = this.props;
        const currentUser = profile.toJS();
        const formValues = values.toJS();

        formValues.companyId = currentUser.data.user.id;
        formValues.startDate = moment(this.state.startDate).format();
        formValues.endDate = moment(this.state.endDate).format();

        console.log(formValues);

        dispatch(createNewPost(formValues));
    }

    handleStartDate(date) {
        this.setState({
            startDate: date
        });
    }

    handleEndDate(date) {
        this.setState({
            endDate: date
        });
    }

    render() {

        const { posts, profile, handleSubmit, submitSucceeded, submitting, error } = this.props;
        const rawPosts = posts.toJS();
        const rawProfile = profile.toJS();
        const postTypes = rawPosts.postTypes.data;
        const postCategories = rawPosts.postCategories.data;

        console.log(postCategories);

        return (
            <Container className="main-container" fluid>
                <Row>

                    <Col md={12}>
                        <Card>
                            <CardTitle className="card-header">Dodajte novu obavijest</CardTitle>
                            <CardBody>
                                {postTypes && postCategories ? 
                                    <Container>
                                        <Row>
                                            <Col md={10}>
                                                <Form onSubmit={handleSubmit(this.onFormSubmit)}>
                                                    <FormGroup row>
                                                        <Label sm={2}>Opis</Label>
                                                        <Col sm={10}>
                                                            <Field
                                                                name="info"
                                                                component={FormInput}
                                                                type="text"
                                                                placeholder="Opis"
                                                            />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Label sm={2}>Tip</Label>
                                                        <Col sm={10}>
                                                            <Field name="typeId" component={SelectInput} data={postTypes} defaultHolder={"Odaberite tip događaja"} />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Label sm={2}>Kategorija</Label>
                                                        <Col sm={10}>
                                                            <Field name="categoryId" component={SelectInput} data={postCategories} defaultHolder={"Odaberite kategoriju"} />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Label sm={2}>Početak</Label>
                                                        <Col sm={10}>
                                                            <DatePicker timeFormat="HH:mm" timeCaption="Vrijeme" showTimeSelect locale="hr-HR" selected={this.state.startDate} onChange={this.handleStartDate} />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Label sm={2}>Kraj</Label>
                                                        <Col sm={10}>
                                                            <DatePicker timeFormat="HH:mm" timeCaption="Vrijeme" showTimeSelect locale="hr-HR" selected={this.state.endDate} onChange={this.handleEndDate} />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Col sm={10}>
                                                        {submitSucceeded && !submitting &&
                                                            <SuccessMessage>Obavijest uspješno spremljena.</SuccessMessage>
                                                        }
                                                        {error && <ErrorMsg>{error}</ErrorMsg>}
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Button type="submit" color="primary" disabled={submitting}>Dodaj obavijest</Button>
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Container>
                                 : ""}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

AddPost.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default withRouter(connect(state => ({
    posts: state.get('posts'),
    profile: state.get('profile'),
}))(reduxForm({
    form: 'newPostForm',
    enableReinitialize: true,
    validate
})(AddPost)));