if (!globalThis.Temporal) {
  throw new Error('Temporal tests require a runtime with native Temporal, such as Node 26')
}
