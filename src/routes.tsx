import React from 'react';

import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './layout';
import Sudoku from './sudoku';
import Anagram from './anagram';

const Default = () => <p>Click on the menu to get started</p>;

export default () =>{
    return <Router>
       <Layout>
        <Switch>
          <Route exact path="/sudoku" component={() => <Sudoku/>}/>
          <Route exact path="/anagram" component={() => <Anagram/>}/>
          <Route component={() => <Default/>}/>
        </Switch>
        </Layout>
      </Router>;
}