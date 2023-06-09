import React, { Component } from 'react';
import { Container, Col, Row, Card, ListGroup, Pagination } from "react-bootstrap";
import StarRatings from './star-ratings';

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [
                { id: 1, title: 'Blog post 1', content: 'Lorem', date: new Date('2022-03-26') },
                { id: 2, title: 'Blog post 2', content: 'Lorem', date: new Date('2022-03-27') },
                { id: 3, title: 'Blog post 3', content: 'Lorem', date: new Date('2022-03-28') },
                { id: 4, title: 'Blog post 4', content: 'Lorem', date: new Date('2022-04-01') },
                { id: 5, title: 'Blog post 5', content: 'Lorem', date: new Date('2022-04-03') },
                { id: 6, title: 'Blog post 6', content: 'Lorem', date: new Date('2022-04-02') },
                { id: 7, title: 'Blog post 7', content: 'Lorem', date: new Date('2022-04-05') },
                { id: 8, title: 'Blog post 8', content: 'Lorem', date: new Date('2022-04-06') },
                { id: 9, title: 'Blog post 9', content: 'Lorem', date: new Date('2022-04-07') },
                { id: 10, title: 'Blog post 10', content: 'Lorem', date: new Date('2022-04-08') },
                { id: 11, title: 'Blog post 11', content: 'Lorem', date: new Date('2022-04-09') },
                { id: 12, title: 'Blog post 12', content: 'Lorem', date: new Date('2022-04-11') },
                { id: 13, title: 'Blog post 13', content: 'Lorem', date: new Date('2022-04-12') },
                { id: 14, title: 'Blog post 14', content: 'Lorem', date: new Date('2022-04-15') },
                { id: 15, title: 'Blog post 15', content: 'Lorem', date: new Date('2022-04-14') },
                { id: 16, title: 'Blog post 16', content: 'Lorem', date: new Date('2022-04-16') },
                { id: 17, title: 'Blog post 17', content: 'Lorem', date: new Date('2022-04-17') },
                { id: 18, title: 'Blog post 18', content: 'Lorem', date: new Date('2022-04-19') },
                { id: 19, title: 'Blog post 19', content: 'Lorem', date: new Date('2022-04-20') },
                { id: 20, title: 'Blog post 20', content: 'Lorem', date: new Date('2022-04-22') }

            ],
            currentPage: 1,
            itemsPerPage: 10,
            ratings: {}
        };
        this.sortByDateAsc = this.sortByDateAsc.bind(this);
        this.sortByDateDesc = this.sortByDateDesc.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleRatingClick = this.handleRatingClick.bind(this);
    }

    sortByDateAsc() {
        const sortedPosts = [...this.state.posts].sort((a, b) => a.date - b.date);
        this.setState({ posts: sortedPosts, isSortedAscending: true });
    }

    sortByDateDesc() {
        const sortedPosts = [...this.state.posts].sort((a, b) => b.date - a.date);
        this.setState({ posts: sortedPosts, isSortedAscending: false });
    }

    handlePageChange(pageNumber) {
        this.setState({ currentPage: pageNumber });
    }
    handleRatingClick(postId, newRating) { 
        this.setState(prevState => ({
            ratings: {
                ...prevState.ratings,
                [postId]: newRating
            }
        }));
    }
    


    render() {
        const { posts, isSortedAscending, currentPage, itemsPerPage } = this.state;

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

        const totalPages = Math.ceil(posts.length / itemsPerPage);
        const paginationLinks = [];
        for (let i = 1; i <= totalPages; i++) {
            paginationLinks.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => this.handlePageChange(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }

        return (
            <Container>
                <Row>
                    <Col md="9">
                        {currentItems.map(post => (
                            <div key={post.id} className="d-flex align-items-center me-5">
                                <div className="flex-shrink-0">
                                    <img
                                        width={150}
                                        height={150}
                                        className="mr-3"
                                        src="https://emgotas.files.wordpress.com/2016/11/what-is-a-team.jpg"
                                        alt="photo" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h5>{post.title}</h5>
                                    <p>{post.content}</p>
                                    <StarRatings
                                        rating={this.state.ratings[post.id] || 0}
                                        starRatedColor="#ffd700"
                                        numberOfStars={5}
                                        starDimension="24px"
                                        starSpacing="4px"
                                        changeRating={(newRating) => this.handleRatingClick(post.id, newRating)}
                                    />
                                    <p>{post.date.toLocaleDateString()}</p>

                                </div>
                            </div>
                        ))}
                    </Col>
                    <Col md="3">
                        <h5 className="text-center mt-5">Категорії</h5>
                        <button className={isSortedAscending ? 'btn btn-primary' : 'btn'} onClick={this.sortByDateAsc}>
                            Дата ↑
                        </button>
                        <button className={!isSortedAscending ? 'btn btn-primary' : 'btn'} onClick={this.sortByDateDesc}>
                            Дата ↓
                        </button>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>категорія 1</ListGroup.Item>
                                <ListGroup.Item>категорія 2</ListGroup.Item>
                                <ListGroup.Item>категорія 3</ListGroup.Item>
                                <ListGroup.Item>категорія 4</ListGroup.Item>
                                <ListGroup.Item>категорія 5</ListGroup.Item>
                            </ListGroup>
                        </Card>
                        <Pagination>{paginationLinks}</Pagination>
                    </Col >
                    <Card className="mt-3 bg-light">
                        <Card.Body>
                            <Card.Title>Slide widget</Card.Title>
                            <Card.Text>
                                Lorem
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        );
    }
}

export default Blog;
