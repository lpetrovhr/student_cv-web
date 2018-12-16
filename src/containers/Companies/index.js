import React, { Component } from 'react';
import {
  Row, Col, Container,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchCompanies } from '../../actions/companies';
import UserCard from 'components/UserCard';
import store from 'store';



class Companies extends Component {

  constructor() {
    super();
    this.getCompanies = this.getCompanies.bind(this);
  }

  componentWillMount() {
    this.getCompanies();
  }

  getCompanies() {
    const { dispatch } = this.props;
    dispatch(fetchCompanies());
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

  render() {

    const { companies } = this.props;
    const rawC = companies.toJS();
    const allCompanies = rawC.companies.data;

    return (
      <Container className="main-container animated fadeIn" fluid>
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
  companies: state.get('companies')
}))(Companies));
