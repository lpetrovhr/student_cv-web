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
import { fetchPostTypes, fetchPostCategories, fetchSinglePost, updatePost } from '../../actions/posts';
import { isRequired } from '../../middleware/validator';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import FormInput from 'components/FormInput';
import SelectInput from 'components/SelectInput';
import ErrorMsg from 'components/ErrorMessage';
import SuccessMessage from 'components/SuccessMessage';

import 'react-datepicker/dist/react-datepicker.css';
// import { start } from 'repl';

export const validate = (values) => {
    const errors = {};
    const { info, typeId } = values.toJS();

    errors.info = isRequired(info, 'hr');
    errors.typeId = isRequired(typeId, 'hr');

    return errors;
};

class PostEdit extends Component {

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
        this.getPost = this.getPost.bind(this);
    }

    componentWillMount() {
        this.getPostTypes();
        this.getPostCategories();
        this.getPost().then(() => {
            const { posts } = this.props;
            const rawPosts = posts.toJS();
            const startD = rawPosts.posts.data ? moment(rawPosts.posts.data.startDate) : {};
            const endD = rawPosts.posts.data ? moment(rawPosts.posts.data.endDate) : {};

            this.setState({
                startDate: startD,
                endDate: endD
            });
        });
    }

    getPostTypes() {
        const { dispatch } = this.props;

        return dispatch(fetchPostTypes());
    }

    getPostCategories() {
        const { dispatch } = this.props;

        return dispatch(fetchPostCategories());
    }

    getPost() {
        const { dispatch } = this.props;
        const id = this.props.match.params.id;

        return dispatch(fetchSinglePost(id));
    }

    onFormSubmit(values) {
        const { dispatch, profile } = this.props;
        const formValues = values.toJS();
        const id = this.props.match.params.id;
        const newValues = {
            postInfo: formValues.postInfo,
            typeId: formValues.typeId,
            categoryId: formValues.categoryId,
            startDate: moment(this.state.startDate).format(),
            endDate: moment(this.state.endDate).format(),
        }

        return dispatch(updatePost(id, newValues));
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
        const postTypes = rawPosts.postTypes ? rawPosts.postTypes.data : null;
        const postCategories = rawPosts.postCategories ? rawPosts.postCategories.data :null;

        return (
            <Container className="main-container" fluid>
                <Row>

                    <Col md={12}>
                        <Card>
                            <CardTitle className="card-header">Uredi obavijest</CardTitle>
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
                                                                name="postInfo"
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
                                                            <DatePicker name="startDate" timeFormat="HH:mm" timeCaption="Vrijeme" showTimeSelect locale="hr-HR" selected={this.state.startDate} onChange={this.handleStartDate} />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Label sm={2}>Kraj</Label>
                                                        <Col sm={10}>
                                                            <DatePicker name="endDate" timeFormat="HH:mm" timeCaption="Vrijeme" showTimeSelect locale="hr-HR" selected={this.state.endDate} onChange={this.handleEndDate} />
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
                                                        <Button type="submit" color="primary" disabled={submitting}>Spremi promjene</Button>
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

PostEdit.propTypes = {
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
    initialValues: state.get('posts').toJS().posts.data
}))(reduxForm({
    form: 'editPostForm',
    enableReinitialize: true,
    validate
})(PostEdit)));