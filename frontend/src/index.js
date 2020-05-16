import React from 'react';
/*
The most common use-case for using the low-level <Router> is to synchronize
a custom history with a state management lib like Redux or Mobx.
Note that this is not required to use state management libs alongside React Router,
it’s only for deep integration.
*/
import { Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MomentUtils from '@date-io/moment';


// Semantic UI https://react.semantic-ui.com/usage
import 'semantic-ui-css/semantic.min.css'

import PrivateRoute from './components/common/PrivateRoute';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import { loadUser } from './actions/auth';
import App from './components/App';
import TodoDelete from './components/todos/TodoDelete';
import TodoEdit from './components/todos/TodoEdit';
import EventDelete from './components/book/EventDelete';
import EventEdit from './components/book/EventEdit';
import NewAppointment from './components/book/NewAppointment';
import AppBarInteraction from './components/layout/AppBarInteraction';

import store from './store';
import history from './history';

import * as serviceWorker from './serviceWorker';

import moment from "moment";
import "moment/locale/es";

moment.locale("es");

class MainApp extends React.Component {

    componentDidMount() {
    	store.dispatch(loadUser());
  	}

    render() {

        return (
            <React.StrictMode>
				<Router history={history}>
					<AppBarInteraction>
			    		<Switch>
				            <PrivateRoute exact path='/' component={App} />
				            <Route exact path='/new' component={NewAppointment} />
				            <PrivateRoute exact path='/todo/delete/:id' component={TodoDelete} />
				            <PrivateRoute exact path='/todo/edit/:id' component={TodoEdit} />
				            <PrivateRoute exact path='/event/delete/:id' component={EventDelete} />
				            <PrivateRoute exact path='/event/edit/:id' component={EventEdit} />
				            <Route exact path='/login' component={LoginForm} />
				            <Route exact path='/register' component={RegisterForm} />
				         </Switch>
				    </AppBarInteraction>
		    	</Router>
	  		</React.StrictMode>
        );
    }
};


ReactDOM.render(
	(<Provider store={store}>
		<MuiPickersUtilsProvider utils={MomentUtils}>
			 <MuiThemeProvider>
				<MainApp />
			 </MuiThemeProvider>
		</MuiPickersUtilsProvider>
	</Provider>),
	document.getElementById('root') || document.createElement('div')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default MainApp;
