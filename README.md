### RSmini_projects

1. Install npm  
   `npm init -y`
2. Install ESLint  
   `npm install --save-dev eslint`
3. Add packages:

- eslint-config-airbnb - Airbnb's .eslintrc as an extensible shared config [Doc](https://www.npmjs.com/package/eslint-config-airbnb)
- prettier [Doc](https://prettier.io/docs/en/)
- eslint-config-prettier [Doc](https://www.npmjs.com/package/eslint-config-prettier)
- eslint-plugin-prettier [Doc](https://www.npmjs.com/package/eslint-plugin-prettier?activeTab=versions)
- eslint-plugin-html [Doc](https://www.npmjs.com/package/eslint-plugin-html)
- eslint-plugin-import [Doc](https://www.npmjs.com/package/eslint-plugin-import)
- eslint-plugin-jsx-a11y [Doc](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)  
  `npm i --save-dev eslint-config-airbnb prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-html eslint-plugin-import eslint-plugin-jsx-a11y`

4. Add file .eslintrc and create dependance to airbnb ({"extends": ["airbnb/base"]})
5. Add file .eslintignore
6. Add commands scripts for start eslint in package.json
