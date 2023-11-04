import { Helmet } from 'react-helmet-async';

import { UsersView } from 'src/sections/users/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <UsersView />
    </>
  );
}
