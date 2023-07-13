import React from 'react';
import profiles from '../../models/Profile';


export default function Profile() {
  const profile = profiles.findOne(); // Retrieve the profile data from the database

  const machingData = useSelector(state => state?.Job?.matchingData)

  useEffect(() => {
    dispatch(setUserData(localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null));
}, [dispatch])

  return (
    <div>
      <h2>Profile Information</h2>
      {profile && (
        <div>
          <p>Name: {name}</p>
        </div>
      )}
    </div>
  );
}
