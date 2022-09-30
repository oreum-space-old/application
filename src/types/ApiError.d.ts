export type ApiError = null | {
  message: string,
  errors: Array<{
    type: string
    field: string
    value: string
    text: string
  }>
}