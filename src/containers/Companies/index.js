import React, { Component } from 'react';
import {
  Row, Col,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchCompanies } from '../../actions/companies';
import UserCard from 'components/UserCard';



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

      return data.map((user, key) =>
          <UserCard
              key={key}
              user={user}
              type="company"
          />
      );
  }

  render() {

    const { companies } = this.props;
    const allCompanies = companies.data;

    return (
      <div className="animated fadeIn">
          <Row>
              {this.renderUsers(allCompanies)}
          </Row>
      </div>
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
  companies: state.companies
}))(Companies));
