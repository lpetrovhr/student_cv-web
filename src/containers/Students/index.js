import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchStudents, fetchSingleStudent } from '../../actions/students';
import UserCard from 'components/UserCard';



class Students extends Component {

  constructor() {
      super();
      this.getStudents = this.getStudents.bind(this);
  }

  componentWillMount() {
      this.getStudents();
  }
  
  getStudents() {
      const { dispatch } = this.props;
      dispatch(fetchStudents());
  }

  renderUsers(data) {
      if (!data.length) {
        return <p>Trenutno nema poslodavaca!</p>;
      }

      return data.map((user, key) =>
        <UserCard
            key={key}
            user={user}
            type="student"
        />
      );
  }

  render() {
    const { students } = this.props;
    const allStudents = students.data;

    return (
      <Container className="main-container animated fadeIn" fluid>
        <Row>
          {this.renderUsers(allStudents)}
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
  students: state.students
}))(Students));
