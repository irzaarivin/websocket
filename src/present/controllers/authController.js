module.exports = async ({ register, login }) => {
  const registerUser = async (req, res, next) => {
    try {
      const result = await register(req.body)
      res.json(result)
    } catch (err) {
      next(err)
    }
  }

  const loginUser = async (req, res, next) => {
    try {
      const result = await login(req.body)
      res.json(result)
    } catch (err) {
      next(err)
    }
  }

  return { registerUser, loginUser }
}
