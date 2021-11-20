import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import TestFirebase from './Pages/TestFirebase';

interface AppRoutingProps {

}

const AppRouting = (props: AppRoutingProps) => <BrowserRouter>
    <Switch>
        <Route exact path={["/"]} component={TestFirebase} />
        <Redirect to="/" />
    </Switch>
</BrowserRouter>

export default AppRouting;