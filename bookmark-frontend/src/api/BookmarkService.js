// src/api/BookmarkService.js
import { ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

class BookmarkService {
  static instance = null;
  client = null;

  constructor() {
    if (BookmarkService.instance) {
      return BookmarkService.instance;
    }
    
    const httpLink = createHttpLink({
      uri: 'http://localhost:3000/graphql',
      credentials: 'same-origin'
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
    });
    
    this.client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all',
        },
      },
    });
    
    BookmarkService.instance = this;
  }

  getBookmarks() {
    return this.client.query({
      query: gql`
        query GetBookmarks {
          bookmarks {
            id
            title
            url
            createdAt
          }
        }
      `
    }).catch(error => {
      console.error('GraphQL Error:', error);
      console.error('Network Error:', error.networkError);
      console.error('GraphQL Errors:', error.graphQLErrors);
      throw error;
    });
  }

  createBookmark(title, url) {
    return this.client.mutate({
      mutation: gql`
        mutation CreateBookmark($input: CreateBookmarkInput!) {
          createBookmark(input: $input) {
            bookmark {
              id
              title
              url
              createdAt
            }
            errors
          }
        }
      `,
      variables: { 
        input: {
          title,
          url
        }
      }
    }).catch(error => {
      console.error('Create Bookmark Error:', error);
      console.error('Network Error:', error.networkError);
      console.error('GraphQL Errors:', error.graphQLErrors);
      throw error;
    });
  }

  deleteBookmark(id) {
    return this.client.mutate({
      mutation: gql`
        mutation DeleteBookmark($input: DeleteBookmarkInput!) {
          deleteBookmark(input: $input) {
            bookmark {
              id
              title
              url
            }
            errors
          }
        }
      `,
      variables: { 
        input: {
          id
        }
      }
    }).catch(error => {
      console.error('Delete Bookmark Error:', error);
      console.error('Network Error:', error.networkError);
      console.error('GraphQL Errors:', error.graphQLErrors);
      throw error;
    });
  }

  updateBookmark(id, title, url) {
    return this.client.mutate({
      mutation: gql`
        mutation UpdateBookmark($input: UpdateBookmarkInput!) {
          updateBookmark(input: $input) {
            bookmark {
              id
              title
              url
              createdAt
            }
            errors
          }
        }
      `,
      variables: { 
        input: {
          id,
          title,
          url
        }
      }
    }).catch(error => {
      console.error('Update Bookmark Error:', error);
      console.error('Network Error:', error.networkError);
      console.error('GraphQL Errors:', error.graphQLErrors);
      throw error;
    });
  }
}

const bookmarkService = new BookmarkService();
export default bookmarkService;
