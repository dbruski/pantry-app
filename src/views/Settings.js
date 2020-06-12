import React, { useContext } from 'react';
import { PantryContext } from '../context';
import SettingsTemplate from '../templates/SettingsTemplate';

const Settings = () => {
  const { state } = useContext(PantryContext);
  return <SettingsTemplate state={state}></SettingsTemplate>;
};

export default Settings;
