// I made spaghetti code code... Please don't mind it

(function() {
let online = true
let multisessions = false
let isTranslating = false
const thanksToUser = localStorage.getItem("googletrash.lang")

function returnLocalization(en, fr) {
    if (thanksToUser==="fr") {
        return fr
    } else {
        return en
    }
}

const TEMP_isSpecialMessageOrSomething = false
if (localStorage.getItem("googletrash.userform")!=1 && TEMP_isSpecialMessageOrSomething) {
    // document.getElementById("user_form").style.display = null
    document.getElementById("googleformsbtn").addEventListener("click", function() {
        window.open("https://forms.gle/AqYdPySJtC993qdW7")
        document.getElementById("user_form").style.display = "none"
        localStorage.setItem("googletrash.userform", 1)
    })
} else {
    document.getElementById("user_form").remove()
}

// TRANSLATE FUNCTION
async function translateText(text, targetLang, forceTranslation=false) {
    if (!navigator.onLine) {
        online = false;
        return {success: true, text: text, didnotchanged: true, reason: "-"}
    }
    if (multisessions) {return {success: false}}
    //console.log(targetLang)
    if (isTranslating) {return {success: true, text: text, didnotchanged: true, reason: "A translation is already going!"}}
    isTranslating = true
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    
    try {
        const response = await fetch(url);
        
        isTranslating = false

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
                
        const data = await response.json();
        
        if (!data || !data[0] || !data[0][0] || !data[0][0][0]) {
            throw new Error('Invalid!');
        }
        
        const translated = data[0][0][0]

        console.log(`
            === DEBUG STATS ===

            TEXT: ${text}
            TRANSLATION: ${translated}

            ORIGINAL LENGTH: ${transSettings.text.length}
            CURRENT LENGHT: ${translated.length}
            ACCURACY: ${translated.length/transSettings.text.length*100}%

            LANGUAGE: ${targetLang}
        `)

        if (!forceTranslation) {
            if (transSettings.allowaccuracy) {
                if (translationsLeft!=1) {
                    if (translated.length/transSettings.text.length<=transSettings.minaccuracy/100) {
                        translationsLeft += 1
                        return {
                            success: true,
                            text: text,
                            didnotchanged: true,
                            reason: returnLocalization("Not accurate engouth", "Pas assez précis")+" ("+Math.round(translated.length/transSettings.text.length*100)+"%)"
                        };
                    }
                }
            }

            if (translated.lenght>5000) {
                translationsLeft += 1
                return {
                    success: true,
                    text: text,
                    didnotchanged: true,
                    reason: returnLocalization("Translation too long", "Traduction trop longue")
                };
            }
        }

        return {
            success: true,
            text: translated,
            didnotchanged: false
        };
    } catch (error) {
        isTranslating = false
        return {
            success: false,
            text: text,
            error: error.message,
            didnotchanged: true
        };
    }
}

// Translation Settings Set By User
let transSettings = {
    "text": "",
    "amount": 5,
    "finalLang": "en",

    "allowaccuracy": false,
    "minaccuracy": 50,

    "nodangerouslanguages": false
}

// Some mid-translation variables
let translationsLeft = 0
let currentText = ""
let failCombo = 0

// All available languages
const languages = [
    'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs',
    'bg', 'ca', 'ceb', 'zh-CN', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl',
    'en', 'eo', 'et', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el',
    'gu', 'ht', 'ha', 'haw', 'he', 'hi', 'hmn', 'hu', 'is', 'ig',
    'id', 'ga', 'it', 'ja', 'jv', 'kn', 'kk', 'km', 'rw', 'ko',
    'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms',
    'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'ny', 'or',
    'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr',
    'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw',
    'sv', 'tl', 'tg', 'ta', 'tt', 'te', 'th', 'tr', 'tk', 'uk',
    'ur', 'ug', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu'
];

// All "Dangerous" Languages (high chance of Error 400 if long text)
const dangerousLanguages = [
    "hy", "ml", "ky", "si", "yi", "gu", "kn", "mr", "ur", "tg", "am",
    "te", "sd", "ne", "tt", "ka", "uk", "bg", "ps", "fa", "lo", "pa",
    "bn", "ru", "ja", "ta", "km", "be", "ug", "or", "ko", "my", "ar",
    "kk", "mk", "hi", "mn"
]

function statusUpdate(en, fr) {
    if (thanksToUser==="fr") {
        document.getElementById("status").innerText = "Statut: "+fr
        if (translationsLeft != 0) {
            document.getElementById("status").innerText += " ("+translationsLeft+" traduction(s) restante(s) / "
            if (translationsLeft>=8) {
                document.getElementById("status").innerText += "~"+Math.round(translationsLeft/8)+" minute(s) restantes)"
            } else {
                document.getElementById("status").innerText += "~"+translationsLeft*7.5+" secondes restantes)"
            }
        }
    } else {
        document.getElementById("status").innerText = "Status: "+en
        if (translationsLeft != 0) {
            document.getElementById("status").innerText += " ("+translationsLeft+" translation(s) left / "
            if (translationsLeft>=8) {
                document.getElementById("status").innerText += "~"+Math.round(translationsLeft/8)+" minute(s) left)"
            } else {
                document.getElementById("status").innerText += "~"+translationsLeft*7.5+" seconds left)"
            }
        }
    }
}

// Get a Random Language
function getRandomLanguage(exclude = []) {
    const availableLanguages = languages.filter(lang => !exclude.includes(lang));
    return availableLanguages[Math.floor(Math.random() * availableLanguages.length)];
}

// Settings Update
function updateSettings() {
    transSettings.text = document.getElementById("inputbar").value

    document.getElementById("inputbar_counter").innerHTML = transSettings.text.length+returnLocalization("/5000 characters", "/5000 caractères")

    if (transSettings.text.length>5000) {
        document.getElementById("inputbar_counter").innerHTML = "<span style='color: #f00'>" + document.getElementById("inputbar_counter").innerHTML + "</span><br>"+returnLocalization("This text is too long and Google servers may refuse it.", "Ce texte est trop long et les serveurs de Google pourraient le refuser")
    } else if (transSettings.text.length>100) {
        document.getElementById("inputbar_counter").innerHTML = "<span style='color: #f80'>" + document.getElementById("inputbar_counter").innerHTML + "</span><br>"+returnLocalization("Long texts may result in an HTTP Error 400 from Google Servers", "Des textes longs pourraient donner une erreur HTTP 400 des serveurs de Google")
    }

    transSettings.amount = document.getElementById("iterations").value
    transSettings.finalLang = document.getElementById("outputLanguage").value

    transSettings.allowaccuracy = document.getElementById("allowaccuracy").checked
    transSettings.nodangerouslanguages = document.getElementById("nodangerouslanguages").checked

    if (transSettings.allowaccuracy===true) {
        document.getElementById("minaccuracy_TXT").style.display = null
        document.getElementById("minaccuracy").style.display = null

        transSettings.minaccuracy = document.getElementById("minaccuracy").value
        document.getElementById("minaccuracy_TXT").innerHTML = returnLocalization("Min. Accuracy ("+transSettings.minaccuracy+"%)", "Précision Min. ("+transSettings.minaccuracy+"%)")+" <a href='doc.html#minaccuracy'>?</a>"
    } else {
        document.getElementById("minaccuracy_TXT").style.display = "none"
        document.getElementById("minaccuracy").style.display = "none"
    }

    if (transSettings.amount<=1) {document.getElementById("iterations").value=2; transSettings.amount=2}
    if (transSettings.amount>500) {document.getElementById("iterations").value=500; transSettings.amount=500}

    try {
        transSettings.amount = Math.pow(transSettings.amount, 1)
    } catch {
        transSettings.amount = 2
        document.getElementById("iterations").value=2
    }

    let temp_56_duration = transSettings.amount*7.5
    let temp_56_type = returnLocalization("seconds", "secondes")

    if (temp_56_duration >= 60) {
        temp_56_duration /= 60
        temp_56_type = returnLocalization("minutes", "minutes")
    }

    document.getElementById("duration_iterations").innerText = returnLocalization("Duration: Around ", "Durée: Environ ") + Math.round(temp_56_duration) + " " + temp_56_type
}

// Disable values
const allValues = [
    "inputbar",
    "iterations",
    "allowaccuracy",
    "minaccuracy",
    "googletrashit",
    "outputLanguage",
    "importoutputasinput",
    "copy",
    "nodangerouslanguages"
]

function disableValuesInput(enable) {
    let i = 0
    while (i<allValues.length) {
        document.getElementById(allValues[i]).disabled = enable
        i+=1
    }
}

// Translation Iterations
async function translationIteration() {
    if (isTranslating) {return}
    if (!online) {
        translationsLeft = 0
        statusUpdate(
            "You do not have an Internet Connection. Please refresh the page to continue using Google Trash. This has been made to prevent accidental DDOS attacks.",
            "Vous n'avez pas de Connexion à Internet. Merci de rafraîchir la page pour continuer à utiliser Google Trash. Ceci a été réalisé pour éviter une attaque DDOS accidentelle."
        )
        return
    }
    if (multisessions) {
        translationsLeft = 0
        statusUpdate(
            "Another session has been opened on this device. Please refresh the page, or use the other session.",
            "Une autre session a été ouverte sur cet appareil. Merci de rafraîchir la page, ou d'utiliser l'autre session."
        )
        return
    }
    if (translationsLeft <= 0) {
        return
    }

    let forceTrans = false
    if (failCombo==5) {forceTrans = true}

    if (translationsLeft!=1) {
        if (transSettings.nodangerouslanguages) {
            currentText = await (translateText(currentText, getRandomLanguage(dangerousLanguages), forceTrans))
        } else {
            currentText = await (translateText(currentText, getRandomLanguage(), forceTrans))
        }
        
    } else {
        currentText = await (translateText(currentText, transSettings.finalLang, forceTrans))
    }

    if (!currentText.success) {
        statusUpdate("ERROR!", "ERREUR!")
        translationsLeft = 1
        //return false
    }

    translationsLeft -= 1
    document.querySelector("progress").value = transSettings.amount-translationsLeft
    
    statusUpdate("Google Trashing...", "En train de Google Trasher...")

    if (currentText.didnotchanged) {
        failCombo += 1
        document.getElementById("status").innerText = document.getElementById("status").innerText+" - "+currentText.reason+". "+returnLocalization("Retranslating to another language", "Retraduction dans une autre langue")+"... ("+failCombo+"/5)"
    } else {
        failCombo = 0
    }

    const transSuccess = currentText.success
    currentText = currentText.text

    if (translationsLeft == 0) {
        document.querySelector("progress").style.display = "none"
        if (transSuccess) {statusUpdate("Success!", "Succès!")} else {statusUpdate("Error!", "Erreur!")}
        document.getElementById("output").value = currentText
        disableValuesInput(false)
    }
}

// GOOGLE TRASH IT!
document.getElementById("googletrashit").addEventListener("click", function() {
    if (translationsLeft!=0) {console.log("Couldn't start!"); return}

    if (transSettings.text.length==0) {document.getElementById("status").innerText = "Status: Cannot Google Trash Nothing!"; return}

    if (transSettings.text.length > 5000) {
        statusUpdate("Cannot Google Trash +5000 characters! ("+transSettings.text.length+")", "Ne peut pas Google Trasher plus de 5000 caractères! ("+transSettings.text.length+")")
        return
    }

    if (transSettings.amount<=1||transSettings.amount>500) {
        statusUpdate("Too much/Not Enough iterations (has to be between 2 and 500 included)!", "Trop/Pas assez d'itérations (doit être entre 2 et 500 inclus)!")
        return
    }

    document.querySelector("progress").value = 0
    document.querySelector("progress").max = transSettings.amount
    document.querySelector("progress").style.display = null;

    translationsLeft = Math.pow(transSettings.amount, 1)
    statusUpdate("Google Trashing...", "En train de Google Trasher...")
    document.getElementById("output").value = returnLocalization("[GOOGLE TRASHING]", "[EN TRAIN DE GOOGLE TRASHER]")
    currentText = transSettings.text

    disableValuesInput(true)
})

document.getElementById("importoutputasinput").addEventListener("click", function() {
    document.getElementById("inputbar").value = document.getElementById("output").value
    updateSettings()
})

document.getElementById("copy").addEventListener("click", function() {
    let afterCopyConfirm = document.getElementById("copy").innerText
    try {
        navigator.clipboard.writeText(document.getElementById("output").value);
        document.getElementById("copy").innerText = "✅"
    } catch {
        document.getElementById("copy").innerText = "❌"
    }
    
    setTimeout(function() {document.getElementById("copy").innerText = afterCopyConfirm}, 5000)
})

let sentences___ = false

function loop_input() {
    if (sentences___) {return}

    sentences___ = true

    document.getElementById("inputbar").placeholder = ""

    const sentences_examples = {
        "en": [
            "My dog is eating my homework.",
            "I won a game of hide-and-seek!",
            "Google Trash just makes trash.",
            "I love cats.",
            "A normal day in France."
        ],
        "fr": [
            "Mon chien est en train de manger mes devoirs.",
            "J'ai gagné une partie de cache-cache!",
            "Google Trash fait juste du désordre.",
            "J'aime les chats.",
            "Un jour normal en France."
        ]
    }

    let selectedSentence = ""
    const selectedSentenceIndex = Math.floor(Math.random()*sentences_examples.en.length)
    if (thanksToUser==="fr") {
        selectedSentence = sentences_examples.fr[selectedSentenceIndex]
    } else {
        selectedSentence = sentences_examples.en[selectedSentenceIndex]
    }

    let selectedSentenceCharacterIndex = 0
    let selectedSentenceInt = setInterval(function() {
        document.getElementById("inputbar").placeholder += selectedSentence[selectedSentenceCharacterIndex]
        selectedSentenceCharacterIndex += 1
        if (selectedSentenceCharacterIndex==selectedSentence.length) {
            clearInterval(selectedSentenceInt)
            sentences___ = false
        }
    }, 25)
}

function setupSetting(id, type) {
    if (!id) {return}
    if (!type) {return}
    const el = document.getElementById(id)
    if (!el) {return}

    if (type==1) {
        el.addEventListener("keydown", function() {
            setTimeout(function() {updateSettings()}, 25)
        })
        el.addEventListener("change", function() {
            setTimeout(function() {updateSettings()}, 25)
        })
        el.addEventListener("input", function() {
            setTimeout(function() {updateSettings()}, 25)
        })
        return true
    } else if (type==2) {
        el.addEventListener("click", function() {
            updateSettings()
        })
        return true
    } else if (type==3) {
        el.addEventListener("change", function() {
            updateSettings()
        })
    } else {return}
}

setupSetting("inputbar", 1)
setupSetting("minaccuracy", 3)
setupSetting("allowaccuracy", 3)
setupSetting("outputLanguage", 3)
setupSetting("iterations", 3)

loop_input()
setInterval(loop_input, 3000)
setInterval(translationIteration, 7500)
updateSettings()

const itemLS = "teamgeek.googletrash.sessionid"
const currentSessionID = String(Math.floor(Math.random()*999999999))
localStorage.setItem(itemLS, currentSessionID)

let mscheck____ = setInterval(function() {
    // console.log("checking: "+currentSessionID+" - "+localStorage.getItem(itemLS))
    if (localStorage.getItem(itemLS)!==currentSessionID) {
        translationsLeft = 0
        statusUpdate(
            "Another session has been opened on this device. Please refresh the page, or use the other session.",
            "Une autre session a été ouverte sur cet appareil. Merci de rafraîchir la page, ou d'utiliser l'autre session."
        )
        multisessions = true
        clearInterval(mscheck____)
    }
}, 50)

})()