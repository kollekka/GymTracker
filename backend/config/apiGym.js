const fetchExercises = async () => {
  try {
    const response = await fetch("https://exercisedb.p.rapidapi.com/exercises?limit=9&rapidapi-key=YOUR_API_KEY");
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

module.exports = fetchExercises;