import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import Summary from './components/Summary';

const App = () => {
  return (
    <Router>
      <div className="container">
        {/* <h1 className="text-center my-4 ">Virtual Library</h1> */}
        <Switch>
          <Route path="/add-book" component={BookForm} />
          <Route path="/summary/:bookId" component={Summary} />
          <Route path="/" component={BookList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
