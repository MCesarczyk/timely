import { useParams } from "react-router-dom";

export const useRequiredRouteParams = <TRequiredRouteParam extends string>(param: TRequiredRouteParam) => {
  const { [param]: value } = useParams<Record<TRequiredRouteParam, string>>();
  if (!value) {
    throw new Error(`${param} is not defined!`);
  }
  return value;
};
