
// const url = "https://script.google.com/macros/s/AKfycbxaomcqsbjAXuG9H3RDsgPlSq8np3xu4FH8vXR1LrG3cWi2A_936eXKOU5uT_yLAWkKkQ/exec";
// const form = document.querySelector("#form");
// const submitBtn = document.getElementById("submitBtn");
// const loader = document.getElementById("loader");

// // Slider live-update logic >
// const ratingInput     = document.getElementById("rating");
// const ratingValueSpan = document.getElementById("ratingValue");
// const ratingTextDiv   = document.getElementById("ratingText");

// ratingInput.addEventListener("input", () => {
//   const val = +ratingInput.value;
//   ratingValueSpan.innerText = val;
//   const text = (val <= 3)
//     ? "Poor"
//     : (val <= 7)
//       ? "Good"
//       : "Tasty!";
//   ratingTextDiv.innerText = text;
// });
// const mealType = document.querySelector('input[name="mealType"]:checked')?.value;
//   console.log("Selected Meal Type:", mealType);
// // Form submission logic
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   submitBtn.disabled = true;
//   loader.style.display = "inline-block";

//   const data = new FormData(form);

//   fetch(url, {
//     method: "POST",
//     body: data,
//   })
//     .then((res) => {
//       if (!res.ok) throw new Error("Network response was not ok");
//       return res.text();
//     })
//     .then(() => {
//       alert("Form submitted successfully!");
//       form.reset();
//       // reset slider UI
//       ratingInput.value = 5;
//       ratingValueSpan.innerText = "5";
//       ratingTextDiv.innerText = "Good";
//     })
//     .catch((err) => {
//       console.error("Submission error:", err);
//       alert("Error: " + err.message);
//     })
//     .finally(() => {
//       submitBtn.disabled = false;
//       loader.style.display = "none";
//     });
// });



const url = "https://script.google.com/macros/s/AKfycbw9REre2-Hr7oQBKLRZSIxHewWC5pRVSdZYEZUT676ubxBjyz53hMfmmVsROti968iHRw/exec";
const form = document.querySelector("#form");
const submitBtn = document.getElementById("submitBtn");
const loader = document.getElementById("loader");

// Slider live-update logic >
const ratingInput = document.getElementById("rating");
const ratingValueSpan = document.getElementById("ratingValue");
const ratingTextDiv = document.getElementById("ratingText");

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

// Form submission logic
form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  loader.style.display = "inline-block";

  const data = new FormData();

  data.append("satisfaction", ratingInput.value);
  data.append("suggestion", document.getElementById("suggestion").value);
  data.append("likes", document.getElementById("likes").value);
  data.append("dislikes", document.getElementById("dislikes").value);
  data.append("review", document.getElementById("review").value);

  const workLife = form.querySelector('input[name="workLife"]:checked');
  const workCulture = form.querySelector('input[name="workCulture"]:checked');

  if (workLife) data.append("workLife", workLife.value);
  if (workCulture) data.append("workCulture", workCulture.value);

  // Checkboxes (multiple values)
  const opportunities = [];
  form.querySelectorAll('input[name="opportunity"]:checked').forEach((el) => {
    opportunities.push(el.value);
  });
  data.append("opportunities", opportunities.join(", "));

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
