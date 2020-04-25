import React from 'react';

import { Router, Switch, Route } from 'react-router-dom';


import Layout from './layout';
import Sudoku from './sudoku';
import Anagram from './anagram';

import * as History from 'history';


const history:any = History.createBrowserHistory({
  basename: process.env.PUBLIC_URL || '',
});

const Default = () => <p>Click on the menu to get started</p>;

export default () =>{
    return <Router history={history}>
       <Layout>
        <Switch>
          <Route exact path="/sudoku" component={() => <Sudoku/>}/>
          <Route exact path="/anagram" component={() => <Anagram/>}/>
          <Route component={() => <Default/>}/>
        </Switch>
        </Layout>
      </Router>;
}