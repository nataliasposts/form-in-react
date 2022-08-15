import React from "react";
import RootRouter from "./Routing/RootRouter";
import { BrowserRouter } from 'react-router-dom';
import Form from "./Components/Form";



const App = () => {
    return(
        <React.Fragment>
            <BrowserRouter>
               <Form>
                  <RootRouter/>
               </Form>
            </BrowserRouter>
        </React.Fragment>
    )
}

export default App;