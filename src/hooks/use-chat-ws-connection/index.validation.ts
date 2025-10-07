import zod from 'zod'

export const messageSchema = zod.object({
  text: zod.string(),
  audio: zod.string(),
})
