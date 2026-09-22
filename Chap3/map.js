const employees = [
  { name: "tim", id: 1 },
  { name: "cindy", id: 2 },
  { name: "rob", id: 3 },
];

let elements = employees.map((item) => {
  return `<div>${item.id}</div>`
})
console.log(elements);
