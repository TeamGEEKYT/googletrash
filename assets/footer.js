const copyright = `<br>
&copy; Google Trash v26.9.25_BETA1<br>
Team Geek 2026 - Google 2026<br>`

const FOOTERHTML = copyright+`
All Rights Reserved<br>
Google Translate is a trademark deposed by Google Co., and is not affiliated with Team Geek.<br><br>
<a href="tos.html">Terms of Service</a> • <a href="doc.html">Documentation</a><br>
<a href="lang.html?red=index.html">Change Language</a> • <a href="https://github.com/TeamGEEKYT/googletrash">Source code</a><br>
`

const FOOTERFR = copyright+`
Tous Droits Réservés<br>
Google Traduction est une marque déposée par Google Co., et n'est pas affiliée avec Team Geek.<br><br>
<a href="tos.html">Conditions Générales d'Utilisations</a> • <a href="doc.html">Documentation</a><br>
<a href="lang.html?red=index.html">Changer de langue</a> • <a href="https://github.com/TeamGEEKYT/googletrash">Code source</a><br>
`

const FOOTERP = document.createElement("p")
FOOTERP.innerHTML = FOOTERHTML

const FOOTER_LANG = localStorage.getItem("googletrash.lang")

if (FOOTER_LANG==="fr") {
    FOOTERP.innerHTML = FOOTERFR
}

document.querySelector("footer").appendChild(FOOTERP)