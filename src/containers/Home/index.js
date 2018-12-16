import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Row,
  Col,
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
  Table,
  Jumbotron
} from 'reactstrap';

const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandWarning = '#f8cb00';
const brandDanger = '#f86c6b';


class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={12}>
            <Jumbotron>
              <h5>Dobro došli</h5>
              <p>Ova aplikacija namjenjena je studentima i gospodarstvenicima, da
                im omogući lakše praćenje događanja vezanih za njihovu struku, te 
                za lakše nalaženje posla i prakse.
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;
