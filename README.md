# Commerce Layer React Utils

This is a simple collection of React utils and external config files to be used in Commerce Layer micro front-ends.

## How to install

```
npm install @commercelayer/react-utils
```

or

```
yarn add @commercelayer/react-utils
```

## How to use

### Tailwind config

Tailwind default configs can be imported directly into your local `tailwind.config.js` file

```js
const config = require("@commercelayer/react-utils/configs/tailwind")

module.exports = {
  ...config,
}
```

In this way it's possibile to extend the configuration my merging or spreading your own setup.

Example:

```js
module.exports = {
  ...config,
  theme: {
    ...config.theme,
    fontFamily: {
      sans: ["Your custom font"],
    },
}
```

### GlobalStylesProvider

This component takes a primary color HEX string as prop, convert it in HSL value and inject (using styled-components) global css custom properties at `:root` devel.

These custom properties includes varation of the primary color (`--primary-light` and `--primary-dark`), along with a special `--contrast` color to be used inside buttons or element with primary background.

Example:

```jsx
import { GlobalStylesProvider } from "@commercelayer/react-utils"

const App = () => {
  return (
    <GlobalStylesProvider primaryColor="#fff000">
      <YourApp />
    </GlobalStylesProvider>
  )
}
```

We also expose a react component that doesn't use `styled-components`, but directly add css in the dom.

Example:

```jsx
import { InjectCssCustomProperties } from "@commercelayer/react-utils"

const App = () => {
  return (
    <>
      <InjectCssCustomProperties primaryColor="#fff000" />
      <YourApp />
    </>
  )
}
```

### Commerce Layer Logo

This is a simple SVG logo exported as React component.

Example:

```jsx
import { LogoCL } from "@commercelayer/react-utils"

export const Footer = () => {
  return (
    <div>
      Powered by <LogoCL width="135" height="22" className="pl-2" />
    </div>
  )
}
```

### Configure semantic-release in your project

It is possibile to use a sharable semantic-release configuration file, just by creating a new `release.config.js` with the following content

```
module.exports = {
  extends: "@commercelayer/react-utils/configs/semantic-release.js",
}
```

There is no need to add semantic-release packages to your repository, since they are already included as depedencies here.
