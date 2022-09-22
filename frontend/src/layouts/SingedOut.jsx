import React from 'react'
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react';

export default function SingedOut() {
    return (
        <div>
            <Button.Group>
              <Button negative as={Link} to={"/login"}>Login</Button>
              <Button.Or />
              <Button positive as={Link} to={"/register"}>Register</Button>
            </Button.Group>
        </div>
    )
}
