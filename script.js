const url = "https://script.google.com/macros/s/AKfycbx8YXFH7crHLncbJf7wnC-eAKsWzFoEhcs6V759srnM6LM05Wm0x8Js-Z5WTECnY8S7EA/exec";
const form = document.querySelector("#form");
const submitBtn = document.getElementById("submitBtn");
const loader = document.getElementById("loader");

// Slider live-update logic
const ratingInput     = document.getElementById("rating");
const ratingValueSpan = document.getElementById("ratingValue");
const ratingTextDiv   = document.getElementById("ratingText");

ratingInput.addEventListener("input", () => {
  const val = +ratingInput.value;
  ratingValueSpan.innerText = val;
  const text = (val <= 3)
    ? "Poor"
    : (val <= 7)
      ? "Good"
      : "Tasty!";
  ratingTextDiv.innerText = text;
});
const mealType = document.querySelector('input[name="mealType"]:checked')?.value;
  console.log("Selected Meal Type:", mealType);
// Form submission logic
form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  loader.style.display = "inline-block";

  const data = new FormData(form);

  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.text();
    })
    .then(() => {
      alert("Form submitted successfully!");
      form.reset();
      // reset slider UI
      ratingInput.value = 5;
      ratingValueSpan.innerText = "5";
      ratingTextDiv.innerText = "Good";
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
