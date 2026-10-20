(function() {
    const thanksToUser = localStorage.getItem("googletrash.lang")

    function returnLocalization(en, fr) {
        if (thanksToUser==="fr") {
            return fr
        } else {
            return en
        }
    }

    let unlockedStyles = localStorage.getItem("teamgeek.googletrash.unlockedstyles") || ["default", "light", "dark"]
    let currentStyle = localStorage.getItem("teamgeek.googletrash.style") || "default"

    try {
        unlockedStyles = JSON.parse(unlockedStyles)
    } catch {
        unlockedStyles = ["default", "light", "dark"]
    }

    function isStyleObtained(style) {
        const TEMP_index_787 = unlockedStyles.findIndex(aa => aa === style)
        return TEMP_index_787 != -1
    }

    function saveStyles() {
        localStorage.setItem("teamgeek.googletrash.unlockedstyles", JSON.stringify(unlockedStyles))
        localStorage.setItem("teamgeek.googletrash.style", currentStyle)
    }

    function unlockStyle(style) {
        if (isStyleObtained(style)) {return false}
        unlockedStyles.push(style)
        saveStyles()
        return true
    }

    function changeStyle(style) {
        if (!isStyleObtained(style)) {
            returndocument.getElementById("stylesheet").href = "assets/styles/default.css";
            return
        }

        document.getElementById("stylesheet").href = "assets/styles/"+style+".css"

        currentStyle = style
        saveStyles()
    }

    if (new Date().getMonth()==9) {
        if (unlockStyle("halloween2026")) {
            alert(
                returnLocalization(
                    "For Halloween, you unlocked a free Halloween 2026 Style for Google Trash! The theme can now be set through settings.\nThanks for using Google Trash!",
                    "Pour Halloween, vous avez débloqué un style Halloween 2026 gratuit pour Google Trash! Le thème est applicable depuis les paramètres.\nMerci pour avoir utilisé Google Trash!"
                )
            )
        }
    }

    if (window.location.href.includes("googletrash/settings.html")) {
        //alert("yes")
        document.querySelectorAll("[data-theme]")
        .forEach(el => {
            el.disabled = !isStyleObtained(el.value)
        });
        console.log(document.querySelectorAll("[data-theme]"))

        document.getElementById("themes").addEventListener("change", function() {
            changeStyle(this.value)
        })
        document.getElementById("themes").value = currentStyle
    }

    changeStyle(currentStyle)
    saveStyles()

    console.log(unlockedStyles)
})()