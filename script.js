const palette = {
    'ㄱ': '#5d737e', 'ㄴ': '#7c9082', 'ㄷ': '#96897b', 'ㄹ': '#a45c5c',
    'ㅁ': '#6d597a', 'ㅂ': '#455e89', 'ㅅ': '#d4a373', 'ㅇ': '#d9d9d9',
    'ㅈ': '#e09f7d', 'ㅊ': '#f19c79', 'ㅋ': '#4d6d6d', 'ㅌ': '#84a59d',
    'ㅍ': '#f28482', 'ㅎ': '#3d405b'
};

const inputArea = document.getElementById('inputArea');
const scarf = document.getElementById('scarf-container');
let lastLen = 0;

inputArea.addEventListener('input', () => {
    const val = inputArea.value;
    if (val.length > lastLen) {
        const char = val[val.length - 1];
        if (char !== ' ' && char !== '\n') {
            createStitch(char);
        }
    }
    lastLen = val.length;
});

function createStitch(char) {
    const units = Hangul.disassemble(char);
    if (units.length === 0) return;

    const row = document.createElement('div');
    row.className = 'knit-row';

    units.forEach((u, i) => {
        const stitch = document.createElement('div');
        stitch.className = 'stitch';
        
        // 1. 자음 기반 색상
        const colorKey = Hangul.isConsonant(u) ? u : units[0];
        stitch.style.backgroundColor = palette[colorKey] || '#ccc';

        // 2. 모음 기반 모양 (양성/음성)
        if (Hangul.isVowel(u)) {
            const yang = ['ㅏ', 'ㅑ', 'ㅗ', 'ㅛ', 'ㅐ'];
            stitch.classList.add(yang.includes(u) ? 'knit' : 'purl');
        } else {
            stitch.classList.add('knit'); // 자음은 기본 겉뜨기
        }

        // 3. 받침 장식
        if (i === units.length - 1 && units.length > 2) {
            stitch.classList.add('bobble');
        }

        row.appendChild(stitch);
    });

    scarf.appendChild(row);
    // 자동 스크롤
    document.getElementById('knit-world').scrollTop = 0;
}

function resetKnit() {
    scarf.innerHTML = '';
    inputArea.value = '';
    lastLen = 0;
}
