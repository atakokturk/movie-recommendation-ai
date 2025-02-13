document.addEventListener("DOMContentLoaded", () => {
  const recommendBtn = document.getElementById("recommendBtn");
  const userInput = document.getElementById("userInput");
  const recommendationDiv = document.getElementById("recommendation");
  const loaderDiv = document.getElementById("loader");

  recommendBtn.addEventListener("click", async () => {
    const inputText = userInput.value.trim();

    if (inputText === "") {
      alert("Please enter your preferences");
      return;
    }
    loaderDiv.style.display = "block";

    try {
      const response = await axios.get(`/recommend?input=${encodeURIComponent(inputText)}`);
      const recommendMovie = response.data;

      if (recommendMovie) {
        recommendationDiv.innerHTML = `
                <h3>Recommend Movie:</h3>
                <p>${recommendMovie}</p> `;
      } else {
        recommendationDiv.innerHTML = `
                <p>No movie recommendation available. </p>`;
      }
    } catch (err) {
      console.error(err);
      recommendationDiv.innerHTML = `
            <p>Error in processing of reccomendation. </p>`;
    } finally {
      loaderDiv.style.display = "none";
    }
  });
});
