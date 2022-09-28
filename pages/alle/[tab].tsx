import { UseQueryResult } from "react-query";
import MainRegister from "../../src/components/RegisterPage/MainRegister";
import { useRegisterNamesQuery } from "../../src/helpers/hooks";

const MainRegisterPage = () => {
  const registryNameQuery: UseQueryResult<any, unknown> =
    useRegisterNamesQuery();
  if (registryNameQuery.isLoading) {
    return null;
  }
  const registerNames = registryNameQuery.data;
  return <MainRegister registerNames={registerNames || []} />;
};

export default MainRegisterPage;
