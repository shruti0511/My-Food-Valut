import { Provider, useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import useAuth from 'hooks/useAuth';




// ==============================|| APP ||============================== //

const App = () => {
  
  const { token } = useAuth();

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }));

    return forward(operation);
  });

  const httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql', // Your GraphQL server URL
    credentials: 'include',
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });


  const customization = useSelector((state) => state.customization);

  return (
    <ApolloProvider client={client}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
    </ApolloProvider>
  );
};

export default App;
