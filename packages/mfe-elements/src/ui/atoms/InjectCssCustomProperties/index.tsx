import { useEffect, type FC } from 'react'
import { hexToHSL, type HSL } from './hex2hsl'

type PropertySet = [string, string | number]

interface Props {
  primaryColor: string // hex
}

const InjectCssCustomProperties: FC<Props> = ({ primaryColor }) => {
  useEffect(() => {
    const hsl = hexToHSL(primaryColor)
    if (hsl != null) {
      const allValues = makeAllPropertiesList(hsl)
      setCssProperties(allValues)
      // setInRoot(allValues)
    }
  }, [primaryColor])

  return null
}

const makeAllPropertiesList = (hsl: HSL): PropertySet[] => [
  ['--primary-h', hsl.h],
  ['--primary-s', hsl.s],
  ['--primary-l', hsl.l],
  ['--primary', 'hsl(var(--primary-h), var(--primary-s), var(--primary-l))'],
  [
    '--primary-light',
    'hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1)'
  ],
  [
    '--primary-dark',
    'hsl(var(--primary-h), var(--primary-s), calc(var(--primary-l) * 0.5))'
  ],
  ['--contrast-threshold', '75%'],
  ['--switch', 'calc((var(--primary-l) - var(--contrast-threshold)) * -10000)'],
  ['--contrast', 'hsl(0, 0%, var(--switch))']
]

const setCssProperties = (values: PropertySet[]): void => {
  if (document?.documentElement == null) {
    return
  }
  values.forEach(([name, value]) => {
    document.documentElement.style.setProperty(
      name,
      value != null ? `${value}` : null
    )
  })
}

// const setInRoot = (values: PropertySet[]): void => {
//   if (document?.styleSheets == null) {
//     return
//   }

//   // find a styleSheetIndex we can manipulate
//   const styleSheetIndex = Object.keys(document.styleSheets).find(
//     (key) => document.styleSheets[parseInt(key, 10)].href == null
//   )

//   if (styleSheetIndex == null) {
//     return
//   }

//   const styleSheet = document.styleSheets[parseInt(styleSheetIndex, 10)]
//   const cssRulesAsString = values
//     .map(([name, value]) => `${name}: ${value};`)
//     .join('\r\n')

//   // inject style
//   styleSheet.insertRule(`:root { ${cssRulesAsString} }`, 0)
// }

InjectCssCustomProperties.displayName = 'InjectCssCustomProperties'
export { InjectCssCustomProperties }
