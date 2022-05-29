const res = await fetch("https://nodejs.org/api/documentation.json");
if (res.ok) {
  const data = await res.json();
  console.log(data);
}
