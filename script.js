let Access_code = "1234";

// Load from localStorage
let attempts = localStorage.getItem("attempts") 
    ? parseInt(localStorage.getItem("attempts")) 
    : 3;

let lockTime = localStorage.getItem("lockTime");

function validate() {
    let code = document.getElementById("code").value;
    let message = document.getElementById("message");

    // Check lock
    if (lockTime && Date.now() < lockTime) {
        let remaining = Math.ceil((lockTime - Date.now()) / 1000);
        message.innerText = "🔒 Locked! Try again in " + remaining + " sec";
        message.style.color = "red";
        return;
    }

    // Input validation
    if (!/^\d{4}$/.test(code)) {
        message.innerText = "Enter valid 4-digit code!";
        message.style.color = "orange";
        return;
    }

    if (code === Access_code) {
        message.innerText = "✅ Access Granted!";
        message.style.color = "green";

        // reset
        localStorage.clear();
        attempts = 3;
    } else {
        attempts--;
        localStorage.setItem("attempts", attempts);

        if (attempts > 0) {
            message.innerText = "❌ Wrong code! " + attempts + " attempts left.";
            message.style.color = "orange";
        } else {
            let lockDuration = 30000; // 30 sec
            let unlockTime = Date.now() + lockDuration;

            localStorage.setItem("lockTime", unlockTime);

            message.innerText = "🔒 Too many attempts! Locked for 30 sec.";
            message.style.color = "red";
        }
    }
}

// Show / Hide Password
function togglePassword() {
    let input = document.getElementById("code");
    input.type = input.type === "password" ? "text" : "password";
}