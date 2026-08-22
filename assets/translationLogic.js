let online = true

if (localStorage.getItem("googletrash.tosaccepted")<1787404727572) {
    window.location.href = "index.html?tos=1"
}

// TRANSLATE FUNCTION
async function translateText(text, targetLang) {
    if (!navigator.onLine) {
        online = false;
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    
    try {
        const response = await fetch(url);
        console.log(targetLang)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
                
        const data = await response.json();
        
        if (!data || !data[0] || !data[0][0] || !data[0][0][0]) {
            throw new Error('Invalid!');
        }
        
        const translated = data[0][0][0]

        if (transSettings.allowaccuracy) { if (translationsLeft!=1) {
        if (translated.length/text.length<=transSettings.minaccuracy/100) {
            translationsLeft += 1
            return {
                success: true,
                text: text,
                didnotchanged: true,
                reason: "Not accurate enough ("+Math.round(translated.length/text.length*100)+"%)"
            };
        }}}

        if (translated.lenght>5000) {
            translationsLeft += 1
            return {
                success: true,
                text: text,
                didnotchanged: true,
                reason: "Translation too long"
            };
        }

        return {
            success: true,
            text: translated,
            didnotchanged: false
        };
    } catch (error) {
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
    "finalLang": "fr-FR",

    "allowaccuracy": false,
    "minaccuracy": 50
}

// Some mid-translation variables
let translationsLeft = 0
let currentText = ""

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

// All language names
const languageNames = {
    'af': 'Afrikaans', 'sq': 'Albanais', 'am': 'Amharique', 'ar': 'Arabe', 'hy': 'Arménien',
    'az': 'Azéri', 'eu': 'Basque', 'be': 'Biélorusse', 'bn': 'Bengali', 'bs': 'Bosnien',
    'bg': 'Bulgare', 'ca': 'Catalan', 'ceb': 'Cebuano', 'zh-CN': 'Chinois (Simplifié)', 'zh-TW': 'Chinois (Traditionnel)',
    'co': 'Corse', 'hr': 'Croate', 'cs': 'Tchèque', 'da': 'Danois', 'nl': 'Néerlandais',
    'en': 'Anglais', 'eo': 'Espéranto', 'et': 'Estonien', 'fi': 'Finnois', 'fr': 'Français',
    'fy': 'Frison', 'gl': 'Galicien', 'ka': 'Géorgien', 'de': 'Allemand', 'el': 'Grec',
    'gu': 'Gujarati', 'ht': 'Créole haïtien', 'ha': 'Haoussa', 'haw': 'Hawaïen', 'he': 'Hébreu',
    'hi': 'Hindi', 'hmn': 'Hmong', 'hu': 'Hongrois', 'is': 'Islandais', 'ig': 'Igbo',
    'id': 'Indonésien', 'ga': 'Irlandais', 'it': 'Italien', 'ja': 'Japonais', 'jv': 'Javanais',
    'kn': 'Kannada', 'kk': 'Kazakh', 'km': 'Khmer', 'rw': 'Kinyarwanda', 'ko': 'Coréen',
    'ku': 'Kurde', 'ky': 'Kirghize', 'lo': 'Lao', 'la': 'Latin', 'lv': 'Letton',
    'lt': 'Lituanien', 'lb': 'Luxembourgeois', 'mk': 'Macédonien', 'mg': 'Malgache', 'ms': 'Malais',
    'ml': 'Malayalam', 'mt': 'Maltais', 'mi': 'Maori', 'mr': 'Marathi', 'mn': 'Mongol',
    'my': 'Birman', 'ne': 'Népalais', 'no': 'Norvégien', 'ny': 'Chichewa', 'or': 'Odia',
    'ps': 'Pashto', 'fa': 'Persan', 'pl': 'Polonais', 'pt': 'Portugais', 'pa': 'Punjabi',
    'ro': 'Roumain', 'ru': 'Russe', 'sm': 'Samoan', 'gd': 'Gaélique écossais', 'sr': 'Serbe',
    'st': 'Sesotho', 'sn': 'Shona', 'sd': 'Sindhi', 'si': 'Cinghalais', 'sk': 'Slovaque',
    'sl': 'Slovène', 'so': 'Somali', 'es': 'Espagnol', 'su': 'Soundanais', 'sw': 'Swahili',
    'sv': 'Suédois', 'tl': 'Tagalog', 'tg': 'Tadjik', 'ta': 'Tamoul', 'tt': 'Tatar',
    'te': 'Télougou', 'th': 'Thaï', 'tr': 'Turc', 'tk': 'Turkmène', 'uk': 'Ukrainien',
    'ur': 'Ourdou', 'ug': 'Ouïghour', 'uz': 'Ouzbek', 'vi': 'Vietnamien', 'cy': 'Gallois',
    'xh': 'Xhosa', 'yi': 'Yiddish', 'yo': 'Yoruba', 'zu': 'Zoulou'
};

const thanksToUser = localStorage.getItem("googletrash.lang")

function statusUpdate(en, fr) {
    if (thanksToUser==="fr") {
        document.getElementById("status").innerText = "Statut: "+fr
        if (translationsLeft != 0) {
            document.getElementById("status").innerText += " ("+translationsLeft+" traductions restantes / ~"+translationsLeft*7.5+" secondes restantes)"
        }
    } else {
        document.getElementById("status").innerText = "Status: "+en
        if (translationsLeft != 0) {
            document.getElementById("status").innerText += " ("+translationsLeft+" translations left / ~"+translationsLeft*7.5+" seconds left)"
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
    transSettings.amount = document.getElementById("iterations").value
    transSettings.finalLang = document.getElementById("outputLanguage").value

    transSettings.allowaccuracy = document.getElementById("allowaccuracy").checked

    if (transSettings.allowaccuracy===true) {
        document.getElementById("minaccuracy_TXT").style.display = null
        document.getElementById("minaccuracy").style.display = null

        transSettings.minaccuracy = document.getElementById("minaccuracy").value
        document.getElementById("minaccuracy_TXT").innerHTML = "Min. Accuracy ("+transSettings.minaccuracy+"%) <a href='doc.html#minaccuracy'>?</a>"
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
    "copy"
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
    if (!online) {
        translationsLeft = 0
        statusUpdate(
            "You do not have an Internet Connection. Please refresh the page to continue using Google Trash. This has been made to prevent accidental DDOS attacks.",
            "Vous n'avez pas de Connexion à Internet. Merci de rafraîchir la page pour continuer à utiliser Google Trash. Ceci a été réalisé pour éviter une attaque DDOS accidentelle."
        )
        return
    }
    if (translationsLeft <= 0) {
        return
    }

    if (translationsLeft!=1) {
        currentText = await (translateText(currentText, getRandomLanguage()))
    } else {
        currentText = await (translateText(currentText, transSettings.finalLang))
    }

    if (!currentText.success) {
        statusUpdate("ERROR!", "ERREUR!")
        currentText = transSettings.text
        translationsLeft += 1
        return false
    }

    translationsLeft -= 1
    document.querySelector("progress").value = transSettings.amount-translationsLeft
    
    statusUpdate("Google Trashing...", "En train de Google Trasher...")

    if (currentText.didnotchanged) {
        document.getElementById("status").innerText = document.getElementById("status").innerText+" - "+currentText.reason+". Retranslating to another language..."
    }

    currentText = currentText.text

    if (translationsLeft == 0) {
        document.querySelector("progress").style.display = "none"
        statusUpdate("Success!", "Succès!")
        document.getElementById("output").value = currentText
        disableValuesInput(false)
    }
}

// GOOGLE TRASH IT!
document.getElementById("googletrashit").addEventListener("click", function() {
    if (translationsLeft!=0) {console.log("Couldn't start!"); return}

    document.getElementById("copy").innerText = "Copy Output"

    if (transSettings.text.length==0) {document.getElementById("status").innerText = "Status: Cannot Google Trash Nothing!"; return}

    if (transSettings.text.length > 5000) {
        statusUpdate("Cannot Google Trash +5000 characters! ("+transSettings.text.length+")", "Ne peut pas Google Trasher plus de 5000 caractères!Cannot Google Trash +5000 characters! ("+transSettings.text.length+")")
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
    document.getElementById("output").value = "[GOOGLE TRASHING]"
    currentText = transSettings.text.replaceAll("\n", " ").replaceAll("/", "[SLASH]")

    disableValuesInput(true)
})

document.getElementById("importoutputasinput").addEventListener("click", function() {
    document.getElementById("inputbar").value = document.getElementById("output").value
    updateSettings()
})

document.getElementById("copy").addEventListener("click", function() {
    try {
        navigator.clipboard.writeText(document.getElementById("output").value);
        document.getElementById("copy").innerText = "✅"
    } catch {
        document.getElementById("copy").innerText = "❌"
    }
})

setInterval(translationIteration, 7500)
updateSettings()