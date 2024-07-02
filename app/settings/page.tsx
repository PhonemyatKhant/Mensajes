import React from "react";
import ProfileSettingsPage from "./ProfileSettings";
import getCurrentUser from "../actions/getCurrentUser";

const SettingsPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <>
      {currentUser && <ProfileSettingsPage currentUser={currentUser!} />}
    </>
  );
};

export default SettingsPage;
