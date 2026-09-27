const userLang = localStorage.getItem("googletrash.lang")

if (!userLang && !window.location.href.includes("lang.html")) {
    localStorage.setItem("googletrash.lang", "en")
    window.location.href = "/googletrash/lang.html?red="+encodeURIComponent(window.location.href)
}

if (window.location.href.includes("lang.html")) {
    let redirectURL = new URLSearchParams(window.location.search).get("red")
    if (!redirectURL) {
        document.getElementById("accessWebsite").style.display = "none";
        alert("No redirection link has been set!")
    }

    document.getElementById("selectedLang_"+userLang).selected = true

    document.getElementById("selectedLang").addEventListener("change", function() {
        localStorage.setItem("googletrash.lang", this.value)
        window.location.href = window.location.href
    })
    
    document.getElementById("accessWebsite").addEventListener("click", function() {
        window.location.href = redirectURL
    })
}

const allElements = document.querySelectorAll("*");
let localization_index = 0;

if (userLang==="fr") {
    document.querySelectorAll('[data-frloc]')
    .forEach(el => {
        el.innerHTML = el.dataset.frloc;
    });
} else if (userLang!=="en") {
    userLang = "en"
}