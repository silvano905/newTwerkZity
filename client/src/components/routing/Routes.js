import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alerts from "../layout/Alert";
import Account from "../account/Account";
import PremiumContent from "../Bikini/PremiumContent";
import SinglePost from "../Bikini/SinglePost";
import Home from "../Bikini/Home";
import AddPost from "../todo/AddPost";
import Favorites from "../Bikini/Favorites";
import Premium from "../Bikini/Premium";
import PasswordReset from "../auth/PasswordReset";
import CreateNewPassword from "../auth/CreateNewPassword";
import Pay from "../payment/Pay";

import PrivateRoute from '../routing/PrivateRoute';

import About from "../Bikini/bottomInfo/About";
import Terms from "../Bikini/bottomInfo/Terms";
import Privacy from "../Bikini/bottomInfo/Privacy";



const Routes = () => {
    return (
        <section>
            <Alerts />
            <Switch>
                <Route exact path='/about' component={About}/>
                <Route exact path='/terms' component={Terms}/>
                <Route exact path='/privacy' component={Privacy}/>
                <PrivateRoute exact path="/account" component={Account} />
                <PrivateRoute exact path="/my-likes" component={Favorites} />
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/pay" component={Pay} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/premium" component={Premium} />
                <PrivateRoute exact path="/add" component={AddPost} />
                <PrivateRoute exact path="/member" component={PremiumContent} />
                <PrivateRoute exact path="/:id" component={SinglePost} />
                <Route exact path="/free/:id" component={SinglePost} />
                <Route exact path='/reset/request' component={PasswordReset}/>
                <Route exact path='/reset/patch/:id' component={CreateNewPassword}/>
            </Switch>
        </section>
    );
};

export default Routes;