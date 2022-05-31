import { FC, useEffect } from "react"

import { hexToHSL, HSL } from "./hex2hsl"

type PropertySet = [string, string | number]

type Props = {
  primaryColor: string // hex
}

const InjectCssCustomProperties: FC<Props> = ({ primaryColor }) => {
  useEffect(() => {
    const hsl = hexToHSL(primaryColor)
    if (hsl) {
      const allValues = makeAllPropertiesList(hsl)
      // allValues.forEach(setCssProp)
      setInRoot(allValues)
    }
  }, [primaryColor])

  return null
}

const makeAllPropertiesList = (hsl: HSL): PropertySet[] => [
  ["--primary-h", hsl.h],
  ["--primary-s", hsl.s],
  ["--primary-l", hsl.l],
  ["--primary", "hsl(var(--primary-h), var(--primary-s), var(--primary-l))"],
  [
    "--primary-light",
    "hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1)",
  ],
  [
    "--primary-dark",
    "hsl(var(--primary-h), var(--primary-s), calc(var(--primary-l) * 0.5))",
  ],
  ["--contrast-threshold", "75%"],
  ["--switch", "calc((var(--primary-l) - var(--contrast-threshold)) * -10000)"],
  ["--contrast", "hsl(0, 0%, var(--switch))"],
]

// const setCssProp = ([name, value]: PropertySet) => {
//   if (!document || !document.documentElement) {
//     return
//   }
//   document.documentElement.style.setProperty(name, value ? `${value}` : null)
// }

const setInRoot = (values: PropertySet[]) => {
  if (!document || !document.styleSheets) {
    return
  }

  // find a styleSheetIndex we can manipulate
  const styleSheetIndex = Object.keys(document.styleSheets).find(
    (k) => !document.styleSheets[parseInt(k, 10)].href
  )

  if (!styleSheetIndex) {
    return
  }

  const styleSheet = document.styleSheets[parseInt(styleSheetIndex, 10)]
  const cssRulesAsString = values
    .map(([name, value]) => `${name}: ${value};`)
    .join("\r\n")

  // inject style
  styleSheet.insertRule(`:root { ${cssRulesAsString} }`, 0)
}

export default InjectCssCustomProperties
