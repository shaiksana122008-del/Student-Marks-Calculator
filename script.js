const form = document.getElementById("marksForm");
const results = document.getElementById("results");

const subjectIds = ["maths", "science", "english", "social", "computer"];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const studentName = document.getElementById("studentName").value.trim();
  const marks = subjectIds.map((id) => Number(document.getElementById(id).value));

  if (!studentName) {
    alert("Please enter the student's name.");
    return;
  }

  const invalidMarks = marks.some((mark, index) => {
    const input = document.getElementById(subjectIds[index]);
    return input.value === "" || !Number.isFinite(mark) || mark < 0 || mark > 100;
  });

  if (invalidMarks) {
    alert("Please enter marks between 0 and 100 for every subject.");
    return;
  }

  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const average = total / marks.length;
  const percentage = (total / 500) * 100;

  let grade;
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B";
  else if (percentage >= 60) grade = "C";
  else if (percentage >= 50) grade = "D";
  else grade = "F";

  // A student must score at least 35 in every subject to pass.
  const passed = marks.every((mark) => mark >= 35);

  document.getElementById("resultName").textContent = `Student: ${studentName}`;
  document.getElementById("total").textContent = `${total} / 500`;
  document.getElementById("average").textContent = average.toFixed(2);
  document.getElementById("percentage").textContent = `${percentage.toFixed(2)}%`;
  document.getElementById("grade").textContent = grade;

  const status = document.getElementById("status");
  status.textContent = passed ? "Result: PASS" : "Result: FAIL (below 35 in one or more subjects)";
  status.classList.toggle("fail", !passed);

  results.hidden = false;
  results.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
