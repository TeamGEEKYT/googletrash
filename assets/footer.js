const FOOTERHTML = `<br>
&copy; Team Geek 2026 - Google 2026<br>
All Rights Reserved<br>
Google Translate is a trademark deposed by Google Co., and is not affiliated with Team Geek.<br><br>
<a href="tos.html">Terms of Service</a><br>
`

const FOOTERP = document.createElement("p")
FOOTERP.innerHTML = FOOTERHTML

document.querySelector("footer").appendChild(FOOTERP)