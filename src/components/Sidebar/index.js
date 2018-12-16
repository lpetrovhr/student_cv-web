import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, Nav, NavItem, NavLink as RsNavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import nav from './_nav';
import SidebarFooter from 'components/SidebarFooter';
import SidebarForm from 'components/SidebarForm';
import SidebarHeader from 'components/SidebarHeader';
import SidebarMinimizer from 'components/SidebarMinimizer';

class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.hideMobile = this.hideMobile.bind(this);
  }


  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  hideMobile() {
    if (document.body.classList.contains('sidebar-mobile-show')) {
      document.body.classList.toggle('sidebar-mobile-show')
    }
  }


  render() {

    const props = this.props;
    const { isLogged, user, handdleLogout } = props;

    return (
      <div className="sidebar">
        <SidebarHeader />
        <SidebarForm />
        <nav className="sidebar-nav">
          <Nav>

            <NavItem>
              <NavLink className="nav-link" to="/" activeClassName="active" onClick={this.hideMobile}>
                <i className="icon-home"></i>Početna
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/companies" activeClassName="active" onClick={this.hideMobile}>
                <i className="icon-briefcase"></i>Poslodavci
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/posts" activeClassName="active" onClick={this.hideMobile}>
                <i className="icon-paper-plane"></i>Obavijesti
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/students" activeClassName="active" onClick={this.hideMobile}>
                <i className="icon-people"></i>Studenti
              </NavLink>
            </NavItem>
            
            {isLogged && user.role != 20 ? <li className="nav-title">Korisnik</li> : ""}
            {isLogged && user.role == 20 ? <li className="nav-title">Upravljanje</li> : ""}

            {isLogged && user.role == 0 ?
              <NavItem>
                <NavLink className="nav-link" to="/student/edit" activeClassName="active" onClick={this.hideMobile}>
                  <i className="icon-pencil"></i>Moj Profil
                </NavLink>
              </NavItem> : ""}

            {isLogged && user.role == 10 ?
              <NavItem>
                <NavLink className="nav-link" to="/company/edit" activeClassName="active" onClick={this.hideMobile}>
                  <i className="icon-pencil"></i>Moj Profil
                </NavLink>
              </NavItem> : ""}
              
              {isLogged && user && user.role == 10 ?
              <NavItem>
                <NavLink className="nav-link" to="/posts/new" activeClassName="active" onClick={this.hideMobile}>
                  <i className="icon-plus"></i>Dodaj obavijest
                </NavLink>
                </NavItem> : ""}

              {isLogged && user && user.role == 10 ?
              <NavItem>
                <NavLink className="nav-link" to="/posts/user" activeClassName="active" onClick={this.hideMobile}>
                  <i className="icon-notebook"></i>Moje obavijesti
                </NavLink>
              </NavItem> : ""}

              {isLogged && user && user.role == 20 ?
                <NavItem>
                  <NavLink className="nav-link" to="/users/all" activeClassName="active" onClick={this.hideMobile}>
                      <i className="icon-people"></i> Korisnici
                  </NavLink>
                </NavItem> : ""}
              
            
          </Nav>
        </nav>
        <SidebarFooter />
        <SidebarMinimizer />
      </div>
    )
  }
}

Sidebar.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

export default Sidebar;
