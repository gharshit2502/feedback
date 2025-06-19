const url =
  "https://script.google.com/macros/s/AKfycbxoAbC1g4WS5E46CrUAdl0BVaLiP0riMvVXt7yBR8v8IKd8hsa3ZhNb8fdR-icJWYrJog/exec";

const form = document.querySelector("#form");
const submitBtn = document.getElementById("submitBtn");
const loader = document.getElementById("loader");

const ratingInput = document.getElementById("rating");
const ratingValueSpan = document.getElementById("ratingValue");
const ratingTextSpan = document.getElementById("ratingText");

ratingInput.addEventListener("input", () => {
  const val = +ratingInput.value;
  ratingValueSpan.innerText = val;
  ratingTextSpan.innerText = val <= 3 ? "Poor" : val <= 7 ? "Good" : "Happy!";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  loader.style.display = "inline-block";

  const data = new FormData(form);
  const params = new URLSearchParams({ ...data });
  // fetch(`${url}?${params.toString()}`, {
  fetch(url, {
    redirect: "follow",
    method: "POST",
    mode: "no-cors",
    body: data,
    // headers: {
    //   "Content-Type": "text/plain;charset=utf-8",
    // },
  })
    .then(() => {
      alert("Form submitted successfully!");
      form.reset();
      ratingInput.value = 5;
      ratingValueSpan.innerText = "5";
      ratingTextSpan.innerText = "Good";
    })
    .catch((err) => {
      console.error("Submission error:", err);
      alert("Error: " + err.message);
    })
    .finally(() => {
      submitBtn.disabled = false;
      loader.style.display = "none";
    });
});
// document.getElementById("form").reset();
