import { styleOf } from "@styles/styles"

export const NoStateOf = ({ children }) => {
  return (
    <div className={styleOf.nostate}>
      <div className={styleOf.title}>No {children}</div>
    </div>
  )
}
export default NoStateOf 