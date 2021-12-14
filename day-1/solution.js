const input = require('./input').default

const partOne = () => {
  let increaseCount = 0
  let previous = input[0]
  for (let i = 1; i < input.length; i++) {
    const current = input[i]
    if (current > previous) increaseCount++
    previous = current
  }
  return increaseCount
}

const sumArray = (array) => array.reduce((a, b) => a + b)

const partTwo = () => {
  let increases = 0
  let previousWindow = sumArray([input[0], input[1], input[2]])
  for (let i = 1; i < input.length - 2; i++) {
    const currentWindow = sumArray([input[i], input[i + 1], input[i + 2]])
    if (currentWindow > previousWindow) increases++
    previousWindow = currentWindow
  }
  return increases
}

console.log({ resultPartOne: partOne(), resultPartTwo: partTwo()})