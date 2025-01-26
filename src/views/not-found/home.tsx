import { Helmet } from 'react-helmet-async';

export function NotFoundView() {
  return (
    <>
      <Helmet>
        <title>Save Slot • Page Not Found</title>
      </Helmet>
      <div>Not found works!</div>
    </>
  );
}
