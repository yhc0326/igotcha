import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import Grid from '@material-ui/core/Grid';
import Card from "../components/Card";
import { NavLink, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { loadGames } from "../redux/actions/game";
import PropTypes from 'prop-types';

class GameSessions extends Component {
    state = {
        cards: [],
        clickedLink: null
    }

    componentDidMount() {
        this.props.loadGames({

        }).then(() => {
            if(this.props.games === null) {
                alert("Server Error");
            } else if(this.props.games.length === 0) {
                alert("No games found");
            } else {
                const games = this.props.games;
                let cards = [];

                for(let i=0; i<games.length; i++) {
                    cards.push({
                        id: games[i].id,
                        title: games[i].title,
                        desc: games[i].about,
                        ratedBy: games[i].rating_count,
                        playedBy: games[i].user_count,
                        ratings: games[i].rating_avg,
                        url: games[i].img
                    });
                }

                this.setState({
                    cards
                });
            }
        }).catch(e => {
            
        })
    }

    onClick = (item) => {
        this.setState({
            clickedLink: item
        })
    }

    render() {
        if(this.state.clickedLink !== null) {
            console.log(this.state.clickedLink)
           return (
                <Redirect to={{
                    pathname: '/game-reviews',
                    state: { game: this.state.clickedLink }
                    }}
                />
           );
        }

        return (
            <div>
                <ResponsiveDrawer page="Games" pageName="GameSessions">
                </ResponsiveDrawer>
                <Container style={this.props.styles}>
                    <Grid container spacing={3}>
                        {this.state.cards.map((item, index) => {
                            return (
                              <Card
                                url={item.url}
                                title={item.title}
                                desc={item.desc}
                                ratedBy={item.ratedBy}
                                playedBy={item.playedBy}
                                ratings={item.ratings}
                                key={index}
                                onClick={() => this.onClick(item)}
                              />
                            );
                        })}
                    </Grid>
                </Container>
            </div>
        );
    }
}

GameSessions.propTypes = {
   loadGames: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    serverError: state.user.serverError,
    isAuthenticated: state.user.isAuthenticated,
    games: state.game.games,
});

export default connect(mapStateToProps, { loadGames })(GameSessions);