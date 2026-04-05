const card = document.getElementById("card");
const envelope = document.getElementById("envelope");
const letter = envelope.querySelector(".letter");
const btnOpen = document.getElementById("open");
const btnReset = document.getElementById("reset");

let flipped = false;
let animationTimeouts = [];

// Utility: clear any pending timeouts
function clearAnimations() {
    animationTimeouts.forEach(t => clearTimeout(t));
    animationTimeouts = [];
}

function openSequence() {
    if (flipped) return;
    flipped = true;

    clearAnimations();

    // 1. Flip card
    card.classList.add("flipped");

    // 2. Open envelope after card flip
    animationTimeouts.push(
        setTimeout(() => {
            envelope.classList.add("open");
            envelope.classList.remove("close");

            // 3. Wait for flap to finish (0.4s) before pulling letter up
            animationTimeouts.push(
                setTimeout(() => {
                    letter.classList.add("pull-up");

                    // 4. Move letter to center after pull-up completes (0.6s)
                    animationTimeouts.push(
                        setTimeout(() => {
                            letter.classList.remove("pull-up");
                            letter.classList.add("centered-letter");

                            // 5. Zoom after centering (0.6s)
                            animationTimeouts.push(
                                setTimeout(() => {
                                    letter.classList.add("zoomed");

                                    // 6. Show overlay image after zoom (0.2s)
                                    animationTimeouts.push(
                                        setTimeout(() => {
                                            const letterImg = letter.querySelector(".letter-image");
                                            if (letterImg){
                                               letterImg.style.display = "block";
                                               requestAnimationFrame(()=>{
                                                letterImg.scrollTop = 0;
                                               })
                                            }
                                        }, 200)
                                    );

                                }, 600) // wait for centering
                            );

                        }, 600) // pull-up duration
                    );

                }, 400) // flap open duration
            );

        }, 800) // card flip duration
    );
}

function resetAll() {
    clearAnimations();

    // Remove all letter animation classes
    letter.classList.remove("pull-up", "centered-letter", "zoomed");

    // Hide image overlay and reset scroll position
    const letterImg = letter.querySelector(".letter-image");
    if (letterImg) {
        letterImg.style.display = "none";
        letterImg.scrollTop = 0; // <-- reset scroll to top
    }

    // Close envelope
    envelope.classList.add("close");
    envelope.classList.remove("open");

    // Reset card flip after envelope closes
    setTimeout(() => {
        card.classList.remove("flipped");
        flipped = false;
    }, 400);
}

// Event listeners
card.addEventListener("click", openSequence);
btnOpen.addEventListener("click", openSequence);
btnReset.addEventListener("click", resetAll);