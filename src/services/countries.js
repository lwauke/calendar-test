const getCountries = async function () {
  const res = await fetch('https://countriesnow.space/api/v0.1/countries');
  const json = await res.json();
  return json.data;
}

export default getCountries;