// Reaact imports
import { useRouteError, Link } from 'react-router-dom';

/**
 * Display the Error page
 * @returns Page indicating the occured error
 */
const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
