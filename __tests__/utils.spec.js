import * as Utils from '../src/utils'
import * as validators from '../src/validators'

describe('Utils spec', () => {
  describe('factoryValidationObj', () => {
    it('Needs 3 parameters  to work', () => {
      expect(() => { Utils.factoryValidationObj() }).toThrowError('type and key are required')
      expect(() => { Utils.factoryValidationObj(null, null, null) }).toThrowError('type and key are required')
      expect(() => { Utils.factoryValidationObj(false, 'required-something') }).toThrowError('type and key are required')
      expect(() => { Utils.factoryValidationObj(false, 'required-something', 'key') })
        .not.toThrowError('type and key are required')
    })

    it('Return the current validation obj', () => {
      const obj = Utils.factoryValidationObj(false, 'name-required', 'name')
      expect(obj.valid).toBe(false)
      expect(obj.error.key).toBe('name')
      expect(obj.error.type).toBe('name-required')
    })
  })

  describe('Rules Creator', () => {
    const rules = Utils.rulesCreator(validators, [
      {
        name: 'firstName',
        type: 'required',
        stateMap: 'firstName'
      },
      {
        name: 'lastName',
        type: 'required',
        stateMap: 'lastName'
      },
      {
        name: 'firstName',
        type: 'customLength',
        validate: (state) => Object.keys(state).length > 1,
        message: (value, type, key) => `${key} should be greater than 1`
      }
    ])
    expect(rules.FirstNameRequired).toBeDefined()
    expect(rules.LastNameRequired).toBeDefined()
    expect(rules.FirstNameCustomLength).toBeDefined()

    expect(rules.FirstNameRequired({ firstName: '' }))
      .toEqual({ valid: false, error: { type: 'required', key: 'firstName', message: 'firstName is required' } })
    expect(rules.LastNameRequired({ lastName: '' }))
      .toEqual({ valid: false, error: { type: 'required', key: 'lastName', message: 'lastName is required' } })
    expect(rules.FirstNameCustomLength({}))
      .toEqual({ valid: false, error: { type: 'customLength', key: 'firstName', message: 'firstName should be greater than 1' } })
    expect(rules.FirstNameRequired({ firstName: 'algo' }))
      .toEqual({ valid: true, error: undefined })
    expect(rules.LastNameRequired({ lastName: 'algo' }))
      .toEqual({ valid: true, error: undefined })
    expect(rules.FirstNameCustomLength({ firstName: 'algo', lastName: 'algo' }))
      .toEqual({ valid: true, error: undefined })
  })

  describe('validation', () => {
    const rules = Utils.rulesCreator(validators, [
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
      }
    ])
    const validation = Utils.validate(rules, { firstName: '', email: '' })
    expect(validation.valid).toBe(false)
    expect(validation.errors.firstName).toEqual([{ type: 'required', message: 'firstName is required' }])
    expect(validation.errors.email).toEqual([
      { type: 'required', message: 'email is required' },
      { type: 'isEmail', message: ' should be an email' }
    ])
  })
})
