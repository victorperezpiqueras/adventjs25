/* 
Los elfos han encontrado el código cifrado que protege la puerta del taller de Santa 🔐. El PIN tiene 4 dígitos, y está escondido dentro de bloques como estos:

[1++][2-][3+][<]
Escribe una función que descifre el PIN a partir del código.

El código está formado por bloques entre corchetes [...] y cada bloque genera un dígito del PIN.

Un bloque normal tiene la forma [nOP...], donde n es un número (0-9) y después puede haber una lista de operaciones (opcionales).

Las operaciones se aplican en orden al número y son:

+ suma 1
- resta 1
El resultado siempre es un dígito (aritmética mod 10), por ejemplo 9 + 1 → 0 y 0 - 1 → 9.

También existe el bloque especial [<], que repite el dígito del bloque anterior.

Si al final hay menos de 4 dígitos, se debe devolver null.

🧩 Ejemplos
decodeSantaPin('[1++][2-][3+][<]')
// "3144"

decodeSantaPin('[9+][0-][4][<]')
// "0944"

decodeSantaPin('[1+][2-]')
// null (solo 2 dígitos) 
*/

function decodeSantaPin(code: string): string | null {
  const codeParts = [...code.matchAll(/\[(.*?)\]/g)].map((m) => m[1]);

  const operations = {
    "+": (num: number) => (num + 1) % 10,
    "-": (num: number) => (num - 1 + 10) % 10,
  };

  let parsedParts: number[] = [];

  for (let i = 0; i < codeParts.length; i++) {
    const part = codeParts[i];

    if (part === "<") {
      if (i === 0) break; // invalid case first position
      parsedParts.push(parsedParts[i - 1]);
    } else {
      // number is always first pos
      let num = Number(part[0]);
      for (let index = 1; index < part.length; index++) {
        const op = part[index];
        // apply operations to the number and update it
        num = operations[op](num);
      }
      parsedParts.push(num);
    }
  }
  if (parsedParts.length < 4) return null;
  return parsedParts.join("");
}

console.log(decodeSantaPin("[1++][2-][3+][<]"));
// "3144"

console.log(decodeSantaPin("[9+][0-][4][<]"));
// "0944"

console.log(decodeSantaPin("[1+][2-]"));

/* 
Difficulty: medium
Grade: ⭐⭐⭐⭐⭐
Code review: 5/5
Strengths:
• The code is well-structured and correctly parses the input string using regular expressions.
• It accurately implements the modulo 10 arithmetic for both addition and subtraction operations.
• The special '<' block is handled correctly, including the edge case where it appears as the first block.
• The solution demonstrates good algorithmic efficiency with linear time and space complexity.
• TypeScript usage is appropriate, leveraging type inference and explicit annotations where beneficial, without using 'any'.
Next steps:
• For a minor readability improvement, consider accumulating the calculated digit in a local variable within the loop for normal blocks, and then pushing the final result to `parsedParts` once, rather than updating `parsedParts[i]` multiple times. This is a stylistic preference and does not affect correctness.
*/
