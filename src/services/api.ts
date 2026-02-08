import { api } from "./client";

//auth services
export const login = async (credentials: any) =>
  api.post("/Authentication/authenticate", credentials);




export const getFinancialInformation = async (hospitalRegNo) =>
  api.get(`/FinancialInformation/getfinancedetail/${hospitalRegNo}`);

export const updateFinancialInformation = async (data) =>
  api.post("/FinancialInformation/crdfinancialinformation", data);

export const getBedCompositionList = async () =>
  api.get("/Common/CommonList/bedComposition/1");

export const getBedComposition = async (hospitalRegNo) =>
  api.get(`BedComposition/getbedcompdetail/${hospitalRegNo}`);

export const updateBedComposition = async (data) =>
  api.post("/BedComposition/crdbedcomposition", data);

//Common service
export const getState = async () => api.get("/Common/state");
export const getCityByState = async (stateId) =>
  api.get(`/Common/citybystate/${stateId}/2`);

export const getNatureEntity = async () =>
  api.get("/Common/commonlist/natureEntity/1");
export const getProviderType = async () =>
  api.get("/Common/commonlist/providertype/1");
export const getHospitalInfoById = async (hospitalId) =>
  api.get(`/Hospital/gethospitalinfomi/${hospitalId}`);

export const saveHospitalUpdate = async (data) =>
  api.post("Hospital/saveupdatehospitalmi", data);
export const getCashlessBenefitsDetail = async (hospitalRegNo) =>
  api.get(`CashlessBenefits/getcashlessdetail/${hospitalRegNo}`);

// Hospital Infrastructure
export const getHospitalInfrastructureList = async () =>
  api.get("/Common/CommonList/medicalInfrastructure/1");
export const getHospitalInfrastructureAvailabilityOptions = async () =>
  api.get("/Common/CommonList/infrastructureFacilities/1");
export const getHospitalInfrastructureById = async (id) =>
  api.get(`/Infrastructure/getinfradetail/${id}`);
export const updateHospitalInfrastructure = async (data) =>
  api.post("/Infrastructure/crdinfrastructure", data);

export const getOPDService = async () =>
  api.get("/Common/CommonList/opdServices/1");
export const getIPDService = async () =>
  api.get("/Common/CommonList/ipdServices/1");
export const getWaiverService = async () =>
  api.get("/Common/CommonList/waiverOffered/1");
export const submitCashlessService = async (payload) =>
  api.post("CashlessBenefits/crdcashless", payload);

export const getSpecializationType = async () =>
  api.get("/Common/CommonList/specializationType/1");
export const getlevelOfCare = async () =>
  api.get("/Common/CommonList/levelOfCare/1");
export const getSpecializationFacilityList = async () =>
  api.get("/Common/CommonList/hospitalSpecialization/1");
export const getHospicalSpecDetail = async (hospitalRegNo) =>
  api.get(
    `HospitalSpecialization/gethospitalspecdetail/${hospitalRegNo}`
  );
export const saveHospitalSpeciality = async (payload) =>
  api.post("/HospitalSpecialization/crdhospitalspec", payload);

//empanelled
export const getHospitalEmpanelledList = async (type) =>
  api.get(`/Common/CommonList/${type}/1`);

export const getHospitalEmpanelledDetail = async (hospitalRegNo, empaneledTypeId) =>
  api.get(`/Empaneled/getempaneleddetail/${hospitalRegNo}/${empaneledTypeId}`);

export const getHospitalEmpanelledDetailById = async (hospitalRegNo, empaneledTypeId, id) =>
  api.get(`/Empaneled/getproviderempaneleddetail/${hospitalRegNo}/${empaneledTypeId}/${id}`);

export const editProviderEmpanelledDetails = async (payload) => 
  api.post("/Empaneled/crdproviderempaneled", payload);