import {z, ZodIssueCode} from "zod"

export const PortString = z.string().superRefine((value, ctx) => {
  if (!/^[0-9]+$/.test(value)) {
    ctx.addIssue({
      validation: "regex",
      code: ZodIssueCode.invalid_string,
      message: "This string cannot be converted to a number"
    })
  }
})

export const PortNumber = z.number().int().min(0).max(2 ** 16 - 1)

export const Port = z
  .union([z.number(), PortString])
  .transform(value => value ? Number(value) : undefined)
  .optional()

export type IPort = z.input<typeof Port>

export type OPort = z.output<typeof Port>
