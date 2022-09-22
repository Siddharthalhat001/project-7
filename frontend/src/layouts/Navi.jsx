import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container,Button, Menu, Icon } from 'semantic-ui-react';
import "../App.css";
import SingedIn from "./SingedIn";
import SingedOut from "./SingedOut";

export default function Navi() {

  const {authItem} = useSelector(state => state.auth)

  return (
    <div>
      <Menu size="large" inverted stackable>
        <Container>
          <Menu.Item name="Home page" as={Link} to={"/"}>
          <Icon name="home" />Home page
          </Menu.Item>
          <Menu.Item name="Job Announcements" as={Link} to={"/jobs"} />
          <Menu.Item name="Job Seekers" as={Link} to={"/employees"} />
          <Menu.Item name="Answers" as={Link} to={"/cvs"} />
          <Menu.Item name="Companies" as={Link} to={"/employers"} />


          <Menu.Menu position="right" style={{ margin: '0.5em' }}>
            {authItem[0].loggedIn && authItem[0].user.userType===2 &&  <Button primary as={Link} to={"/jobCreate"}>
              Create Job
            </Button>}
            {authItem[0].loggedIn && authItem[0].user.userType===1 &&  <Button color="red" as={Link} to={`/FavoriJobs`}>
              <Icon name='heart' />
              Favorite Ads
            </Button>}
            
            {authItem[0].loggedIn?<SingedIn/>:<SingedOut/>}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
