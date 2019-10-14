import React, {Component, Fragment} from "react";
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import ImageButton from './ImageButton';
import Slider from './Slider';
import Comment from './Comment';
import Button from '@material-ui/core/Button';
import PlayForWork from '@material-ui/icons/PlayForWork';

const styles = {
    paper: {
        backgroundColor: "white",
        borderRadius: 5,
        margin: 20,
    },
    desc: {
        color: "grey",
        fontSize: 18,
        marginLeft: 32,
        marginRight: 32,
        fontWeight: "bold"
    },
    text: {
        fontSize: 16
    },
    rightText: {
        textAlign: "right"
    },
    button: {
      margin: 10
    },
};

export default class Card extends Component {
    state = {
        value: 1
    }

    onChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    }

    render() {
        return (
            <Grid container spacing={3} style={styles.paper}>
                <Grid item sm={12}>
                    <Typography variant="h5" noWrap>
                    {this.props.title}
                    </Typography>
                    <Rating value={this.props.ratings} readOnly />
                </Grid>
                <Grid item xs={12} sm={3}>
                    {this.props.reviewsPage?(
                        <img src={this.props.url} width="100%" alt={this.props.title} />
                    ):(
                        <ImageButton
                            url={this.props.url}
                            title='Learn More'
                            width="90%"
                            onClick={this.props.onClick}
                        />
                    )}
                </Grid>
                <Grid item xs={12} sm={9}>
                    <table>
                      <tbody>
                        <tr>
                            <td><p style={styles.desc}>About</p></td>
                            <td><p style={styles.text}>{this.props.desc}</p></td>
                        </tr>
                        <tr>
                            <td><p style={styles.desc}>Rated_By</p></td>
                            <td><p style={styles.text}>{this.props.ratedBy} players</p></td>
                        </tr>
                        <tr>
                            <td><p style={styles.desc}>Played_By</p></td>
                            <td><p style={styles.text}>{this.props.playedBy} players</p></td>
                        </tr>
                      </tbody>
                    </table>
                </Grid>
                {this.props.reviewsPage?(
                    <Fragment>
                        <Grid item sm={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                style={styles.button}
                                startIcon={<PlayForWork />}
                                onClick={this.props.onDownload}
                            >
                                {this.props.haveADownload?"Play":"Buy and Download"}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" noWrap>
                                Reviews ({this.props.comments.length})
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" noWrap style={styles.rightText}>
                                Filter By Ratings
                            </Typography>
                                <Slider
                                    onChange={this.props.onChange}
                                    defaultValue={this.props.defaultValue}
                                />
                        </Grid>
                        <Grid item sm={12}>
                            <Comment
                                comments={this.props.comments}
                                onRating={this.props.onRating}
                                onWriting={this.props.onWriting}
                                rating={this.props.rating}
                                comment={this.props.comment}
                                onEdit={this.props.onEdit}
                                onDelete={this.props.onDelete}
                                haveAReview={this.props.haveAReview}
                                haveADownload={this.props.haveADownload}
                                isAuthenticated={this.props.isAuthenticated}
                                onAdd={this.props.onAdd}
                            />
                        </Grid>
                    </Fragment>
                ):null}
            </Grid>
        );
    }
}