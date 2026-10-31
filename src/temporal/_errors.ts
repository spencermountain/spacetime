const invalid = s => {
  const result = s.clone()
  result._value = null
  result._pending = null
  return result
}

// Convert rejected date values to invalid instances; keep unexpected bugs visible.
const attempt = (s, operation) => {
  try {
    return operation()
  } catch (error) {
    if (!(error instanceof RangeError || error instanceof TypeError)) {
      throw error
    }
    return invalid(s)
  }
}

export default attempt
