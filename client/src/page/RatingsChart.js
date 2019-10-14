import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import Typography from '@material-ui/core/Typography';
import Chart from 'react-apexcharts'

import { connect } from "react-redux";
import { loadRatings } from "../redux/actions/game";
import PropTypes from 'prop-types';

const styles = {
    title: {
        marginBottom: 40
    },
};

class RatingsChart extends Component {
    state = {
        options: {
          chart: {
            id: 'Weekly Ratings'
          },
          xaxis: {
            categories: ["Planet Coaster", "The Long Dark"]
          }
        },
        series: [{
          name: 'Ratings',
          data: [4.5, 4.17]
        }],
        week: ""
    }

    componentDidMount() {
        this.props.loadRatings({
        }).then(() => {
            if(this.props.loadedRatings !== null) {
                const ratings = this.props.loadedRatings;
                const today = new Date();
                let date = new Date();
                date.setDate(new Date().getDate()-6);
                const from = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
                const to = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();

                let options = {
                    chart: {
                        id: "Weekly Ratings"
                    },
                    xaxis: {
                        categories: []
                    }
                };

                let series = [{
                    name: 'Ratings',
                    data: []
                }];

                for(let i=0; i<ratings.length; i++) {
                    options.xaxis.categories.push(ratings[i].title);
                    series[0].data.push(ratings[i].rating_avg);
                }

                this.setState({
                    week: from + " ~ " + to,
                    options,
                    series
                });
            }
        })
    }

    render() {
        return (
            <div>
                <ResponsiveDrawer page="Weekly Ratings" pageName="RatingsChart">
                </ResponsiveDrawer>
                <Container style={this.props.styles}>
                    <Typography variant="h5" style={styles.title}>
                        Latest ratings ({this.state.week})
                    </Typography>
                    <Chart options={this.state.options} series={this.state.series} type="bar" width="80%"/>
                </Container>
            </div>
        );
    }
}

RatingsChart.propTypes = {
   loadRatings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    serverError: state.user.serverError,
    isAuthenticated: state.user.isAuthenticated,
    games: state.game.games,
    loadedRatings: state.game.loadedRatings
});

export default connect(mapStateToProps, { loadRatings })(RatingsChart);