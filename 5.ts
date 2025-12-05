/* 
Elves have a secret timestamp: it’s the exact date and time when Santa Claus takes off with the sleigh 🛷 to deliver gifts around the world. But at the North Pole they use a super weird format to store the time: YYYY*MM*DD@HH|mm|ss NP (example: 2025*12*25@00|00|00 NP).

Your mission is to write a function that receives:

fromTime → reference date in elf format (YYYY*MM*DD@HH|mm|ss NP).
takeOffTime → the same takeoff date, also in elf format.
The function must return:

The full seconds remaining until takeoff.
If we’re exactly at takeoff time → 0.
If takeoff already happened → a negative number indicating how many seconds have passed since then.
🎯 Rules
First convert the elf format to a timestamp. The NP suffix indicates official North Pole time (no time zones or DST), so you can treat it as if it were UTC.
Use differences in seconds, not milliseconds.
Always round down (floor): only full seconds.
🧩 Examples
const takeoff = '2025*12*25@00|00|00 NP'

// from December 24, 2025, 23:59:30, 30 seconds before takeoff
timeUntilTakeOff('2025*12*24@23|59|30 NP', takeoff)
// 30

// exactly at takeoff time
timeUntilTakeOff('2025*12*25@00|00|00 NP', takeoff)
// 0

// 12 seconds after takeoff
timeUntilTakeOff('2025*12*25@00|00|12 NP', takeoff)
// -12
*/

type ElfDateTime =
  `${number}*${number}*${number}@${number}|${number}|${number} NP`;

function timeUntilTakeOff(
  fromTime: ElfDateTime,
  takeOffTime: ElfDateTime
): number {
  function getTs(time: ElfDateTime): number {
    const parts = time.split("@");
    const leftParts = parts[0].split("*");
    const year = leftParts[0];
    const month = leftParts[1];
    const day = leftParts[2];

    const rightParts = parts[1].split("|");
    const hour = rightParts[0];
    const minute = rightParts[1];
    const second = rightParts[2].split(" ")[0];

    const date = new Date(
      `${year}-${month}-${day}T${hour}:${minute}:${second}Z`
    );
    // get seconds rounded to floor
    return Math.floor(date.getTime() / 1000);
  }

  return getTs(takeOffTime) - getTs(fromTime);
}

const takeoff = "2025*12*25@00|00|00 NP";

// from December 24, 2025, 23:59:30, 30 seconds before takeoff
console.log(timeUntilTakeOff("2025*12*24@23|59|30 NP", takeoff));

/* 
Difficulty: easy
Grade: ⭐⭐⭐⭐⭐
Code review: 5/5
Strengths:
• The code is well-structured and easy to understand, utilizing a clear helper function `getTs` to encapsulate date parsing logic.
• Excellent use of TypeScript's template literal types (`ElfDateTime`) to define the expected input format, enhancing type safety and readability.
• The algorithm is efficient (O(1)) and correctly handles date parsing and time difference calculation, including rounding down to full seconds as required.
• The solution correctly interprets 'NP' as UTC by appending 'Z' to the date string, ensuring accurate time zone handling.
*/
