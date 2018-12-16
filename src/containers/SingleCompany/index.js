import React, { Component } from 'react';
import {
    Row, Col, Container,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, CardDeck, Button,
    FormGroup, Input, Form, Label,
    InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchSingleCompany } from '../../actions/companies';



class SingleCompany extends Component {

    constructor() {
        super();
        this.getSingleCompany = this.getSingleCompany.bind(this);
    }

    componentWillMount() {
        this.getSingleCompany();
    }

    getSingleCompany() {
        const { dispatch } = this.props;
        const id = this.props.match.params.id;
        dispatch(fetchSingleCompany(id));
    }

    renderUserTags(tags) {
        if (!tags || !tags.length) {
            return <p>Korisnik nema tagova</p>;
        }

        return tags.map((tag, key) =>
            <span className="tags tags--green" key={key}>{tag.tagName}</span>
        );
    }

    renderUserCategories(categories) {
        if (!categories || !categories.length) {
            return <p>Korisnik nema kategorija</p>;
        }

        return categories.map((category, key) =>
            <span className="tags tags--blue" key={key}>{category.name}</span>
        );
    }

    renderSocialLinks(social) {
        if (!social || !social.length) {
            return <div></div>;
        }

        return social.map((social, key) =>
            <Col xs={12} sm={3} className="emphasis">
                <a style={{ textDecoration: "none" }} href={social.socialLink} target="__blank"><Button className={"btn-" + social.socialName.toLowerCase()} block> Prati nas</Button></a>
            </Col>
        );
    }

    render () {
        const { companies } = this.props;
        const rawCompany = companies.toJS();
        const company = rawCompany.companies.data;


        return (
                <Container className="main-container" fluid>
                    <Row>
                    {company ?
                        <Card>
                            <CardTitle className="card-header">{company.companyName}</CardTitle>
                            <CardBody>
                                <Col md={12}>
                                    <Row>
                                        <Col xs={12} sm={3} md={3} className="text-center">
                                            <figure>
                                                <img src={require(`assets/images/avatars/test.jpg`)} alt="" className="img-circle img-responsive" />
                                            </figure>
                                        </Col>
                                        <Col xs={12} sm={8}>
                                            <p><strong>E-mail: </strong><a href={"mailto:" + company.email}>{company.email}</a></p>
                                            <p><strong>O nama: </strong>{company.info}</p>
                                            {/* <p><strong>Kategorije: </strong>
                                                {this.renderUserCategories(company.categories)}
                                            </p> */}
                                            {/* <p><strong>Tagovi: </strong>{this.renderUserTags(company.tags)}</p> */}
                                            <p><strong>Dodatni podaci: </strong></p>
                                            <ul>
                                                <li><strong>Telefon: </strong>{company.phone}</li>
                                                {company.fax ? <li><strong>Fax: </strong>{company.fax}</li> : ""}
                                                <li><strong>Adresa: </strong>{company.address}, Split</li>
                                                <li><strong>OIB: </strong>{company.oib}</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                    <Row className="divider text-center">
                                        {this.renderSocialLinks(company.social)}
                                    </Row>
                                </Col>
                            </CardBody>
                        </Card>
                        : ""}
                    </Row>
                </Container>
            
        );
    }
}

SingleCompany.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    companies: PropTypes.object.isRequired,
    error: PropTypes.string
};

export default withRouter(connect(state => ({
    companies: state.get('companies')
}))(SingleCompany));