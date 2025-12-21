/* 
The sleigh’s GPS has gone crazy! 😱 Santa Claus has the segments of his trip, but they’re all out of order.

Your mission is to reconstruct the complete route from the origin to the final destination.

Keep in mind: The first element of the array is always the first segment of the trip. From there, you must keep connecting destinations to the next origins.

revealSantaRoute([
  ['MEX', 'CAN'],
  ['UK', 'GER'],
  ['CAN', 'UK']
])
// → ['MEX', 'CAN', 'UK', 'GER']

revealSantaRoute([
  ['USA', 'BRA'],
  ['JPN', 'PHL'],
  ['BRA', 'UAE'],
  ['UAE', 'JPN'],
  ['CMX', 'HKN']
])
// → ['USA', 'BRA', 'UAE', 'JPN', 'PHL']

revealSantaRoute([
  ['STA', 'HYD'],
  ['ESP', 'CHN']
])
// → ['STA', 'HYD']
🔎 Keep in mind:

There are no duplicate routes or cycles in Santa’s path.
There may be segments that don’t belong to the route; these must be ignored.
 */

function revealSantaRoute(routes: string[][]): string[] {
  if (routes.length === 0) return [];
  let routesMap: Record<string, string[]> = {};
  let finalRoute = [routes[0][0]];
  // There are no duplicate routes or cycles in Santa’s path.
  //There may be segments that don’t belong to the route; these must be ignored.
  routes.forEach((route) => {
    routesMap[route[0]] = route;
  });

  // Problem definition: The first element of the array is always the first segment of the trip.
  let currentRoute = [...routes[0]];
  while (currentRoute) {
    finalRoute.push(currentRoute[1]);
    // we always add first route, and start counting from the next
    currentRoute = routesMap[currentRoute[1]];
  }
  return finalRoute;
}

console.log(
  revealSantaRoute([
    ["MEX", "CAN"],
    ["UK", "GER"],
    ["CAN", "UK"],
  ])
);
// → ['MEX', 'CAN', 'UK', 'GER']

console.log(
  revealSantaRoute([
    ["USA", "BRA"],
    ["JPN", "PHL"],
    ["BRA", "UAE"],
    ["UAE", "JPN"],
    ["CMX", "HKN"],
  ])
);
// → ['USA', 'BRA', 'UAE', 'JPN', 'PHL']

console.log(
  revealSantaRoute([
    ["STA", "HYD"],
    ["ESP", "CHN"],
  ])
);
// → ['STA', 'HYD']

/* 
Difficulty: easy
Grade: ⭐⭐⭐⭐
Code review: 4/5
Strengths:
• The code correctly reconstructs the Santa route based on the provided segments.
• It handles the edge case of an empty input array.
• The use of a map to store routes allows for efficient lookups.
• TypeScript types are used appropriately.
Weak points:
• The logic for building the `finalRoute` could be slightly more robust. It assumes that `routes[0]` is always a valid starting point and that `routesMap[currentRoute[1]]` will eventually be undefined to terminate the loop. While the problem statement guarantees no cycles and a single route, a more explicit check for the existence of the next segment in the map before pushing it would be safer in a more general scenario.
Next steps:
• Consider adding a check within the `while` loop to ensure `currentRoute` is not undefined before accessing `currentRoute[1]` and before looking it up in `routesMap`. This would make the loop termination more explicit and guard against potential `undefined` access if the input data were slightly malformed (though the problem statement implies this won't happen).
*/
