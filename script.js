const palette = {
    'ㄱ': '#5d737e', 'ㄴ': '#7c9082', 'ㄷ': '#a45c5c', 'ㄹ': '#6d597a',
    'ㅁ': '#455e89', 'ㅂ': '#9b89b3', 'ㅅ': '#ef5d60', 'ㅇ': '#3d405b',
    'ㅈ': '#e09f7d', 'ㅊ': '#4d6d6d', 'ㅋ': '#84a59d', 'ㅌ': '#f28482',
    'ㅍ': '#d66853', 'ㅎ': '#2b2d42', 'ㄲ': '#455e89', 'ㄸ': '#a45c5c',
    'ㅃ': '#455e89', 'ㅆ': '#ef5d60', 'ㅉ': '#e09f7d'
};

const inputArea = document.getElementById('inputArea');
const scarf = document.getElementById('scarf-container');
const world = document.getElementById('knit-world');
let lastTextLen = 0;

inputArea.addEventListener('input', () => {
    const currentVal = inputArea.value;
    
    // 글자가 추가될 때만 한 땀씩 추가
    if (currentVal.length > lastTextLen) {
        const char = currentVal[currentVal.length - 1];
        
        if (char === ' ') {
            // 띄어쓰기: 베이지색 안뜨기 코 하나 추가
            addStitch(' ', true);
        } 
        else if (!isNaN(char) && char !== ' ' && char !== '\n') {
            // 숫자: 베이지색 겉뜨기 코 하나 추가
            addStitch(char, true);
        }
        else if (char === '\n') {
            // 줄바꿈은 무시하거나 작은 여백 처리
        }
        else {
            // 한글 처리: 초성, 중성, 종성을 분해하여 각각 코 생성
            const units = Hangul.disassemble(char);
            units.forEach((u) => {
                addStitch(u, false, units[0]); // units[0]은 색상 기준용 초성
            });
        }
    }
    
    lastTextLen = currentVal.length;
    world.scrollTop = 0; // 최신 단이 항상 보이도록
});

function addStitch(unit, isBase, firstConsonant = null) {
    const stitch = document.createElement('div');
    stitch.className = 'stitch';

    if (isBase) {
        // 베이지색 바탕 코 (띄어쓰기, 숫자 등)
        stitch.classList.add('base-color', 'purl');
    } else {
        // 자음/모음 색상 설정
        // 모음일 경우 해당 글자의 초성 색상을 따라가도록 하여 통일감 부여
        const colorKey = Hangul.isConsonant(unit) ? unit : (firstConsonant || 'ㅇ');
        stitch.style.backgroundColor = palette[colorKey] || '#ccc';

        // 모음 패턴 결정 (양성: 겉뜨기, 음성: 안뜨기)
        if (Hangul.isVowel(unit)) {
            const yang = ['ㅏ', 'ㅑ', 'ㅗ', 'ㅛ', 'ㅐ', 'ㅒ', 'ㅘ', 'ㅚ', 'ㅙ'];
            stitch.classList.add(yang.includes(unit) ? 'knit' : 'purl');
        } else {
            // 모든 자음(초성/종성)은 겉뜨기로 통일하여 뼈대 강조
            stitch.classList.add('knit');
        }
    }

    scarf.appendChild(stitch);
}

function resetKnit() {
    scarf.innerHTML = '';
    inputArea.value = '';
    lastTextLen = 0;
}
