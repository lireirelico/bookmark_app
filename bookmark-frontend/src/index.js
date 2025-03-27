// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import BookmarkService from './api/BookmarkService';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={BookmarkService.client}>
    <App />
  </ApolloProvider>
);
