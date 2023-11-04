import { Helmet } from 'react-helmet-async';

import { RidersView } from 'src/sections/riders/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Rider | Minimal UI </title>
      </Helmet>

      <RidersView />
    </>
  );
}
