import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  date: {
    display: 'inline',
    marginLeft: "auto",
    marginRight: 40
  },
  comment: {
    color: "black"
  },
  head: {
    display:"flex",
    flexDirection:"row",
    alignItems: "center",
  },
  ratings: {
    marginRight: 20
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "90%",
  },
  type: {
    backgroundColor: "#e8feff"
  }
}));

export default function Comment(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {props.haveAReview?(
        <ListItem alignItems="flex-start" className={classes.type}>
          <ListItemText
            primary="I already rated this game."
          />
        </ListItem>
      ):!props.isAuthenticated||!props.haveADownload?null:(
        <ListItem alignItems="flex-start" className={classes.type}>
          <ListItemAvatar>
            <Avatar alt="" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <div className={classes.head}>
                <Rating name="rating" value={props.rating} className={classes.ratings} onChange={(event, value) => props.onRating(value)}/>
              </div>
            }
            secondary={
              <div className={classes.head}>
                <TextField
                  id="comments"
                  label="Make a comment"
                  placeholder="Under 1000 characters"
                  multiline
                  className={classes.textField}
                  margin="normal"
                  onChange={(event) => props.onWriting(event.target.value)}
                  value={props.comment}
                />
                <Button variant="contained" className={classes.button} onClick={props.onAdd}>
                  Post
                </Button>
              </div>
            }
          />
        </ListItem>
      )}
      {props.comments.map((item, index) => (
        <Fragment key={index}>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <div className={classes.head}>
                  <Rating value={item.ratings} readOnly className={classes.ratings} />
                  {item.myComment?(
                    <Fragment>
                      <IconButton aria-label="delete" className={classes.margin} onClick={props.onEdit}>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="delete" className={classes.margin} onClick={props.onDelete}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Fragment>
                  ):null}
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                    className={classes.date}
                  >
                    {item.date}
                  </Typography>
                </div>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                    className={classes.date}
                  >
                    <p>{item.writer}</p>
                  </Typography>
                    {item.content}
                </React.Fragment>
              }
            />
          </ListItem>
        </Fragment>
      ))}
      <Divider variant="inset" component="li" />
    </List>
  );
}