import React, { Fragment } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 60
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {props.login?"Log in":"Sign up"}
        </Typography>
        <form className={classes.form} onSubmit={props.login?props.onLogin:props.onSignup}>
          <Grid container spacing={2}>
            {props.login?null:(
              <Fragment>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="fname"
                    variant="outlined"
                    required
                    fullWidth
                    id="fnme"
                    label="First Name"
                    autoFocus
                    value={props.fname}
                    onChange={props.onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="lname"
                    autoComplete="lname"
                    value={props.lname}
                    onChange={props.onChange}
                  />
                </Grid>
              </Fragment>
            )}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="id"
                label="Email Address"
                name="id"
                autoComplete="email"
                autoFocus={props.login}
                value={props.id}
                onChange={props.onChange}
                inputProps={{
                  minLength: 4
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="pw"
                label="Password"
                type="password"
                id="pw"
                autoComplete="current-password"
                value={props.pw}
                onChange={props.onChange}
                inputProps={{
                  minLength: 4
                }}
              />
            </Grid>
            {props.login?null:(
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="pwre"
                  label="Password Confirm"
                  type="password"
                  id="pwre"
                  value={props.pwre}
                  onChange={props.onChange}
                  inputProps={{
                    minLength: 4
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              {props.login?null:(
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to sign up as an operations team member."
                  name="type"
                  value={props.type}
                  onChange={props.onChange}
                />
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {props.login?"Log In":"Sign Up"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={props.onClick}>
                {props.login?"Do not have an account? Sign up":"Already have an account? Log in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}