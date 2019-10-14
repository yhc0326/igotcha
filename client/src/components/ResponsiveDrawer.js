import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SportsEsports from '@material-ui/icons/SportsEsports';
import MenuIcon from '@material-ui/icons/Menu';
import Input from '@material-ui/icons/Input';
import PermIdentity from '@material-ui/icons/PermIdentity';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import Logo from "../assets/igotcha.png";
import Avatar from '@material-ui/core/Avatar';
import { pink } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import Login from "./Login";
import { signOut } from "../redux/actions/user";

import { connect } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor: "black"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menu: {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold"
  },
  profile: {
    marginLeft: "auto",
    marginRight: 0,
    display: "flex",
    flexDirection: "col",
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: "transparent",
  },
  person: {
    marginRight: 20
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [redirect2, setRedirect2] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleRedirect = () => {
    setRedirect(!redirect);
  };

  const handleRedirect2 = () => {
    props.signOut({});
    setRedirect2(!redirect2);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <div className={classes.logoContainer}>
          <img src={Logo} alt="logo" style={{width:"100%"}} />
        </div>
      </div>
      <Divider />
      <List>
        {[
          {
            page: 'Games',
            link: '/'
          },{
            page: 'Weekly Ratings',
            link: '/ratings'
          }
        ].map((text, index) => (
          <Link to={text.link} className={classes.menu} key={index}>
            <ListItem button key={text.page} selected={props.page===text.page}>
              <ListItemIcon>{index % 2 === 0 ? <SportsEsports /> : <ThumbUpAlt />}</ListItemIcon>
              <ListItemText primary={text.page} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  if(redirect) {
    return (
      <Redirect to="/login"></Redirect>
    );
  } else if (redirect2) {
    window.location.reload();
    return (
      <Redirect to="/"></Redirect>
    );
  } else if(props.isAuthenticated&&props.user===undefined) {
    alert("Please Log in");
    return (
      <Redirect to="/login"></Redirect>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {props.page}
          </Typography>
          <div className={classes.profile}>
            <PermIdentity />
            <Typography noWrap className={classes.person}>
              {props.isAuthenticated?props.user.fname+" ("+props.user.type+")":"Guest"}
            </Typography>
            <Fab color="primary" aria-label="add" className={classes.avatar} onClick={props.isAuthenticated?handleRedirect2:handleRedirect}>
              {props.isAuthenticated?"Logout":"Login"}
            </Fab>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user!==null&&state.user.user!==null && state.user.user!==undefined?state.user.user[0]:null,
});

export default connect(mapStateToProps, { signOut } )(ResponsiveDrawer);