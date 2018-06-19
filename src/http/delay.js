export default delay => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay)
  })
}
