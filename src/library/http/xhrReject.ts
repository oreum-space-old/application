const rejectTypes = ['api', 'abort', 'unknown', 'script', 'timeout'] as const

type RejectTypes = typeof rejectTypes[number]

export default class XhrReject<RejectType extends RejectTypes> {
  readonly rejectType: RejectType

  constructor (rejectType: RejectType) {
    this.rejectType = rejectType
  }
}
