export const ctxNotSetFn = (ctx?: string) => () => {
  console.warn('Context is not set', { context: ctx })
}
