import { useQuery } from 'react-query';
import { API_HOST } from '../../components/RegisterPage';

interface FetchDescriptionParams {
  registerShortName: string,
  type?: "ind" | "dg",
}


const descriptionUrl = (params: FetchDescriptionParams): string => {
  return `${API_HOST}/kvalitetsregistre/${params.registerShortName}/descriptions?type=${params.type ?? ""}`
}

const fetchDescription = async (params: FetchDescriptionParams) => {
  const response = await fetch(descriptionUrl(
    params
  ))
  if (!response.ok) {
    throw new Error('Network response failed')
  }
  return response.json();
}

export const useDescriptionQuery = (params: FetchDescriptionParams) => {
  return useQuery(
    ["descriptions", params.registerShortName],
    () => fetchDescription(params),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60
    }
  )
}

export interface FetchIndicatorParams {
  queryKey: string;
  registerShortName: string;
  treatmentYear?: number;
  unitNames?: string[];
  unitLevel?: string;
}

const indicatorUrl = (params: FetchIndicatorParams): string => {

  const unitQuery: string = params.unitNames
    ? params.unitNames.reduce((acc, cur) => { return `${acc}unit_name[]=${cur}&` }, "")
    : ""
  const unitLevelQuery: string = params.unitLevel
    ? `unit_level=${params.unitLevel}&`
    : ""
  const yearQuery: string = params.treatmentYear
    ? `year=${params.treatmentYear}`
    : ""
  return `${API_HOST}/kvalitetsregistre/${params.registerShortName}/indicators?${unitQuery}${unitLevelQuery}${yearQuery}`
}

const fetchIndicators = async (params: FetchIndicatorParams) => {
  const response = await fetch(indicatorUrl(params))
  if (!response.ok) {
    throw new Error('Network response failed')
  }

  return await response.json();
}


export const useIndicatorQuery = (params: FetchIndicatorParams) => {
  return useQuery(
    [params.queryKey, params.registerShortName],
    () => fetchIndicators(params), {
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 60
  }
  )
}

const unitNamesUrl = (registerShortName: string): string => {
  return `${API_HOST}/kvalitetsregistre/${registerShortName}/unitnames`
}

const fetchUnitNames = async (registerShortName: string) => {
  const response = await fetch(unitNamesUrl(registerShortName))
  if (!response.ok) {
    throw new Error('Network response failed')
  }

  return await response.json();
}

export const useUnitNamesQuery = (registerShortName: string) => {
  return useQuery(
    ["unitNames", registerShortName],
    () => fetchUnitNames(registerShortName), {
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 60
  }
  )
}

const fetchRegisterNames = async () => {
  const response = await fetch(`${API_HOST}/registerinfo/names`)
  if (!response.ok) {
    throw new Error('Network response failed')
  }

  return await response.json();
}


export const useRegisterNamesQuery = () => {
  return useQuery(
    `registerNames`,
    () => fetchRegisterNames(), {
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 60
  }
  )
}


const fetchMedicalFields = async () => {
  const response = await fetch(`${API_HOST}/registerinfo/medicalfields`)
  if (!response.ok) {
    throw new Error('Network response failed')
  }

  return await response.json();
}


export const useMedicalFieldsQuery = () => {
  return useQuery(
    `medicalFields`,
    () => fetchMedicalFields(),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60
    }
  )
}
