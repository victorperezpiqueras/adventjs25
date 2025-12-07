/* 
In Santa's workshop, the elves have found a mountain of magical gloves completely disorganized. Each glove is described by two values:

hand: indicates whether it is a left glove (L) or a right glove (R)
color: the color of the glove (string)
Your task is to help them match gloves: A valid pair is a left glove and a right glove of the same color.

You must return a list with the colors of all the pairs found. Keep in mind that there can be several pairs of the same color.

🧩 Examples
const gloves = [
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'red' },
  { hand: 'R', color: 'green' },
  { hand: 'L', color: 'blue' },
  { hand: 'L', color: 'green' }
]

matchGloves(gloves)
// ["red", "green"]

const gloves2 = [
  { hand: 'L', color: 'gold' },
  { hand: 'R', color: 'gold' },
  { hand: 'L', color: 'gold' },
  { hand: 'L', color: 'gold' },
  { hand: 'R', color: 'gold' }
]

matchGloves(gloves2)
// ["gold", "gold"]

const gloves3 = [
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'green' },
  { hand: 'L', color: 'blue' }
]

matchGloves(gloves3)
// []
*/

type Glove = { hand: "L" | "R"; color: string };

function matchGloves(gloves: Glove[]): string[] {
  // Code here
  let result = [];
  let pairs: Map<string, ("L" | "R")[]> = new Map();
  gloves.forEach((glove) => {
    let currentPair = pairs.get(glove.color) || [];
    currentPair.push(glove.hand);
    pairs.set(glove.color, currentPair);
  });

  for (const [key, value] of pairs) {
    const lefts = value.filter((elem) => elem === "L").length;
    const rights = value.filter((elem) => elem === "R").length;
    const pairs = Math.min(lefts, rights);
    result.push(...Array(pairs).fill(key));
  }
  return result;
}

const gloves: Glove[] = [
  { hand: "L", color: "red" },
  { hand: "R", color: "red" },
  { hand: "R", color: "green" },
  { hand: "L", color: "blue" },
  { hand: "L", color: "green" },
];

console.log(matchGloves(gloves));
// ["red", "green"]

const gloves2: Glove[] = [
  { hand: "L", color: "gold" },
  { hand: "R", color: "gold" },
  { hand: "L", color: "gold" },
  { hand: "L", color: "gold" },
  { hand: "R", color: "gold" },
];

console.log(matchGloves(gloves2));
// ["gold", "gold"]

const gloves3: Glove[] = [
  { hand: "L", color: "red" },
  { hand: "R", color: "green" },
  { hand: "L", color: "blue" },
];

console.log(matchGloves(gloves3));

/* 
Difficulty: easy
Grade: ⭐⭐⭐⭐⭐
Code review: 5/5
Strengths:
• The code is well-structured and easy to understand.
• Excellent use of TypeScript types, including literal union types for 'hand' and a precise Map type.
• The algorithm is efficient, processing gloves in a single pass to group them by color and then efficiently calculating pairs.
• Handles edge cases correctly, such as an empty input array or no matching pairs.
*/
