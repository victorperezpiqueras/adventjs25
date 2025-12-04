/* 
In Santa’s workshop there’s an intern elf who is learning to wrap gifts 🎁.

They’ve asked the elf to wrap boxes using only text… and they do it more or less correctly.

They are given two parameters:

size: the size of the square gift
symbol: the character the elf uses to make the border (when they don’t mess it up 😅)
The gift must meet these requirements:

It must be a size x size square.
The inside is always empty (filled with spaces), because the elf “doesn’t know how to draw the filling yet”.
If size < 2, return an empty string: the elf tried, but the gift got lost.
The final result must be a string with newline characters \n.
Yes, it’s an easy challenge… but we don’t want the intern to get fired. Right?

🧩 Examples
const g1 = drawGift(4, '*')
console.log(g1)
/*
 ****
 *  *
 *  *
 ****
 */

//const g2 = drawGift(3, '#')
//console.log(g2)
/*
###
# #
###
*/

//const g3 = drawGift(2, '-')
//console.log(g3)
/*
--
--
*/

//const g4 = drawGift(1, '+')
//console.log(g4)
// ""  poor intern…

function drawGift(size: number, symbol: string): string {
  if (size < 2) return "";
  let gift = `${symbol.repeat(size)}\n`;
  for (let index = 1; index < size - 1; index++) {
    const spaces = " ".repeat(size - 2);
    gift += `${symbol}${spaces}${symbol}\n`;
  }
  gift += symbol.repeat(size);
  return gift;
}

const g1 = drawGift(4, "*");
console.log(g1);
/*
 ****
 *  *
 *  *
 ****
 */

const g2 = drawGift(3, "#");
console.log(g2);
/*
###
# #
###
*/

const g3 = drawGift(2, "-");
console.log(g3);
/*
--
--
*/

const g4 = drawGift(1, "+");
console.log(g4);

/* 
Difficulty: easy
Grade: ⭐⭐⭐⭐⭐
Code review: 5/5
Strengths:
• The code correctly implements the gift-drawing logic, handling edge cases like `size < 2` as required.
• The control flow is very clear and easy to follow, with minimal nesting.
• Good use of TypeScript type annotations for parameters and return type enhances clarity.
• The algorithmic approach is efficient and directly addresses the problem's requirements using string repetition and concatenation.
*/
