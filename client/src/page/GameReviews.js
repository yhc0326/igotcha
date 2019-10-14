import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import Grid from '@material-ui/core/Grid';
import Card from "../components/Card";
import { withRouter, Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import { loadGamePage, downloadGame, addReview, deleteReview } from "../redux/actions/game";
import PropTypes from 'prop-types';

const defaultValue = [1, 5];

class GameReviews extends Component {
    state = {
        card: {},
        value: defaultValue,
        comments: [],
        commentsFiltered: [],
        rating: 0,
        comment: "",
        haveADownload: false,
        haveAReview: false,
        redirect: false,
    }

    componentDidMount() {
        this.props.loadGamePage({
            id: this.props.location.state.game.id
        }).then(() => {
            if(this.props.gamePage !== undefined && this.props.gamePage !== null) {
                const gamePage = this.props.gamePage;
                let comments = [];
                let haveADownload = false;
                let haveAReview = false;

                for(let i=0; i<gamePage.length; i++) {
                    if(gamePage[i].user_id!==null) {
                        if(gamePage[i].rating!==null) {
                            let date = new Date(gamePage[i].review_date);
                            comments.push({
                                ratings: gamePage[i].rating,
                                writer: gamePage[i].fname + " " + gamePage[i].lname,
                                content: gamePage[i].review,
                                date: date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
                                myComment: this.props.user!==null?gamePage[i].user_id===this.props.user.id:false
                            });
                        }

                        if(this.props.user!==null && gamePage[i].user_id===this.props.user.id) {
                            haveADownload = true;
                            if(gamePage[i].rating !== null) {
                                haveAReview = true;
                            }
                        }
                    }
                }

                this.setState({
                    card: {
                        id: this.props.location.state.game.id,
                        title: this.props.location.state.game.title,
                        desc: this.props.location.state.game.desc,
                        ratedBy: this.props.location.state.game.ratedBy,
                        playedBy: this.props.location.state.game.playedBy,
                        ratings: this.props.location.state.game.ratings,
                        url: this.props.location.state.game.url
                    },
                    comments,
                    commentsFiltered: comments,
                    haveADownload,
                    haveAReview
                })
            } else {
                alert("Server Error");
            }
        })
    }

    onChange = (newValue) => {
        if(this.state.value[0] !== newValue[0] || this.state.value[1] !== newValue[1]) {
            this.setState(state => {
                let comments = [...state.comments];

                let commentsFiltered = comments.filter(item => item.ratings>=newValue[0]&&item.ratings<=newValue[1]);

                return {
                    value: newValue,
                    commentsFiltered
                };
            })
        }
    }

    onRating = (value) => {
        if(this.state.rating !== value) {
            this.setState({
                rating: value
            });
        }
    }

    onWriting = (value) => {
        this.setState({
            comment: value
        })
    }

    onAdd = () => {
        if(this.state.rating === 0) {
            alert("Please rate the game");
            return;
        } else if(this.state.comment === "") {
            alert("Please write a comment");
            return;
        }
        this.props.addReview({
            rating: this.state.rating,
            comment: this.state.comment,
            gameId: this.props.location.state.game.id,
            userId: this.props.user.id
        }).then(() => {
            if(this.props.addedReview !== null) {
                this.setState( state => {
                    let comments = [...state.comments];

                    const date = new Date();

                    comments.unshift({
                        ratings: this.state.rating,
                        writer: this.props.user.fname + " " + this.props.user.lname,
                        content: this.state.comment,
                        date: date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
                        myComment: true
                    });

                    let commentsFiltered = [...state.commentsFiltered];

                    commentsFiltered.unshift({
                        ratings: this.state.rating,
                        writer: this.props.user.fname + " " + this.props.user.lname,
                        content: this.state.comment,
                        date: date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
                        myComment: true
                    });

                    return {
                        haveAReview: true,
                        comments,
                        commentsFiltered
                    }
                })
            }
        })
    }

    onEdit = () => {
        this.setState(state => {
            let comments = [...state.comments];

            let myComments = comments.filter(item => item.myComment);
            comments = comments.filter(item => !item.myComment);

            let commentsFiltered = [...state.commentsFiltered];

            commentsFiltered = commentsFiltered.filter(item => !item.myComment)

            const content = myComments[0].content;
            const ratings = myComments[0].ratings;

            return {
                haveAReview: false,
                comments,
                commentsFiltered,
                rating: ratings,
                comment: content
            };
        })
    }

    onDelete = () => {
        this.props.deleteReview({
            gameId: this.props.location.state.game.id,
            userId: this.props.user.id
        }).then(() => {
            if(this.props.deletedReview !== null) {
                this.setState(state => {
                    let comments = [...state.comments];

                    comments = comments.filter(item => !item.myComment)

                    let commentsFiltered = [...state.commentsFiltered];

                    commentsFiltered = commentsFiltered.filter(item => !item.myComment)

                    return {
                        haveAReview: false,
                        comments,
                        commentsFiltered
                    };
                })
            } else {
                alert("Failed deleting my review");
            }
        })
    }

    onDownload = () => {
        if(!this.props.isAuthenticated) {
            alert("Please Log in first to download the game");
            this.setState({
                redirect: true
            })
        } else if(this.state.haveADownload) {
            alert("Playing your game now...");
        } else {
            this.props.downloadGame({
                gameId: this.props.location.state.game.id,
                userId: this.props.user.id
            }).then(() => {
                if(this.props.downloadedGame !== null) {
                    alert("Successfully Downloaded the game, enjoy playing!");
                    this.setState({
                        haveADownload: true
                    });
                } else {
                    alert("Failed downloading the game");
                }
            });
        }
    }

    render() {
        if(this.state.redirect) {
            return (
                <Redirect to="/login" />
            );
        }

        return (
            <div>
                <ResponsiveDrawer page="Games" pageName="GameSessions">
                </ResponsiveDrawer>
                <Container style={this.props.styles}>
                    <Grid container spacing={3}>
                        <Card
                            url={this.state.card.url}
                            title={this.state.card.title}
                            desc={this.state.card.desc}
                            ratedBy={this.state.card.ratedBy}
                            playedBy={this.state.card.playedBy}
                            ratings={this.state.card.ratings}
                            reviewsPage
                            onChange={this.onChange}
                            defaultValue={defaultValue}
                            comments={this.state.commentsFiltered}
                            onRating={this.onRating}
                            onWriting={this.onWriting}
                            rating={this.state.rating}
                            comment={this.state.comment}
                            onEdit={this.onEdit}
                            onDelete={this.onDelete}
                            haveAReview={this.state.haveAReview}
                            haveADownload={this.state.haveADownload}
                            isAuthenticated={this.props.isAuthenticated}
                            onDownload={this.onDownload}
                            onAdd={this.onAdd}
                        />
                    </Grid>
                </Container>
            </div>
        );
    }
}

GameReviews.propTypes = {
   loadGamePage: PropTypes.func.isRequired,
   downloadGame: PropTypes.func.isRequired,
   addReview: PropTypes.func.isRequired,
   deleteReview: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    serverError: state.user.serverError,
    isAuthenticated: state.user.isAuthenticated,
    gamePage: state.game.gamePage,
    user: state.user!==null&&state.user.user!==null && state.user.user!==undefined?state.user.user[0]:null,
    downloadedGame: state.game.downloadedGame,
    addedReview: state.game.addedReview,
    deletedReview: state.game.deletedReview,
});

export default connect(mapStateToProps, { loadGamePage, downloadGame, addReview, deleteReview })(withRouter(GameReviews));