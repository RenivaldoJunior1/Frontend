import React from "react";
import EntityListScreen from "../components/EntityListScreen";

const clinicaConfig = {
    title: 'Clínicas',
    filterType: 'CLINICA', 
    apiEndpoint: 'https://pethopeapi.onrender.com/api/users',
    navigateTo: 'InfoClinica',
    paramName: 'clinica',
};

const ClinicaScreen = () => {
  return <EntityListScreen screenConfig={clinicaConfig} />;
};

export default ClinicaScreen;