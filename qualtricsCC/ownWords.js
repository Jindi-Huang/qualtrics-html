Qualtrics.SurveyEngine.addOnload(function () {
    this.hidePreviousButton();
});

Qualtrics.SurveyEngine.addOnReady(function () {
    // -------- Config from Embedded Data --------
    var p0        = "${e://Field/playerName0}";
    var icon0     = "${e://Field/playerIcon0}";        // drink-icon emoji, e.g. "🥤" / "🍵" / "🍶"
    var themeName = "${e://Field/color}" || "purple"; // theme NAME, e.g. "purple"

    // -------- Map theme NAME to the exact hex used in the HTML --------
    function getThemeIconColor(name) {
        var themes = {
            blue:   '#2563eb',
            purple: '#9333ea',
            teal:   '#0d9488',
            yellow: '#d97706'
        };
        return themes[(name || '').toLowerCase().trim()] || themes.blue;
    }
    var themeHex = getThemeIconColor(themeName);

    // -------- Pick drink-icon SVG by playerIcon0 emoji (matches the HTML's DrinkIcon) --------
    function drinkIconSVG(icon, color) {
        var attrs = 'width="16" height="16" fill="' + color +
                    '" style="display:inline-block;vertical-align:middle;margin:0 4px"';

        // 🍵 -> teacup / flute
        if (icon === '🍵') {
            return '<svg ' + attrs + ' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">'
                 + '<path d="M443.882,5.28C440.842,1.92,436.554,0,432.01,0h-352c-4.512,0-8.832,1.92-11.872,5.28c-3.008,3.328-4.512,7.808-4.064,12.32l48,480c0.832,8.192,7.712,14.4,15.936,14.4h256c8.224,0,15.104-6.208,15.904-14.4l48-480C448.394,13.088,446.922,8.608,443.882,5.28z M401.29,162.496c-40.672,13.152-93.6,19.232-135.136-14.848c-52.064-42.72-115.872-35.36-159.136-22.496L97.706,32h316.608L401.29,162.496z"/>'
                 + '</svg>';
        }

        // 🍶 -> bottle / flask
        if (icon === '🍶') {
            return '<svg ' + attrs + ' viewBox="25 0 50 100" xmlns="http://www.w3.org/2000/svg">'
                 + '<path d="m68.3983231 39.4338799v51.373867c0 3.6944504-2.9977417 6.6922531-6.6921844 6.6922531h-23.4122773c-3.6944466 0-6.6921864-2.9978027-6.6921864-6.6922531v-51.373867c0-3.2933311 1.0977535-6.4916306 3.1244678-9.0988846l5.3199768-6.8294144c1.2877464-1.6572304 1.9844475-3.6839428 1.9844475-5.773922v-2.7444191h15.9388657v2.7444191c0 2.0899792.696701 4.1166916 1.9844475 5.773922l5.3199768 6.8294144c2.0267105 2.607254 3.124466 5.8055534 3.124466 9.0988846z"/>'
                 + '<path d="m58.727375 11.8242331h-17.45475c-.7878952 0-1.426609-.6387148-1.426609-1.426609v-6.471015c-.0000001-.7878943.6387138-1.4266091 1.426609-1.4266091h17.45475c.7878952 0 1.426609.6387148 1.426609 1.4266093v6.471015c.0000001.787894-.6387138 1.4266088-1.426609 1.4266088z"/>'
                 + '</svg>';
        }

        // default (🥤): cup with straw
        return '<svg ' + attrs + ' viewBox="0 0 462.848 462.848" xmlns="http://www.w3.org/2000/svg">'
             + '<polygon points="246.784,94.208 246.784,53.248 344.064,29.184 336.384,0 216.064,29.184 216.064,94.208 82.432,94.208 82.432,160.768 380.416,160.768 380.416,94.208"/>'
             + '<path d="M102.912,186.368l35.328,249.856c2.048,15.36,15.36,26.624,30.208,26.624h124.416c15.36,0,28.16-11.264,30.208-26.624L358.4,186.368H102.912z"/>'
             + '</svg>';
    }

    function skipIconSVG() {
        var attrs = 'width="16" height="16" fill="#111827" style="display:inline-block;vertical-align:middle;margin:0 4px"';
        return '<svg ' + attrs + ' viewBox="0 0 512.095 512.095" xmlns="http://www.w3.org/2000/svg">'
             + '<path d="m256.047 0c-141.411 0-256.047 114.636-256.047 256.047s114.636 256.047 256.047 256.047 256.047-114.636 256.047-256.047-114.636-256.047-256.047-256.047zm-192.313 256.047c0-106.212 86.102-192.313 192.313-192.313 41.614 0 80.139 13.221 111.61 35.687l-268.236 268.237c-22.466-31.471-35.687-69.996-35.687-111.611zm192.313 192.314c-41.589 0-80.092-13.204-111.552-35.644l268.221-268.221c22.441 31.46 35.644 69.964 35.644 111.552.001 106.211-86.101 192.313-192.313 192.313z"/>'
             + '</svg>';
    }

    // -------- Build & inject question HTML --------
    var html = 'In your own words, please describe how you usually chose between '
             + '"drink ' + p0 + '"' + drinkIconSVG(icon0, themeHex)
             + ' and "Skip"' + skipIconSVG()
             + '. How did your decision making evolve over time?';

    var container = this.getQuestionContainer();
    var stem = container.querySelector('.QuestionText');
    if (stem) stem.innerHTML = html;

    // -------- Keylog capture --------
    var textarea = container.querySelector('textarea');
    if (!textarea) return;

    var keylog = [];
    var prevLen = textarea.value.length;

    textarea.addEventListener('keydown', function (e) {
        keylog.push({ key: e.key, time: Date.now() });
    });

    textarea.addEventListener('input', function () {
        var len = textarea.value.length;
        var jump = len - prevLen;
        if (jump > 10) {
            keylog.push({ key: 'INPUT_JUMP', time: Date.now(), jump: jump, total: len });
        }
        prevLen = len;
    });

    Qualtrics.SurveyEngine.addOnPageSubmit(function () {
        Qualtrics.SurveyEngine.setEmbeddedData('keylogOwnWords', JSON.stringify(keylog));
    });
});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /* nothing */
});