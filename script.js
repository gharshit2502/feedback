const url = "https://script.google.com/macros/s/AKfycbx25PE7PoVpkJL16_qy-nmKK1QqQgejAVL6MWJp1s4bGs3c4_3wCdgrmqmhZLbgrzNGew/exec";
const form = document.getElementById("form");
const submitBtn = document.getElementById("submitBtn");
const loader = document.getElementById("loader");

// Slider live‑update logic
const ratingInput = document.getElementById("rating");
const ratingTextSpan = document.getElementById("ratingText");

ratingInput.addEventListener("input", () => {
  const val = +ratingInput.value;
  ratingTextSpan.innerText = val;
});

// Form submission logic
form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  loader.style.display = "inline-block";

  const data = new FormData();

  // 1. Satisfaction slider
  data.append("satisfaction", ratingInput.value);

  // 2. Growth suggestion
  const growthSuggestion = form.querySelector('textarea[name="growth_suggestion"]');
  data.append("growth_suggestion", growthSuggestion?.value || "");

  // 3. Opportunities checkboxes
  const selectedOpportunities = [];
  form.querySelectorAll('input[name="opportunities[]"]:checked')
      .forEach(cb => selectedOpportunities.push(cb.value));
  data.append("opportunities", selectedOpportunities.join(", "));

  // 4. Work-life balance
  const workLifeRadio = form.querySelector('input[name="work_life_balance"]:checked');
  data.append("work_life_balance", workLifeRadio?.value || "");

  // 5. Work culture
  const workCultureRadio = form.querySelector('input[name="work_culture"]:checked');
  data.append("work_culture", workCultureRadio?.value || "");

  // 6. Likes
  const likesInput = form.querySelector('input[name="like"]');
  data.append("like", likesInput?.value || "");

  // 7. Dislikes
  const dislikesInput = form.querySelector('input[name="dislike"]');
  data.append("dislike", dislikesInput?.value || "");

  // 8. Final feedback
  const feedbackText = form.querySelector('textarea[name="feedback"]');
  data.append("feedback", feedbackText?.value || "");

  // Submit data to Google Apps Script
  fetch(url, {
    method: "POST",
    // mode: "no-cors",
    body: data,
  })
    .then(() => {
      alert("Form submitted successfully!");
      form.reset();
      // Reset slider display
      ratingInput.value = 5;
      ratingTextSpan.innerText = "5";
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
