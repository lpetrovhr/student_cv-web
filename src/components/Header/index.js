import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Badge
} from 'reactstrap';

import HeaderDropdown from 'components/HeaderDropdown';

class Header extends Component {

  constructor(props) {
    super(props);
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Nav className="d-md-down-none" navbar>
          <HeaderDropdown />
          
        </Nav>
        <Nav className="ml-auto" navbar>
            <NavItem className="px-3">
              <NavLink href="/events">Obavijesti</NavLink>
            </NavItem>
            <NavItem className="px-3">
              <NavLink href="/students">Studenti</NavLink>
            </NavItem>
            <NavItem className="px-3">
              <NavLink href="/companies">Poslodavci</NavLink>
            </NavItem>
            <NavItem className="px-3">
              <NavLink href="/logout"><i className="icon-logout"></i> Odjava</NavLink>
            </NavItem>
        </Nav>
      </header>
    );
  }
}

export default Header;
