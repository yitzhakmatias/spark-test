import './App.sass';
import PostComponent from './components/postList';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import CommentList from './components/commentList';


function App() {
  return (

    <div className="App">

      <Switch>
        <Route exact path="/">
          <PostComponent />
        </Route>
        <Route path="/comments/:id">
          <CommentList />
        </Route>
      </Switch>

    </div>


  );
}

export default App;
