import { Helmet } from 'react-helmet-async';

import { RidesView } from 'src/sections/rides/view';

// ----------------------------------------------------------------------

export default function RidesPage() {
  return (
    <>
      <Helmet>
        <title> Rider | Minimal UI </title>
      </Helmet>

      <RidesView />
    </>
  );
}
