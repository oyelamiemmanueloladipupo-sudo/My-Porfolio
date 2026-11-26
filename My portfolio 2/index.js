var typed =  new Typed(".text", {
    strings:["frontend Developer" , "backend Developer" , "web Developer"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop: true
});

// CONTACT FORM JAVASCRIPT

const contactForm = document.querySelector(".contact-form form");

contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form information
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-course").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    // Check required fields
    if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
    }

    // Prepare email information
    const formData = {
        name: name,
        email: email,
        subject: subject || "New Portfolio Message",
        message: message
    };

    const sendButton = contactForm.querySelector(".send");

    sendButton.disabled = true;
    sendButton.textContent = "Sending...";

    try {
        // Send information to your email
        const response = await fetch(
            "https://formsubmit.co/ajax/jacknicolas293@gmail.com",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    _subject: "New Message From Your Portfolio",
                    _template: "table"
                })
            }
        );

        const result = await response.json();

        if (response.ok && result.success) {
            alert("Message sent successfully! Thank you for contacting me.");

            contactForm.reset();
        } else {
            throw new Error("Message could not be sent.");
        }

    } catch (error) {
        console.error("Email Error:", error);

        alert("Sorry, your message could not be sent. Please try again.");
    } finally {
        sendButton.disabled = false;
        sendButton.textContent = "Send Message";
    }
});