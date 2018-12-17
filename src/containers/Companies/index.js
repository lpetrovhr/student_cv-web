import React, { Component } from 'react';
import {
  Row, Col, Container,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchCompanies, fetchCompanySearchResults } from '../../actions/companies';
import { fetchCategories } from '../../actions/categories';
import UserCard from 'components/UserCard';
import store from 'store';

class Companies extends Component {

  constructor() {
    super();
    this.getCompanies = this.getCompanies.bind(this);
    this.onNameSearch = this.onNameSearch.bind(this);
    this.onTagSearch = this.onTagSearch.bind(this);
    this.onCategorySearch = this.onCategorySearch.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);

    this.state = {
      nameSearch: '',
      tagSearch: '',
      categorySearch: ''
    };
  }

  componentWillMount() {
    this.getCompanies();
    this.getAllCategories();
  }

  getCompanies() {
    const { dispatch } = this.props;
    dispatch(fetchCompanies());
  }

  getAllCategories() {
    const { dispatch } = this.props;

    return dispatch(fetchCategories());
  }

  renderUsers(data) {
      if(!data.length) {
          return <p>Trenutno nema poslodavaca!</p>;
      }

      const currentUser = store.get('user');
      const currentUserRole = currentUser ? currentUser.role : null;
      const isAdmin = currentUserRole == 20;

      return data.map((user, key) =>
          (user.active || isAdmin) ?
            <UserCard
                key={key}
                user={user}
                type="company"
            /> : null 
      );
  }

  onNameSearch(e) {
    const { dispatch } = this.props;
    this.state.nameSearch = e.target.value;

    dispatch(fetchCompanySearchResults(this.state.nameSearch, this.state.tagSearch, this.state.categorySearch));
  }

  onTagSearch(e) {
    const { dispatch } = this.props;
    this.state.tagSearch = e.target.value;

    dispatch(fetchCompanySearchResults(this.state.nameSearch, this.state.tagSearch, this.state.categorySearch));
  }

  onCategorySearch(e) {
    const { dispatch } = this.props;
    this.state.categorySearch = e.target.value;
    dispatch(fetchCompanySearchResults(this.state.nameSearch, this.state.tagSearch, this.state.categorySearch));

  }

  render() {

    const { companies, categories } = this.props;
    const rawC = companies.toJS();
    const rawCategories = categories.toJS();
    const allCompanies = rawC.companies ? rawC.companies.data : null;
    const allCategories = rawCategories.categories ? rawCategories.categories.data : null;

    return (
      <Container className="main-container animated fadeIn" fluid>
          <Card style={{ padding: '10px' }}>
            <Row>
              <Col md="4">
                <Input type="text" placeholder="Naziv gospodarstvenika" onChange={this.onNameSearch} />
              </Col>
              <Col md="4">
                <Input type="text" placeholder="Interesi" onChange={this.onTagSearch} />
              </Col>
              <Col md="4">
                <Input type="select" onChange={this.onCategorySearch} >
                  <option value="">Pretraga po kategoriji</option>
                  {allCategories ? allCategories.map(type =>
                    <option value={type.id} key={type.id}>{type.name}</option>
                  ) : ""}
                </Input>
              </Col>
            </Row>
          </Card>
          <Row>
              {allCompanies ? this.renderUsers(allCompanies) : ""}
          </Row>
      </Container>
    )
  }
}

Companies.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  companies: PropTypes.object.isRequired,
  error: PropTypes.string
};

export default withRouter(connect(state => ({
  companies: state.get('companies'),
  categories: state.get('categories'),
}))(Companies));
