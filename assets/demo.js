(function() {
    const sentences = {
        en: [
                [
                    "I'll eat those cookies later. I want to do something else first.",
                    "ຂ້ອຍຈະກິນ cookies ເຫຼົ່ານັ້ນຕໍ່ມາ.",
                    "אני אוכל את העוגיות האלה אחר כך.",
                    "Ես կուտեմ այս թխվածքաբլիթները հետո:",
                    "Je mangerai ces cookies plus tard.",
                    "O le a ou 'ai nei kuki mulimuli ane.",
                    "Šiuos sausainius valgysiu vėliau.",
                    "Beidh mé ag ithe na fianáin níos déanaí.",
                    "Мин соңрак куки ашармын.",
                    "Do të ha biskota më vonë.",
                    "I'll eat cookies later."
                ]
            ],
        fr: [
                [
                    "Amusons-nous dans ce parc rempli de surprises!",
                    "Sürprizlerle dolu bu parkta eğlenelim!",
                    "Jẹ ká ni fun ni yi o duro si ibikan ti o kún fun awọn iyanilẹnu!",
                    "Mari kita berikan taman yang penuh dengan kejutan!",
                    "Да подариме градина полна со изненадувања!",
                    "ਆਓ ਹੈਰਾਨੀ ਨਾਲ ਭਰਿਆ ਇੱਕ ਬਾਗ਼ ਦੇਈਏ!",
                    "Hãy cho một khu vườn đầy bất ngờ!",
                    "Gadewch i ni roi gardd llawn o bethau annisgwyl!",
                    "Hortum admirationibus plenum demus!",
                    "Sürprizlərlə dolu bir bağçaya sahib olaq!",
                    "Ayons un jardin plein de surprises !"
                ],
                [
                    "Google Trash est une application web développée indépendamment et à but non commercial par Team Geek.",
                    "He tono tukutuku a Google Trash i hangaia motuhake mo nga kaupapa kore-arumoni e Team Geek.",
                    "Google Trash არის ვებ აპლიკაცია, რომელიც შექმნილია ექსკლუზიურად არაკომერციული მიზნებისთვის Team Geek-ის მიერ.",
                    "Inkunkuma kaGoogle sisicelo sewebhu esenzelwe kuphela iinjongo ezingezizo ezentengiso liQela leGeek.",
                    "Mae Google Trash yn gymhwysiad gwe a ddatblygwyd at ddibenion anfasnachol yn unig gan y Tîm Geek.",
                    "د ګوګل ټریش یو ویب اپلیکیشن دی چې یوازې د جیک ټیم لخوا د غیر سوداګریزو موخو لپاره رامینځته شوی.",
                    "Google Trash як барномаи вебест, ки аз ҷониби дастаи geek танҳо бо мақсадҳои ғайритиҷоратӣ таҳия шудааст.",
                    "വാണിജ്യേതര ആവശ്യങ്ങൾക്കായി മാത്രം ഒരു ഗീക്ക് ടീം വികസിപ്പിച്ചെടുത്ത ഒരു വെബ് ആപ്ലിക്കേഷനാണ് Google ട്രാഷ്.",
                    "Google Trash on verkkosovellus, jonka nörttitiimi on kehittänyt vain ei-kaupallisiin tarkoituksiin.",
                    "گوگل ٹریش ایک ویب ایپلیکیشن ہے جسے گیک ٹیم نے صرف غیر تجارتی مقاصد کے لیے تیار کیا ہے۔",
                    "Google Trash est une application Web développée par l'équipe Geek à des fins non commerciales uniquement."
                ]
            ]
    }

    let isTyping = true
    let isTranslating = false
    let translated = false
    const thanksToUser = localStorage.getItem("googletrash.lang")

    let selectedSentence = null

    if (thanksToUser==="fr") {
        let selectedSentenceIndex = Math.floor(Math.random()*sentences.fr.length)
        selectedSentence = sentences.fr[selectedSentenceIndex]
    } else {
        let selectedSentenceIndex = Math.floor(Math.random()*sentences.en.length)
        selectedSentence = sentences.en[selectedSentenceIndex]
    }

    document.getElementById("sentence_totranslate").innerText = ""
    
    let TEMP_STR_INDEX = 0
    let text_written = ""

    setTimeout(function () {
        let TEMP_STR_LOOP = setInterval(function() {
            let toadd = selectedSentence[0][TEMP_STR_INDEX]
            if (toadd===undefined) {
                toadd = ""
            }

            document.getElementById("sentence_totranslate").innerHTML = text_written+"<span style='color: #0f0; font-size: 26px'><strong>"+toadd+"</strong></span>"

            if (TEMP_STR_INDEX==selectedSentence[0].length+1) {
                isTyping = false
                document.getElementById("googletrashit").disabled = false
                clearInterval(TEMP_STR_LOOP)
            }

            text_written += toadd
            TEMP_STR_INDEX += 1
        }, 25)
    }, 1000)

    document.getElementById("googletrashit").addEventListener("click", function() {
        if (isTyping) {return}
        if (isTranslating) {return}
        if (translated) {return}

        document.getElementById("googletrashit").disabled = true

        isTranslating = true

        let iterationCount = 0
        let TEMP_TRANS_LOOP = setInterval(function() {
            document.getElementById("sentence_received").innerText = selectedSentence[iterationCount+1]
            iterationCount += 1

            if (iterationCount==10) {
                translated = true
                document.getElementById("sentence_received_ready").style.display = null

                clearInterval(TEMP_TRANS_LOOP)

                document.getElementById("retry").addEventListener("click", function() {
                    window.location.href = ""
                })
            }
        }, 100)
    })
})()