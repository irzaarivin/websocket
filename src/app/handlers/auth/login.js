const Joi = require('joi')
const bcrypt = require('bcrypt')
const { generateToken } = require('../../utils/jwt')

const validate = async (data) => {
  const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      'string.empty': 'Email tidak boleh kosong!',
      'string.email': 'Format email tidak valid!',
      'any.required': 'Email diperlukan!'
    }),

    password: Joi.string().min(6).required().messages({
      'string.empty': 'Password tidak boleh kosong!',
      'string.min': 'Password minimal harus 6 karakter!',
      'any.required': 'Password diperlukan!'
    })
  })

  const { error } = schema.validate(data);
  return error;
}

module.exports = async (repositories, helpers, emitSocketEvent, data) => {
  const { getOneUser } = repositories.userRepositories
  const { email, password } = data

  const validation = await validate(data);
  if(validation) return { status: "Failed", error: validation.message }

  const user = await getOneUser({ email })
  if (!user) throw new Error('User not found')

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error('Wrong password')

  const token = generateToken({ id: user.id, email: user.email })
  return { token }
}
