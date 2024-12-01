# Advent of Code 2024

My contributions to the [Advent of Code](https://adventofcode.com/2024) for 2024.

## Try it out

_(you need to have [node.js](https://nodejs.org/) installed first)_

> Note: This repository is mirrored to multiple locations, get repository URL from where you are seeing this.

```shell
git clone <repo-url>
cd advent-of-code-2024
npm install
npm start <dayno>
```

> Replace `<dayno>` with the day you want to run the solution for (1-25).

Before you can run this you need to place your puzzle input for the day into the `inputs/` directory in a file named `day-<dayno>-input.txt`. Why? Read [this](https://www.reddit.com/r/adventofcode/wiki/faqs/copyright/inputs/).

To run with test data instead of real data, add the test data to `inputs/day-<dayno>-input-test.txt` (with two digits for `<dayno>`) and then:

```shell
npm start -- <dayno> --test
```
