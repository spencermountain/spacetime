// Helper to print dates nicely
export const formatDate = (state) => {
  const pad = (n) => String(n).padStart(2, '0')
  return `${state.year}-${pad(state.month)}-${pad(state.day)}T` +
    `${pad(state.hour)}:${pad(state.minute)}:${pad(state.second)}`
}
