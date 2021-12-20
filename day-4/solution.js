const fs = require('fs')
const draws = require('./draws').default

const path = require('path')
const boardsFilePath = path.join(__dirname, 'boards.txt')

const getBoards = () => {
  const rowsArray = fs.readFileSync(boardsFilePath).toString().split("\n").filter(val => !!val)
  const boards = [[]]
  let currentBoardIndex = 0
  
  rowsArray.forEach(row => {
    const rowArray = row.split(' ').filter(val => !!val).map(val => parseInt(val))
    if (boards[currentBoardIndex].length < 5) {
      boards[currentBoardIndex].push(rowArray)
    } else {
      currentBoardIndex += 1
      boards.push([rowArray])
    }
  })

  return boards
}

const isWinningBoard = (board) => {
  const columnHits = [0, 0, 0, 0, 0]
  
  // loop through each row on board
  for (let i = 0; i < board.length; i++) {
    const row = board[i]

    // check for row win
    if (row.every(v => v === 'x')) {
      return true
      // return [ROW_WIN, i]
    }

    // tally up column 'x's per column in each row to determine column win
    for (let j = 0; j < row.length; j++) {
      if (row[j] === 'x') {
        columnHits[j] += 1
      }
    }
  }

  // check for column win
  const colWinnerIndex = columnHits.indexOf(5)
  if (colWinnerIndex >= 0) {
    return true
  }

  return false
}

const updateBoards = (boards, draw) => {
  // loop through each board
  for (let i = 0; i < boards.length; i++) {
    const board = boards[i]
    
    // loop through each row in the current board
    for (let j = 0; j < board.length; j++) {
      const row = board[j]
      const idxMatch = row.indexOf(draw)
      if (idxMatch >= 0) {
        row.splice(idxMatch, 1, 'x')
      }
    }

    // return all boards and winning board if this became winning board
    if (isWinningBoard(board)) {
      return [boards, board]
    }

  }
  return [boards, null]
}

const updateBoardsAndRemoveWinner = (boards, draw) => {
  let lastWinner
  for (let i = 0; i < boards.length; i++) {
    const board = boards[i]
    
    for (let j = 0; j < board.length; j++) {
      const row = board[j]
      const idxMatch = row.indexOf(draw)
      if (idxMatch >= 0) {
        row.splice(idxMatch, 1, 'x')
      }
    }

    if (isWinningBoard(board)) {
      const spliced = boards.splice(i, 1)
      lastWinner = spliced[0]
      i--
    }
  }
  return [boards, lastWinner]
}

const getFirstWinningBoard = (boards, draws, drawIdx) => {
  const currentDraw = draws[drawIdx]
  const [updatedBoards, winningBoard] = updateBoards(boards, currentDraw)
  if (!winningBoard) {
    return getFirstWinningBoard(updatedBoards, draws, drawIdx + 1)
  }
  return [winningBoard, currentDraw]
}

const getLastWinningBoard = (boards, draws, drawIdx) => {
  const currentDraw = draws[drawIdx]
  const [updatedBoards, lastWinner] = updateBoardsAndRemoveWinner(boards, currentDraw)
  if (updatedBoards.length === 0) {
    return [lastWinner, currentDraw]
  }
  
  return getLastWinningBoard(updatedBoards, draws, drawIdx + 1)
}

const sumOfNonDrawnNumbers = (board) => board.flat().filter(v => v !== 'x').reduce((a, b) => a + b)

const partOne = () => {
  const boards = getBoards()
  
  const [firstWinningBoard, lastDraw] = getFirstWinningBoard(boards, draws, 0)
  const firstSum = sumOfNonDrawnNumbers(firstWinningBoard)
  const firstSolution = firstSum * lastDraw
  
  return { firstWinningBoard, lastDraw, firstSum, firstSolution }
}

const partTwo = () => {
  const boards = getBoards()  
  const [lastWinningBoard, lastDraw] = getLastWinningBoard(boards, draws, 0)
  const lastSum = sumOfNonDrawnNumbers(lastWinningBoard)
  const lastSolution = lastSum * lastDraw
  
  return { lastWinningBoard, lastDraw, lastSum, lastSolution }
}

console.log(partOne())
console.log(partTwo())
