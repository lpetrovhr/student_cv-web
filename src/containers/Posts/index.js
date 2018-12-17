import React, { Component } from 'react';
import { Row, Col, Container, Card, CardImg, CardText, CardBody, CardHeader, CardTitle, CardSubtitle, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchPosts, fetchPostTypes, fetchPostsByType } from '../../actions/posts';
import UserCard from 'components/UserCard';

import moment from 'moment';

class Posts extends Component {

    constructor() {
        super();
        this.getAllPosts = this.getAllPosts.bind(this);
        this.getPostTypes = this.getPostTypes.bind(this);
        this.filterPostTypes = this.filterPostTypes.bind(this);
    }

    componentWillMount() {
        this.getPostTypes();
        this.getAllPosts();
    }

    getAllPosts() {
        const { dispatch } = this.props;
        dispatch(fetchPosts());
    }

    getPostTypes() {
        const { dispatch } = this.props;
        dispatch(fetchPostTypes());
    }

    renderPosts(data) {
        if (!data.length) {
            return <p>Trenutno nema obavijesti!</p>;
        }

        return data.map((post, key) =>
            <Card key={key} className="card-accent-success">
                <CardHeader>
                    <Link to={`/companies/${post.companyId}`}><span>{post.companyName}</span></Link>
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

    renderPostsTypes(data) {
        if(!data.length) {
            return "";
        }

        return data.map((postType, key) => 
            <Button key={key} id={postType.id} className={postType.name.toLowerCase()} size="lg" onClick={this.filterPostTypes}>{postType.name}</Button>
        );
    }

    filterPostTypes (e) {
        const { dispatch } = this.props;
        dispatch(fetchPostsByType(e.target.id));
    }

    render() {

        const { posts } = this.props;
        const rawPosts = posts.toJS();
        const allPosts = rawPosts.posts.data;
        const postTypes = rawPosts.postTypes ? rawPosts.postTypes.data : null;
        console.log(postTypes);

        return (
            <Container className="main-container animated fadeIn" fluid>
                <Card className="post-type-filter">
                    <CardHeader>
                        <div><span>Filter</span></div>
                    </CardHeader>
                    <CardBody>
                        {postTypes ? this.renderPostsTypes(postTypes) : ""}
                    </CardBody>
                </Card>
                {allPosts ? this.renderPosts(allPosts) : ""}
            </Container>
        )
    }
}

Posts.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    error: PropTypes.string
};

export default withRouter(connect(state => ({
    posts: state.get('posts')
}))(Posts));
