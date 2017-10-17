import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Home from './container/Home';
import Login from './container/Login';
import SignUp from './container/SignUp';
import Movies from './container/Movies';
import Actors from './container/Actors';
import Genres from './container/Genres';
import SelectMovie from './container/SelectMovie';
import SelectActor from './container/SelectActor';
import SelectGenre from './container/SelectGenre';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
	<Router>
		<div>
		  <Route exact={true} path="/" component={ Home } />
      <Route exact={true} path='/movies' component={ Movies } />
      <Route exact={true} path='/movies/:id' component={ SelectMovie } />
      <Route exact={true} path='/actors' component={ Actors } />
      <Route exact={true} path='/actors/:id' component={ SelectActor} />
      <Route exact={true} path='/genres' component={ Genres } />
      <Route exact={true} path='/genres/:id' component={ SelectGenre } />
      <Route path='/login' component={ Login } />
      <Route path='/register' component={ SignUp } />
		/>
		</div>
	</Router>	
	), document.getElementById('root'));
registerServiceWorker();
