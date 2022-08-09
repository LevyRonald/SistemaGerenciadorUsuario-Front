export const validatorPassword = password => {
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]){8,}/
  const validPassword = regExp.test(password)
  return validPassword
}