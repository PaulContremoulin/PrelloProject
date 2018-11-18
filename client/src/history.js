import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

// Get the current location.
const location = history.location;

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
  // location is an object like window.location
});

// To stop listening, call the function returned from listen().
// unlisten();
