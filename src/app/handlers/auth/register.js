const Joi = require('joi')
const bcrypt = require('bcrypt')

const validate = async (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      'string.empty': 'Nama tidak boleh kosong!',
      'string.min': 'Nama minimal harus 3 karakter!',
      'any.required': 'Nama diperlukan!'
    }),

    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      'string.empty': 'Email tidak boleh kosong!',
      'string.email': 'Format email tidak valid!',
      'any.required': 'Email diperlukan!'
    }),

    password: Joi.string().min(6).required().messages({
      'string.empty': 'Password tidak boleh kosong!',
      'string.min': 'Password minimal harus 6 karakter!',
      'any.required': 'Password diperlukan!'
    }),

    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Konfirmasi password tidak cocok!',
      'string.empty': 'Konfirmasi password tidak boleh kosong!',
      'any.required': 'Konfirmasi password diperlukan!'
    }),

    isActive: Joi.boolean().default(true).messages({
      'boolean.base': 'Status aktif harus berupa true atau false'
    }),
  })

  const { error } = schema.validate(data);
  return error;
}

module.exports = async (repositories, helpers, emitSocketEvent, data) => {
  const { createUser } = repositories.userRepositories

  const validation = await validate(data);
  if(validation) return { status: "Failed", error: validation }

  data.password = await bcrypt.hash(data.password, 10)
  const user = await createUser(data)

  return {
    status: 'success',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      createdAt: user.createdAt,
    }
  }
}
