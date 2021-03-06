import React, {useContext} from "react";
import app from "../datastore/Firebase";
import {withRouter, Redirect} from "react-router-dom";
import {AuthContext} from "../datastore/Auth";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const Register = ()=>{

  const handleRegister = async event=>{
    event.preventDefault();
    const {email, password} = event.target.elements;
    try{
      await app.auth().createUserWithEmailAndPassword(email.value, password.value);
    }catch (e) {
      alert(e);
    }
  };

  const {currentUser} = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/secret" />
  }

  const iconStyle = {
    root:{
      fontSize: "10rem",
      color: "red",
      margin: "1rem auto 0 auto"
    }
  };

  const titleStyle = {
    root:{
      fontSize: "5rem",
      color: "red",
      margin: "1rem auto 0 auto"
    }
  };

  const boxRegisterFormStyle = {
    root:{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "80%",
      marginTop: "1rem",
    }
  };
  const loginItemStyle = {
    root:{
      marginBottom: "1rem",
    }
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">

      <AccountCircleOutlinedIcon style={iconStyle.root}/>
      <Typography style={titleStyle.root}>Just Register</Typography>

      <Box component="form" style={boxRegisterFormStyle.root}
           onSubmit={handleRegister}>
        <TextField variant="outlined" label="Email" style={loginItemStyle.root}
                   name="email" required/>
        <TextField variant="outlined" label="Password" style={loginItemStyle.root}
                   name="password" required/>

        <Button type="submit" variant="contained" color="secondary">Sign in</Button>
      </Box>
    </Grid>
  );
};

export default withRouter(Register);