import React from "react";
import EntityListScreen from "../components/EntityListScreen";

const ongConfig = {
    title: 'ONGs',
    filterType: 'ONG',
    apiEndpoint: 'https://pethopeapi.onrender.com/api/users',
    navigateTo: 'InfoOng',
    paramName: 'ong',
};

const OngsScreen = () => {
  return <EntityListScreen screenConfig={ongConfig} />;
};

export default OngsScreen;