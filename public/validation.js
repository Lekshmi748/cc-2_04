function validateEmail(e) {
    let email = document.getElementById("email").value;
    let regexp = /^([^_.-][A-Za-z0-9_.-]+)@([A-Za-z0-9-]+)\.([a-z]{2,3})(.[a-z]{2,3})?$/

    if (email.trim() == "" || !regexp.test(email.trim())) {
        e.preventDefault();
        window.alert("Invalid email.");
        return false;
    }
    else
        return true;
}