import { UseQueryResult } from "react-query";
import SelectedRegister from "../../src/components/RegisterPage/SelectedRegister";
import { useRegisterNamesQuery } from "../../src/helpers/hooks";

const SelectedRegisterPage = () => {
  const registryNameQuery: UseQueryResult<any, unknown> =
    useRegisterNamesQuery();
  if (registryNameQuery.isLoading) {
    return null;
  }
  const registerNames = registryNameQuery.data;
  return <SelectedRegister registerNames={registerNames || []} />;
};

export default SelectedRegisterPage;
