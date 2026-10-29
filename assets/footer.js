if (localStorage.getItem("googletrash.tosaccepted")<1790400628256 && !navigator.webdriver) {
    if (window.location.href !== window.location.origin+"/googletrash/index.html?tos=1" && window.location.href !== window.location.origin+"/googletrash/tos.html" && !window.location.href.includes(window.location.origin+"/googletrash/lang.html")) {
        window.location.href = "index.html?tos=1"
    }
}

if (!localStorage.getItem("teamgeek.googletrash.firstusage")) {
    localStorage.setItem("teamgeek.googletrash.firstusage", Date.now())
}

const copyright = `<br>
&copy; Google Trash v26.10.26_BETA1<br>
Team Geek 2026 - Google 2026<br>`

const FOOTERHTML = copyright+`
All Rights Reserved<br>
Google Translate is a trademark deposed by Google Co., and is not affiliated with Team Geek.<br><br>
<a href="tos.html">Terms of Service</a> • <a href="doc.html">Documentation</a><br>
<a href="settings.html">Settings</a> • <a target="_blank" href="https://github.com/TeamGEEKYT/googletrash">Source code</a><br>
`

const FOOTERFR = copyright+`
Tous Droits Réservés<br>
Google Traduction est une marque déposée par Google Co., et n'est pas affiliée avec Team Geek.<br><br>
<a href="tos.html">Conditions Générales d'Utilisations</a> • <a href="doc.html">Documentation</a><br>
<a href="settings.html">Paramètres</a> • <a target="_blank" href="https://github.com/TeamGEEKYT/googletrash">Code source</a><br>
`

const FOOTERP = document.createElement("p")
FOOTERP.innerHTML = FOOTERHTML

const FOOTER_LANG = localStorage.getItem("googletrash.lang")

if (FOOTER_LANG==="fr") {
    FOOTERP.innerHTML = FOOTERFR
}

document.querySelector("footer").appendChild(FOOTERP)