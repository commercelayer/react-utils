import React from "react"
import { createGlobalStyle } from "styled-components"

import { HSL, hexToHSL, BLACK_COLOR } from "./hex2hsl"

interface GlobalStyleProps {
  primaryColor: string
  children?: React.ReactNode
}

const RootStyles = createGlobalStyle<{
  hsl: HSL
}>`
  :root {
    --primary-h: ${({ hsl }) => hsl.h};
    --primary-s: ${({ hsl }) => hsl.s};
    --primary-l: ${({ hsl }) => hsl.l};
    --primary: hsl(var(--primary-h), var(--primary-s), var(--primary-l));
    --primary-light: hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1);
    --primary-dark: hsl(var(--primary-h), var(--primary-s), calc(var(--primary-l) * 0.5));
    --contrast-threshold: 75%;
    --switch: calc((var(--primary-l) - var(--contrast-threshold)) * -10000);
    --contrast: hsl(0, 0%, var(--switch));
  }
`

const GlobalStylesProvider: React.FC<GlobalStyleProps> = ({
  primaryColor,
  children,
}) => (
  <>
    <RootStyles hsl={hexToHSL(primaryColor) || BLACK_COLOR} />
    {children}
  </>
)

export default GlobalStylesProvider
