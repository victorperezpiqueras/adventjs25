/* 
Two elves are playing a turn-based battle. Each one has a deck of moves represented as a string where each character is an action.

A Normal attack: deals 1 point of damage if it’s not blocked
B Block: blocks a normal attack (A)
F Strong attack: deals 2 points of damage, cannot be blocked
Both elves start with 3 hit points. The first elf to reach 0 hit points or less loses and the battle ends immediately (no further moves are processed).

Round rules

If both use an attack (A or F), both take damage according to the type.
B blocks A, but does not block F.
Everything is resolved simultaneously.
Your task

Return the result of the battle as a number:

1 → if Elf 1 wins
2 → if Elf 2 wins
0 → if it’s a draw (both reach 0 at the same time or end with the same health)
elfBattle('A', 'B')
// Round 1: A vs B -> Elf 2 blocks
// Result: Elf 1 = 3 HP
//         Elf 2 = 3 HP
// → 0

elfBattle('F', 'B')
// Round 1: F vs B -> Elf 2 takes 2 damage (F cannot be blocked)
// Result: Elf 1 = 3 HP
//         Elf 2 = 1 HP
// → 1

elfBattle('AAB', 'BBA')
// R1: A vs B → Elf 2 blocks
// R2: A vs B → Elf 2 blocks
// R3: B vs A → Elf 1 blocks
// Result: Elf 1 = 3, Elf 2 = 3
// → 0

elfBattle('AFA', 'BBA')
// R1: A vs B → Elf 2 blocks
// R2: F vs B → Elf 2 takes 2 damage (F cannot be blocked)
// R3: A vs A → both -1
// Result: Elf 1 = 2, Elf 2 = 0
// → 1

elfBattle('AFAB', 'BBAF')
// R1: A vs B → Elf 2 blocks
// R2: F vs B → Elf 2 takes 2 damage (F cannot be blocked)
// R3: A vs A → both -1 → Elf 2 reaches 0 Battle ends!
// R4: is not played, since Elf 2 has no health left
// → 1

elfBattle('AA', 'FF')
// R1: A vs F → Elf 1 -2, Elf 2 -1
// R2: A vs F → Elf 1 -2, Elf 2 -1 → Elf 1 reaches -1
// → 2
*/

function elfBattle(elf1: string, elf2: string): number {
  const battleRounds = elf1.length;
  let elf1Life = 3,
    elf2Life = 3;

  const damageMap = {
    A: (otherPlay) => (otherPlay === "B" ? 0 : 1),
    B: (_) => 0,
    F: (_) => 2,
  };

  for (let index = 0; index < battleRounds; index++) {
    const elf1Play = elf1[index];
    const elf2Play = elf2[index];

    elf1Life -= +damageMap[elf2Play](elf1Play);
    elf2Life -= +damageMap[elf1Play](elf2Play);
    if (elf1Life <= 0 || elf2Life <= 0) {
      break;
    }
  }
  if (elf1Life === elf2Life) {
    return 0;
  }
  return elf1Life > elf2Life ? 1 : 2;
}

console.log(elfBattle("A", "B"));
// Round 1: A vs B -> Elf 2 blocks
// Result: Elf 1 = 3 HP
//         Elf 2 = 3 HP
// → 0

console.log(elfBattle("F", "B"));
// Round 1: F vs B -> Elf 2 takes 2 damage (F cannot be blocked)
// Result: Elf 1 = 3 HP
//         Elf 2 = 1 HP
// → 1

console.log(elfBattle("AAB", "BBA"));
// R1: A vs B → Elf 2 blocks
// R2: A vs B → Elf 2 blocks
// R3: B vs A → Elf 1 blocks
// Result: Elf 1 = 3, Elf 2 = 3
// → 0

console.log(elfBattle("AFA", "BBA"));
// R1: A vs B → Elf 2 blocks
// R2: F vs B → Elf 2 takes 2 damage (F cannot be blocked)
// R3: A vs A → both -1
// Result: Elf 1 = 2, Elf 2 = 0
// → 1

console.log(elfBattle("AFAB", "BBAF"));
// R1: A vs B → Elf 2 blocks
// R2: F vs B → Elf 2 takes 2 damage (F cannot be blocked)
// R3: A vs A → both -1 → Elf 2 reaches 0 Battle ends!
// R4: is not played, since Elf 2 has no health left
// → 1

console.log(elfBattle("AA", "FF"));
// R1: A vs F → Elf 1 -2, Elf 2 -1
// R2: A vs F → Elf 1 -2, Elf 2 -1 → Elf 1 reaches -1
// → 2

/* 
Difficulty: medium
Grade: ⭐⭐⭐⭐⭐
Code review: 5/5
Strengths:
• The code correctly implements the battle logic and handles simultaneous moves.
• The use of a damage map simplifies the logic for calculating damage.
• The code is well-structured and easy to read.
• Edge cases like simultaneous KOs and draws are handled correctly.
*/
