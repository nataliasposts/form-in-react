import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Form from "../Components/Form";



const RootRouter = (props) =>{

    return(
        <React.Fragment>
            <Switch>
                <Route path={"/Contractor"}>
                    <Form/>
                </Route>                
            </Switch>
        </React.Fragment>
    )
}

export default RootRouter;