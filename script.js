function openLetter() {
  document.getElementById("landing").style.display = "none";
  const section = document.getElementById("letterSection");
  section.classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("introText").innerText =
      "I didn’t know how to say this out loud.";
  }, 1000);
}