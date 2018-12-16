import React, { Component } from 'react';
import {
    Row, Col, Container,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    FormGroup, Input, Form, Label,
    InputGroup, InputGroupAddon, InputGroupText, Badge
} from 'reactstrap';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchSingleStudent } from '../../actions/students';
import { getCurrentProfile, updateStudentById, updateSocialCategories, updateUserImage, addUserTag, removeUserTag } from '../../actions/profile';
import { fetchCategories, fetchSocial, fetchTags } from '../../actions/categories';
import SocialForm from 'components/SocialForm';

import store from 'store';

import StudentForm from 'components/StudentForm';

class StudentEdit extends Component {

    constructor() {
        super();
        this.state = {
            selectedFile: null,
            value: '',
            suggestions: [],
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.onSocialFormSubmit = this.onSocialFormSubmit.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.getAllCategories = this.getAllCategories.bind(this);
        this.getAllSocialCategories = this.getAllSocialCategories.bind(this);
        this.onTagsInputChange = this.onTagsInputChange.bind(this);
        this.getAllTags = this.getAllTags.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onTagsAddClick = this.onTagsAddClick.bind(this);
        this.removeUserTag = this.removeUserTag.bind(this);
    }

    componentWillMount() {
        this.getUserData();
        this.getAllCategories();
        this.getAllSocialCategories();
        this.getAllTags();
    }

    getUserData() {
        const { dispatch } = this.props;
        const currentUser = store.get('user');

        return dispatch(getCurrentProfile(currentUser.id));
    }

    getAllCategories() {
        const { dispatch } = this.props;

        return dispatch(fetchCategories());
    }

    getAllSocialCategories() {
        const { dispatch } = this.props;

        return dispatch(fetchSocial());
    }

    getAllTags() {
        const { dispatch } = this.props;

        return dispatch(fetchTags());
    }

    onSocialFormSubmit(values) {
        const { dispatch } = this.props;
        const links = values.toJS();
        const currentUser = store.get('user');

        return dispatch(updateSocialCategories(currentUser.id, links));
    }

    onFormSubmit(values) {
        const { dispatch } = this.props;
        const currentUser = store.get('user');
        const formValues = values.toJS();

        return dispatch(updateStudentById(formValues, currentUser.id)).then(dispatch(getCurrentProfile(currentUser.id)));
    }

    uploadImage() {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        const { dispatch } = this.props;
        const currentUser = store.get('user');
        console.log(fd);
        return dispatch(updateUserImage(currentUser.id, fd)).then(dispatch(getCurrentProfile(currentUser.id)));
    }

    onImageChange(e) {
        console.log(e.target.files[0]);
        this.setState({ selectedFile: e.target.files[0] });
    }

    getSuggestions(value) {
        const { categories } = this.props;
        const rawCategories = categories.toJS();
        const allTags = rawCategories.tags.data;
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : allTags.filter(tag => {
            return tag.name.toLowerCase().indexOf(inputValue) > -1
        });
    };

    getSuggestionValue(suggestion) {
        return suggestion.name;
    };

    renderSuggestion(suggestion) {
        return (
            <div>
                {suggestion.name}
            </div>);
    }

    onTagsInputChange(event, { newValue }) {
        this.setState({ value: newValue });
    };

    onSuggestionsFetchRequested({ value }) {
        this.setState({ suggestions: this.getSuggestions(value) });
    };

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    };

    onTagsAddClick() {
        const { value } = this.state;
        const { dispatch } = this.props;
        const currentUser = store.get('user');

        dispatch(addUserTag(currentUser.id, value)).then(() => {
            this.getUserData();
        });
    }

    removeUserTag(e) {
        const { dispatch } = this.props;
        const currentUser = store.get('user');
        const tagId = e.target.id;

        dispatch(removeUserTag(currentUser.id, tagId)).then(() => { this.getUserData(); });
    }

    render() {

        const { profile, categories } = this.props;
        const { value, suggestions } = this.state;
        const rawProfile = profile.toJS();
        const rawCategories = categories.toJS();
        const currentUser = rawProfile.data ? rawProfile.data.user : {};
        const allCategories = rawCategories ? rawCategories.categories.data : {};
        const social = rawCategories ? rawCategories.social.data : {};
        const tags = currentUser.student ? currentUser.student.tags : null;

        const inputProps = {
            placeholder: 'Dodaj interes',
            value,
            onChange: this.onTagsInputChange
        };

        return (
            <Container className="main-container" fluid>
                <Row>
                    <Col md={12}>
                        <Card>
                            <CardTitle className="card-header">Osnovni podaci</CardTitle>
                            <CardBody>
                                {rawProfile.data ? <StudentForm user={currentUser} categories={allCategories} onSubmit={this.onFormSubmit} /> : ""}
                            </CardBody>
                        </Card>
                        <Card>
                            <CardTitle className="card-header">Interesi</CardTitle>
                            <CardBody>
                                <Row>
                                    Vaši trenutni interesi:
                                    <Col>
                                        {tags ? tags.map(tag =>
                                            <Badge style={{ padding: "8px", margin: "0 5px 5px 5px", fontSize: "12px" }} color="primary" key={tag.tagId} id={tag.tagId}>{tag.tagName} <span style={{ cursor: "pointer" }} id={tag.tagId} onClick={this.removeUserTag}>x</span></Badge>
                                        ) : <p>Korisnik nema dodanih interesa</p>}
                                    </Col>
                                </Row>
                                <Row>
                                    Dodaj interese:
                                    <Col md="4">
                                        <Autosuggest
                                            suggestions={suggestions}
                                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                            getSuggestionValue={this.getSuggestionValue}
                                            renderSuggestion={this.renderSuggestion}
                                            inputProps={inputProps}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <Button onClick={this.onTagsAddClick} color="primary">Dodaj</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardTitle className="card-header">Fotografija</CardTitle>
                            <Row>
                                <Col xs={12} sm={3} md={3} className="text-center">
                                    <figure>
                                        <img src={require(`assets/images/avatars/test.jpg`)} alt="" style={{ margin: '20px' }} className="img-circle img-responsive" />
                                    </figure>
                                    <figure>
                                        {currentUser.student ? <img src={'http://localhost:3000/' + currentUser.student.profilePicture} alt="" className="img-circle img-responsive" /> : ''}
                                    </figure>
                                    <input type="file" name="myImage" onChange={this.onImageChange} />
                                    <Button type="submit" color="primary" onClick={this.uploadImage}>Promjeni fotografiju</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

StudentEdit.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    error: PropTypes.string
};

export default withRouter(connect(state => ({
    students: state.get('students'),
    profile: state.get('profile'),
    categories: state.get('categories'),
}))(StudentEdit));