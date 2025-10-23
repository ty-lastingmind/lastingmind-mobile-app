import zod from 'zod'

export const alignmentSchema = zod.object({
  characters: zod.array(zod.string()),
  character_start_times_seconds: zod.array(zod.number()),
  character_end_times_seconds: zod.array(zod.number()),
})

export const wsMessageSchema = zod.object({
  text: zod.string(),
  audio: zod.string(),
  alignment: alignmentSchema,
})
