import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import RngShow from './Pages/RngShow';
import ShowControl from './Pages/ShowControl';

interface AppRoutingProps {

}

const AppRouting = (props: AppRoutingProps) => <BrowserRouter>
    <Switch>
        <Route exact path={["/", "/show"]} component={ShowControl} />
        <Route exact path="/rng" component={RngShow} />
        <Redirect to="/" />
    </Switch>
</BrowserRouter>

export default AppRouting;