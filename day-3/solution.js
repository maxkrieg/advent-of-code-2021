const input = require('./input').default

const partOne = () => {
  const mostCommonList = []
  const counts = [
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 },
    { 0: 0, 1: 0 }
  ]
  for (let i = 0; i < input.length; i++) {
    const current = input[i]
    console.log('-----------------')
    console.log(current)
    current.split('').forEach((n, i) => {
      counts[i][n] += 1
    })
  }
  let gamma = []
  let epsilon = []

  counts.forEach((item) => {
    const countZero = item['0']
    const countOne = item['1']
    if (countZero > countOne) {
      gamma.push(0)
      epsilon.push(1)
    } else {
      gamma.push(1)
      epsilon.push(0)
    }
  })

  const gammaInt = parseInt(gamma.join(''), 2)
  const epsilonInt = parseInt(epsilon.join(''), 2)
  const gammaBinary = parseInt(gamma.join(''))
  const epsilonBinary = parseInt(epsilon.join(''))

  return {
    gammaInt,
    epsilonInt,
    multiplied: gammaInt * epsilonInt,
    gammaBinary,
    epsilonBinary
  }
}

// start with oxygen generator rating
const getRating = (type, currentInput, idx) => {
  if (currentInput.length === 1) return currentInput[0]

  const numbersWithLeadingZero = []
  const numbersWithLeadingOne = []

  currentInput.forEach(num => {
    if (num.charAt(idx) === '0') {
      numbersWithLeadingZero.push(num)
    } else {
      numbersWithLeadingOne.push(num)
    }
  })

  console.log({ startsWithOneLength: numbersWithLeadingOne.length, startsWithZeroLength: numbersWithLeadingZero.length })

  if (numbersWithLeadingOne.length >= numbersWithLeadingZero.length) {
    return getRating(type, type === 'oxygen_generator' ? numbersWithLeadingOne : numbersWithLeadingZero, idx + 1)
  } else {
    return getRating(type, type=== 'oxygen_generator' ? numbersWithLeadingZero : numbersWithLeadingOne, idx + 1)
  }
}
const oxygenGeneratorRating = getRating('oxygen_generator', input, 0)
const co2ScrubberRating = getRating('co2_scrubber', input, 0)
const lifeSupport = parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2)
console.log({ oxygenGeneratorRating, co2ScrubberRating, lifeSupport })
