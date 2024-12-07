import { EOL } from "./lib/utils";

type MapTile = "O" | "V" | null; // obstacle or visited or free

type Direction = {
  name: string;
  dRow: -1 | 0 | 1;
  dCol: -1 | 0 | 1;
};

type Pos = { row: number; col: number };

type State = {
  tiles: MapTile[][];
  guard: Pos;
  direction: Direction;
};

const Up: Direction = { name: "Up", dRow: -1, dCol: 0 };
const Down: Direction = { name: "Down", dRow: 1, dCol: 0 };
const Right: Direction = { name: "Right", dRow: 0, dCol: 1 };
const Left: Direction = { name: "Left", dRow: 0, dCol: -1 };

function parseInput(input: string): State {
  let guard: Pos | undefined;
  const tiles: MapTile[][] = [];

  const lines = input.split(EOL);
  for (let row = 0; row < lines.length; row++) {
    const mapLine: MapTile[] = [];
    const mapTiles = lines[row].split("");
    for (let col = 0; col < mapTiles.length; col++) {
      switch (lines[row][col]) {
        case ".":
          mapLine.push(null);
          break;
        case "#":
          mapLine.push("O");
          break;
        case "^":
          mapLine.push("V");
          guard = { row, col };
          break;
      }
    }
    tiles.push(mapLine);
  }
  if (!guard) throw Error("No guard position found");
  return { tiles, guard, direction: Up };
}

function nextPosFromState(state: State): Pos {
  return {
    row: state.guard.row + state.direction.dRow,
    col: state.guard.col + state.direction.dCol,
  };
}

function turnRight(state: State): Direction {
  switch (state.direction.name) {
    case "Up":
      return Right;
    case "Right":
      return Down;
    case "Down":
      return Left;
    case "Left":
      return Up;
    default:
      throw Error("Invalid direction");
  }
}

function solvePart1(state: State): number {
  while (true) {
    let candidateNextPos = nextPosFromState(state);
    if (
      candidateNextPos.row < 0 ||
      candidateNextPos.row >= state.tiles.length ||
      candidateNextPos.col < 0 ||
      candidateNextPos.col >= state.tiles[candidateNextPos.row].length
    ) {
      state.guard = candidateNextPos;
      break; // outside the field, done
    }
    if (state.tiles[candidateNextPos.row][candidateNextPos.col] === "O") {
      state.direction = turnRight(state);
      candidateNextPos = nextPosFromState(state);
    }
    state.guard = candidateNextPos;
    state.tiles[state.guard.row][state.guard.col] = "V";
  }
  return state.tiles.map((row) => row.filter((tile) => tile === "V").length).reduce((sum, value) => sum + value, 0);
}

export default async (input: string) => {
  const data = parseInput(input);

  console.log(`Part 1: The result is: ${solvePart1(JSON.parse(JSON.stringify(data)))}`);
};
