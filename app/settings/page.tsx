import React from "react";
import ProfileSettingsPage from "../../components/ProfileSettings";
import getCurrentUser from "../actions/getCurrentUser";

const SettingsPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <>
      
      {currentUser ? (
        <ProfileSettingsPage currentUser={currentUser!} />
      ) : (
        <>Error Fetching Data</>
      )}
    </>
  );
};

export default SettingsPage;
