import { StatisticData, Description } from '../../components/RegisterPage'

export const filterOrderIndID = (
  namesLength: number,
  indData: StatisticData[],
  indDescription: Description[],
  level: string,
  tableType: "singleRegister" | "allRegistries"): string[] => {

  const indId: string[] = Array.from(
    new Set(indData
      .filter((d: StatisticData) => {
        const nation = namesLength === 1 || tableType === "singleRegister"
          ? false : d.unit_name === "Nasjonalt"
        if (level === "") {
          return !nation
        }
        const levelFilter = d.level !== level
        const dg = (d.dg ?? 1) < 0.6
        const minDenom = indDescription
          .filter(dDesc => dDesc.id === d.ind_id)
          .map(d => d.min_denominator)[0]
        const lowN = d.denominator < (minDenom ?? 5)
        return !(nation || levelFilter || dg || lowN)
      })
      .map((d: StatisticData) => d.ind_id))
  )

  const orderedIndID = indDescription.sort((a, b) => {
    return (a.name ?? "") > (b.name ?? "") ? 1 : (a.name ?? "") < (b.name ?? "") ? -1 : 0
  }).map(d => d.id).filter(d => indId.includes(d))

  return orderedIndID
}