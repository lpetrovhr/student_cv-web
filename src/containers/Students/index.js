import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Container, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchStudents, fetchSingleStudent, fetchStudenSearchResults } from '../../actions/students';
import { fetchCategories } from '../../actions/categories';
import UserCard from 'components/UserCard';
import store from 'store';

class Students extends Component {

  constructor() {
      super();
      this.getStudents = this.getStudents.bind(this);
      this.onNameSearch = this.onNameSearch.bind(this);
      this.onTagSearch = this.onTagSearch.bind(this);
      this.onCategorySearch = this.onCategorySearch.bind(this);
      this.renderUsers = this.renderUsers.bind(this);
      this.getAllCategories = this.getAllCategories.bind(this);

      this.state = {
        nameSearch: '',
        tagSearch: '',
        categorySearch: ''
      };
  }

  componentWillMount() {
      this.getStudents();
      this.getAllCategories();
  }

  getAllCategories() {
    const { dispatch } = this.props;

    return dispatch(fetchCategories());
  }
  
  getStudents() {
      const { dispatch } = this.props;
      dispatch(fetchStudents());
  }

  renderUsers(data) {
      if (!data || !data.length) {
        return "";
      }

      const currentUser = store.get('user');
      const currentUserRole = currentUser ? currentUser.role : null;
      const isAdmin = currentUserRole == 20;

      return data.map((user, key) =>
        (user.active || isAdmin) ?
          <UserCard
            key={key}
            user={user}
            type="student"
          /> : null
      );
  }

  onNameSearch(e) {
    const { dispatch } = this.props;
    this.state.nameSearch = e.target.value;

    dispatch(fetchStudenSearchResults(this.state.nameSearch, this.state.tagSearch, this.state.categorySearch));
  }

  onTagSearch(e) {
    const { dispatch } = this.props;
    this.state.tagSearch = e.target.value;
      
    dispatch(fetchStudenSearchResults(this.state.nameSearch, this.state.tagSearch, this.state.categorySearch));
  }

  onCategorySearch(e) {
    const { dispatch } = this.props;
    this.state.categorySearch = e.target.value;
    dispatch(fetchStudenSearchResults(this.state.nameSearch, this.state.tagSearch, this.state.categorySearch));

  }

  render() {
    const { students, categories } = this.props;
    const rawStudents = students.toJS();
    const rawCategories = categories.toJS();
    const allStudents = rawStudents.students.data;
    const allCategories = rawCategories ? rawCategories.categories.data : {};

    return (
      <Container className="main-container animated fadeIn" fluid>
        <Card style={{ padding: '10px' }}>
          <Row>
            <Col md="4">
              <Input type="text" placeholder="Ime i prezime" onChange={this.onNameSearch} />
            </Col>
            <Col md="4">
              <Input type="text" placeholder="Interesi" onChange={this.onTagSearch} />
            </Col>
            <Col md="4">
              <Input type="select" onChange={this.onCategorySearch} >
                <option value="">Pretraga po studijskom programu</option>
                {allCategories ? allCategories.map(type =>
                  <option value={type.id} key={type.id}>{type.name}</option>
                ) : ""}
              </Input>
            </Col>
          </Row>
        </Card>
        <Row>
          {allStudents ? this.renderUsers(allStudents) : ""}
        </Row>
      </Container>
    )
  }
}

Students.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  students: PropTypes.object.isRequired,
  error: PropTypes.string
};

export default withRouter(connect(state => ({
  students: state.get('students'),
  categories: state.get('categories'),
}))(Students));
