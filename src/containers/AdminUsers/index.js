import React, { Component } from 'react';
import {
        Badge,
        Row,
        Col,
        Container,
        Progress,
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
        Card,
        CardHeader,
        CardBody,
        CardFooter,
        CardTitle,
        Button,
        ButtonToolbar,
        ButtonGroup,
        ButtonDropdown,
        Label,
        Input,
        Table
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchAllUsers, updateActiveState } from '../../actions/user';



class AdminUsers extends Component {

    constructor() {
        super();
        this.allUsers = this.getAllUsers.bind(this);
    }

    componentWillMount() {
        this.getAllUsers();
    }

    getAllUsers() {
        const { dispatch } = this.props;
        dispatch(fetchAllUsers());
    }

    activeChange(id, status) {
        const { dispatch } = this.props;
        dispatch(updateActiveState(id, !status)).then(() => this.getAllUsers());
    }

    renderUsers(data) {
        if (!data || !data.length) {
            return "";
        }

        const users = data.filter(user => user.role != 20);

        return users.map((user, key) =>
            <tr key={user.id}>
                {user.role == 0 ?
                    <td><Link to={`/students/${user.id}`}>{user.email}</Link></td>
                        :
                    <td><Link to={`/companies/${user.id}`}>{user.email}</Link></td>
                }
                <td>{user.role}</td>
                {user.active ?
                    <td>
                        <div className="activeUser"></div><span style={{ color: "red", cursor: "pointer" }} onClick={() => this.activeChange(user.id, true)}>Deaktiviraj</span>
                    </td>
                        : 
                    <td>
                        <div className="inactiveUser"></div><span style={{ color: "green", cursor: "pointer" }} onClick={() => this.activeChange(user.id, false)}>Aktiviraj</span>
                    </td>
                } 
            </tr>
        );
    }

    render() {
        const { user } = this.props;
        const allUsers = user && user.toJS().user ? user.toJS().user.data : null;

        const students = allUsers ? allUsers.filter(user => user.role == 0) : {};
        const companies = allUsers ? allUsers.filter(user => user.role == 10) : {};

        return (
            <Container className="main-container animated fadeIn" fluid>
                <h2>Poslodavci</h2>
                <Table striped hover responsive className="table-outline mb-0 d-none d-sm-table">
                    <thead className="thead-light">
                        <tr>
                            <th>Korisnik</th>
                            <th>Razina prava</th>
                            <th>Aktiviran</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers ? this.renderUsers(companies) : ""}
                    </tbody>
                </Table>
                <h2>Studenti</h2>
                <Table striped hover responsive className="table-outline mb-0 d-none d-sm-table">
                    <thead className="thead-light">
                        <tr>
                            <th>Korisnik</th>
                            <th>Razina prava</th>
                            <th>Aktiviran</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers ? this.renderUsers(students) : ""}
                    </tbody>
                </Table>
            </Container>
        )
    }
}

AdminUsers.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    error: PropTypes.string
};

export default withRouter(connect(state => ({
    user: state.get('user'),
}))(AdminUsers));
