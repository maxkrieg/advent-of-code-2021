const input = require('./input').default

const partOne = () => {
  let horizontal = 0
  let depth = 0
  for (let i = 0; i < input.length; i++) {
    const [command, amount] = input[i]
    switch (command) {
      case 'forward':
        horizontal += amount
        break
      case 'up':
        depth -= amount
        break
      case 'down':
        depth += amount
        break
      default:
        continue
    }
  }
  return { horizontal, depth, multiplied: horizontal * depth }
}

const partTwo = () => {
  let aim = 0
  let horizontal = 0
  let depth = 0
  for (let i = 0; i < input.length; i++) {
    const [command, amount] = input[i]
    switch (command) {
      case 'forward':
        console.log('increasing forward by', amount)
        horizontal += amount
        if (aim !== 0) {
          depth += (aim * amount)
        }
        break
      case 'up':
        console.log('decreasing aim by', amount)
        aim -= amount
        break
      case 'down':
        console.log('increasing aim by', amount)
        aim += amount
        break
      default:
        continue
    }
  }
  return { aim, horizontal, depth, multiplied: horizontal * depth }
}

console.log({ partOne: partOne(), partTwo: partTwo() })