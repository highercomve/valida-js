import * as Validators from '../src/validators'

describe('Validators spec', () => {
  it('required', () => {
    let result = Validators.required('firstName', 'firstname-required', 'key')({})
    expect(result.valid).toBe(false)
    expect(result.error.type).toBe('firstname-required')
    result = Validators.required('firstName', 'firstname-required', 'key')({ firstName: 'algo' })
    expect(result.valid).toBe(true)
    expect(result.error).toBe(undefined)
  })

  it('minLength', () => {
    let result = Validators.minLength('firstName', 'firstname-minlength', 'key', 10)({ firstName: 'algo' })
    expect(result.valid).toBe(false)
    expect(result.error.type).toBe('firstname-minlength')
    result = Validators.minLength('firstName', 'firstname-minlength', 'key', 10)({ firstName: 'algoalgoalgo' })
    expect(result.valid).toBe(true)
    expect(result.error).toBe(undefined)
  })

  it('maxLength', () => {
    let result = Validators.maxLength('firstName', 'firstname-maxLength', 'key', 10)({ firstName: 'algoalgoalgo' })
    expect(result.valid).toBe(false)
    expect(result.error.type).toBe('firstname-maxLength')
    result = Validators.maxLength('firstName', 'firstname-maxLength', 'key', 10)({ firstName: 'algo' })
    expect(result.valid).toBe(true)
    expect(result.error).toBe(undefined)
  })

  it('regex', () => {
    const email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
    let result = Validators.regex('email', 'email-regex', 'key', /\d/)({ email: 'algoalgoalgo' })
    expect(result.valid).toBe(false)
    expect(result.error.type).toBe('email-regex')

    result = Validators.regex('email', 'email-regex', 'key', /\d/)({ email: '1234567890' })
    expect(result.valid).toBe(true)
    expect(result.error).toBe(undefined)

    result = Validators.regex('email', 'email-valid', 'key', email)({ email: 'algo' })
    expect(result.valid).toBe(false)
    expect(result.error.type).toBe('email-valid')

    result = Validators.regex('email', 'email-valid', 'key', email)({ email: 'algo@algo.com' })
    expect(result.valid).toBe(true)
    expect(result.error).toBe(undefined)
  })

  it('compareFields', () => {
    let result = Validators.compareFields('email', 'email-confirm', 'key', 'confirmEmail')({ email: 'algoalgoalgo', confirmEmail: '' })
    expect(result.valid).toBe(false)
    expect(result.error.type).toBe('email-confirm')

    result = Validators.compareFields('email', 'email-confirm', 'key', 'confirmEmail')({ email: 'algoalgoalgo', confirmEmail: 'algoalgoalgo' })
    expect(result.valid).toBe(true)
    expect(result.error).toBe(undefined)
  })

  it('isEmail', () => {
    let result = Validators.isEmail('email', 'email-valid', 'key')({ email: 'algo' })
    expect(result.valid).toBe(false)
    expect(result.error.type).toBe('email-valid')

    result = Validators.isEmail('email', 'email-valid', 'key')({ email: 'algo@algo.com' })
    expect(result.valid).toBe(true)
    expect(result.error).toBe(undefined)

    result = Validators.isEmail('email', 'email-valid', 'key')({ email: 'algo@algo.com.ar' })
    expect(result.valid).toBe(true)
    expect(result.error).toBe(undefined)
  })
})
