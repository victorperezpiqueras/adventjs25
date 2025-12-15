/* 
ChatGPT has arrived at the North Pole and the elf Sam Elfman is working on a gift and children management application.

To improve the presentation, he wants to create a drawTable function that receives an array of objects and turns it into a text table.

The drawn table must have:

A header with column letters (A, B, C…).
The content of the table is the values of the objects.
The values must be left-aligned.
The fields always leave one space on the left.
The fields leave on the right the space needed to align the box.
The function receives a second parameter sortBy that indicates the name of the field by which the rows must be sorted. The order will be ascending alphabetical if the values are strings and ascending numeric if they are numbers.

Check the example to see how you should draw the table:

drawTable(
  [
    { name: 'Charlie', city: 'New York' },
    { name: 'Alice', city: 'London' },
    { name: 'Bob', city: 'Paris' }
  ],
  'name'
)
// +---------+----------+
// | A       | B        |
// +---------+----------+
// | Alice   | London   |
// | Bob     | Paris    |
// | Charlie | New York |
// +---------+----------+

drawTable(
  [
    { gift: 'Book', quantity: 5 },
    { gift: 'Music CD', quantity: 1 },
    { gift: 'Doll', quantity: 10 }
  ],
  'quantity'
)
// +----------+----+
// | A        | B  |
// +----------+----+
// | Music CD | 1  |
// | Book     | 5  |
// | Doll     | 10 |
// +----------+----+
 */

type Data = Array<Record<string, string | number>>;
type SortBy = string;

function drawTable(data: Data, sortBy: SortBy): string {
  data.sort((a, b) => {
    return typeof a[sortBy] === "number" && typeof b[sortBy] === "number"
      ? a[sortBy] - b[sortBy]
      : a[sortBy].localeCompare(b[sortBy]);
  });
  const columns = Object.keys(data[0]);
  let colsMaxSize = [];
  for (let colIndex = 0; colIndex < columns.length; colIndex++) {
    const col = columns[colIndex];
    let colMaxLength = 0;
    for (let index = 0; index < data.length; index++) {
      const elem = data[index];
      const elemLength =
        typeof elem[col] !== "string"
          ? elem[col].toString().length
          : elem[col].length;
      colMaxLength = elemLength > colMaxLength ? elemLength : colMaxLength;
    }
    colsMaxSize.push(colMaxLength);
  }

  let rowStrings = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    let rowCells = [];
    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      const col = columns[colIndex];
      const colValue = element[col];
      const elemLength =
        typeof colValue !== "string"
          ? colValue.toString().length
          : colValue.length;
      const extraSpaces = colsMaxSize[colIndex] - elemLength;
      const cell = ` ${colValue}${" ".repeat(extraSpaces)} `;
      rowCells.push(cell);
    }
    const row = `|${rowCells.join("|")}|`;
    rowStrings.push(row);
  }
  let headerStrings = [];
  let borderStrings = [];
  const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let colIndex = 0; colIndex < columns.length; colIndex++) {
    const letter = abc[colIndex];
    const extraSpaces =
      colsMaxSize[colIndex] > 0 ? colsMaxSize[colIndex] - 1 : 0;
    const cell = ` ${letter}${" ".repeat(extraSpaces)} `;
    headerStrings.push(cell);
    borderStrings.push(`${"-".repeat(colsMaxSize[colIndex] + 2)}`);
  }
  const headerString = `|${headerStrings.join("|")}|`;
  const borderString = `+${borderStrings.join("+")}+`;

  return [
    borderString,
    headerString,
    borderString,
    ...rowStrings,
    borderString,
  ].join("\n");
}

console.log(
  drawTable(
    [
      { name: "Charlie", city: "New York" },
      { name: "Alice", city: "London" },
      { name: "Bob", city: "Paris" },
    ],
    "name"
  )
);
console.log(
  drawTable(
    [
      { gift: "Book", quantity: 5 },
      { gift: "Music CD", quantity: 1 },
      { gift: "Doll", quantity: 10 },
    ],
    "quantity"
  )
);

/* 
Difficulty: medium
Grade: ⭐⭐⭐⭐
Code review: 4/5
Strengths:
• The sorting logic correctly handles both string and number types.
• The code effectively calculates column widths for proper alignment.
• TypeScript types are used appropriately, enhancing code clarity and safety.
• The table construction logic is sound and produces the desired output format.
Weak points:
• The code uses nested loops for calculating column maximum sizes and generating row strings, which could be more efficiently handled.
• The calculation of `extraSpaces` for the header and cell content could be simplified.
• The `maxLen` signal indicates long lines, which can impact readability.
Next steps:
• Consider refactoring the nested loops for calculating column widths and generating rows to improve efficiency and readability. For example, a single pass over the data could potentially determine column widths and build row strings simultaneously.
• Review and simplify the logic for calculating padding spaces to ensure clarity.
• Break down long lines to improve code readability and maintainability.
*/
