const url = " https://script.google.com/macros/s/AKfycbyhdCKUcDiFeworrCbAAeHZYpmX5rAzN-f4xL8HeVV7nk-bdOickYIwjHuVVt0Oip6JyQ/exec";
const form = document.getElementById("form");
const submitBtn = document.getElementById("submitBtn");
const loader = document.getElementById("loader");

// Slider live update logic
const ratingInput = document.getElementById("rating");
const ratingTextSpan = document.getElementById("ratingText");

ratingInput.addEventListener("input", () => {
  const val = +ratingInput.value;
  ratingTextSpan.innerText = val <= 3 ? "Poor" : val <= 7 ? "Good" : "Excellent";
});

// Form submission logic
form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  loader.style.display = "inline-block";

  const data = new FormData();

  data.append("satisfaction", ratingInput.value);
  data.append("growth_suggestion", form.querySelector('textarea[name="growth_suggestion"]')?.value || "");

  const selectedOpportunities = Array.from(
    form.querySelectorAll('input[name="opportunities[]"]:checked')
  ).map(cb => cb.value);
  data.append("opportunities", selectedOpportunities.join(", "));

  data.append("work_life_balance", form.querySelector('input[name="work_life_balance"]:checked')?.value || "");
  data.append("work_culture", form.querySelector('input[name="work_culture"]:checked')?.value || "");
  data.append("like", form.querySelector('input[name="like"]')?.value || "");
  data.append("dislike", form.querySelector('input[name="dislike"]')?.value || "");
  data.append("feedback", form.querySelector('textarea[name="feedback"]')?.value || "");

  fetch(url, {
    method: "POST",
    body: data
  })
    .then((res) => res.text()) // Optional: handle returned JSON/text
    .then(() => {
      alert("Form submitted successfully!");
      form.reset();
      ratingInput.value = 5;
      ratingTextSpan.innerText = "Good";
    })
    .catch(err => {
      console.error("Submission error:", err);
      alert("Error submitting form. Please try again.");
    })
    .finally(() => {
      submitBtn.disabled = false;
      loader.style.display = "none";
    });
});
