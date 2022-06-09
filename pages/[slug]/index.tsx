import SelectedRegister from "../../src/components/RegisterPage";
import Header from "../../src/components/Header";
import { useRegisterNamesQuery } from "../../src/helpers/hooks";
import { UseQueryResult } from "react-query";


export const API_HOST =
  process.env.REACT_APP_API_HOST ?? "http://localhost:4000"; //"https://qa-mong-api.skde.org";


const registerPage = () => {

    const registryNameQuery: UseQueryResult<any, unknown> =
    useRegisterNamesQuery();
    if (registryNameQuery.isLoading) {
    return null;
    }
    
    const registerNames = registryNameQuery.data;
    
    return(
        <>
        <Header />
        <SelectedRegister registerNames={registerNames ?? []} />
        </>
    )
}

export default registerPage;
