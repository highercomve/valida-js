[![Codeship Status for highercomve/valida-js](https://app.codeship.com/projects/f3b1bef0-69f5-0137-cfd5-3699c784bbf0/status?branch=master)](https://app.codeship.com/projects/346266)

Valida JS
==========================================

Validate javascript object

## How to use it

```js
import ValidaJs from 'valida-js'

const rules = ValidaJs.rulesCreator(ValidaJs.validators, [
  {
    name: 'firstName',
    type: 'required',
    stateMap: 'firstName'
  },
  {
    name: 'email',
    type: 'required',
    stateMap: 'email'
  },
  {
    name: 'email',
    type: 'isEmail',
    stateMap: 'email'
  },
  {
    name: 'email',
    type: 'minLength',
    stateMap: 'email',
    compareWith: 10
  }
])
const state = {
  firstName: '',
  email: ''
}
const validation = ValidaJs.validate(rules, state)
expect(validation.valid).toBe(false)
expect(validation.errors.firstName).toEqual(['required'])
expect(validation.errors.email).toEqual(['required', 'isEmail', 'minLength'])
```

The library has available this validators

- minLength
- maxLength
- required
- compareFields
- isEmail
- regex

But you can extend with your own validators, using the next signature

```js
import ValidaJS from 'valida-js'

ValidaJS.validators['newRuleName'] = (stateMap, type, name, compareWithValue, defaultValue = '') => {
  return (state) => {
    const isValid = !!state[stateMap] // Any type of validation here
    /**
     * factoryValidationObj
     * @param {boolean} isValid
     * @param {string} type
     * @param {string} name
     * @return {Object}
     * */
    return ValidaJS.factoryValidationObj(isValid, type, name)
  }
}

/*
after that in the createRules you will have that available as:

ValidaJs.rulesCreator(validators, [
  {
    name: 'firstName',
    type: 'newRuleName',
    stateMap: 'firstName'
  }
])
*/

export default validators
```


## How do develop a feature development

### How to run the project

```bash
# Install all the dependencies of the project with npm or yarn
yarn # or npm install

# Run the development server with
yarn dev # or npm run dev
```

### How to run test

```bash
yarn test # or yarn test --watch
```

### How to build the project

```bash
yarn build # npm run build
```
