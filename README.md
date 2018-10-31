# saas-spacer

![Example Image](https://media.giphy.com/media/BpamyEAIa6SxxNggKT/giphy.gif)

## How to run

  First install the dependencies:

  ```javascript
    npm install
  ```

  Loading `sass-spacer`:

   1. Open vscode
   2. Click on left menu's debug icon
   3. Start the debug, on the green play icon

  This should open a new vscode instance with `sass-spacer` loaded


### configuration

  ```javascript

  // Spacer variable value
  "sassSpacer.spacer": 8,

  // Enable different colors for when values are correct multiples of spacer variable
  "sassSpacer.enableSensitiveColors": true,

  // A multiple of spacer is considered correct if the quotient of division by spacer is a multiple of this number
  "sassSpacer.allowQuotientsMultipleOf": 1,

  // Decoration color for adequate values
  "sassSpacer.adequateValueColor": "#a3ea9d",

  // Decoration color for inadequate values
  "sassSpacer.largePackageColor": "#d44e40",

  // Neutral Decoration color
  "sassSpacer.largePackageColor": "#7a868e",
```
