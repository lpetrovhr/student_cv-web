import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink as RsNavlink,
  Badge
} from 'reactstrap';

import HeaderDropdown from 'components/HeaderDropdown';

function sidebarToggle(e) {
  e.preventDefault();
  document.body.classList.toggle('sidebar-hidden');
}

function sidebarMinimize(e) {
  e.preventDefault();
  document.body.classList.toggle('sidebar-minimized');
}

function mobileSidebarToggle(e) {
  e.preventDefault();
  document.body.classList.toggle('sidebar-mobile-show');
}

function asideToggle(e) {
  e.preventDefault();
  document.body.classList.toggle('aside-menu-hidden');
}

const Header = (props) => {
  const { isLogged, user, handdleLogout } = props;

    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <NavbarToggler className="d-md-down-none" onClick={sidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
       
        {user && user.student ? <strong style={{color: '#20a8d8'}}>{user.student.firstName + ' ' + user.student.lastName}</strong> : ""}
        {user && user.company ? <strong style={{ color: '#20a8d8' }}>{user.company.companyName}</strong> : ""}

        <Nav className="ml-auto main-navbar" navbar>
            <NavItem className="px-3 hidden-sm hidden-xs">
              <NavLink to="/posts">Obavijesti</NavLink>
            </NavItem>
            <NavItem className="px-3 hidden-sm hidden-xs">
              <NavLink to="/students">Studenti</NavLink>
            </NavItem>
            <NavItem className="px-3 hidden-sm hidden-xs">
              <NavLink to="/companies">Poslodavci</NavLink>
            </NavItem>
            {isLogged ? 
              <NavItem className="px-3">
                <NavLink to="" onClick={handdleLogout}><i className="icon-logout"></i> Odjava</NavLink>
              </NavItem> : 
              <NavItem className="px-3">
                <NavLink to="/login"><i className="icon-login"></i> Prijava/Registracija</NavLink>
              </NavItem>
            }
            
        </Nav>
      </header>
    );
  }

Header.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  user: PropTypes.object,
  handdleLogout: PropTypes.func,
};

export default Header;
