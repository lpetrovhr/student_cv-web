import React, { Component } from 'react';
import { Row, Col, Container, Card, CardImg, CardText, CardBody, CardHeader, CardTitle, CardSubtitle, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchUserPosts } from '../../actions/posts';
import UserCard from 'components/UserCard';

import store from 'store';
import moment from 'moment';

class UserPosts extends Component {

    constructor() {
        super();

        this.getAllPosts = this.getAllPosts.bind(this);
    }

    componentWillMount() {
        this.getAllPosts();
    }

    getAllPosts() {
        const { dispatch, profile } = this.props;
        const currentUser = store.get('user');

        dispatch(fetchUserPosts(currentUser.id));
    }

    renderPosts(data, currentUser) {
        if (!data.length) {
            return <p>Trenutno nema obavijesti!</p>;
        }
        
        return data.map((post, key) =>
            <Card key={key} className="card-accent-success">
                <CardHeader>
                    <Link to={`/companies/${currentUser.id}`}><span>{currentUser.company.companyName}</span></Link>
                    <Link to={`/posts/edit/${post.id}`}><span style={{ position: 'absolute', right: '130px' }}><i className="fas fa-edit"></i> Uredi</span></Link>
                    <div className="card-actions"><span className={post.typeName.toLowerCase()}>{post.typeName}</span></div>
                </CardHeader>
                <div className="collapse show">
                    <CardBody>
                        <p>{post.postInfo}</p>
                        {post.startDate ? <p><strong>Datum:</strong> {moment(post.startDate).format('DD.MM.YYYY hh:mm:ss')}</p> : ""}
                    </CardBody>
                </div>
            </Card>
        );
    }

    render() {

        const { posts, profile } = this.props;
        const rawPosts = posts.toJS();
        const allPosts = rawPosts.posts.data;
        const currentUser = store.get('user');
        console.log('user posts', allPosts);

        return (
            <Container className="main-container animated fadeIn" fluid>
                {allPosts ? this.renderPosts(allPosts, currentUser) : ""}
            </Container>
        )
    }
}

UserPosts.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    error: PropTypes.string
};

export default withRouter(connect(state => ({
    posts: state.get('posts'),
    profile: state.get('profile')
}))(UserPosts));
