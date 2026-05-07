// 자음 색상 팔레트 (베이지 계열 제외)
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
    
    if (currentVal.length > lastTextLen) {
        const char = currentVal[currentVal.length - 1];
        
        if (char === ' ') {
            // 1. 띄어쓰기: 베이지색 단 생성
            const div = document.createElement('div');
            div.className = 'divider';
            scarf.appendChild(div);
        } 
        else if (!isNaN(char) && char !== ' ') {
            // 2. 숫자: 베이지색 단추
            const box = document.createElement('div');
            box.className = 'ornament-box';
            const btn = document.createElement('div');
            btn.className = 'ornament';
            btn.innerText = char;
            box.appendChild(btn);
            scarf.appendChild(box);
        }
        else if (['.', '!', '?', ',', '~'].includes(char)) {
            // 3. 기호: 베이지색 작은 매듭
            const box = document.createElement('div');
            box.className = 'ornament-box';
            const knot = document.createElement('div');
            knot.className = 'ornament';
            knot.style.width = '14px';
            knot.style.height = '14px';
            box.appendChild(knot);
            scarf.appendChild(box);
        }
        else {
            // 4. 일반 글자: 한글 뜨개질 코 생성
            createKnitStitch(char);
        }
    }
    
    lastTextLen = currentVal.length;
    world.scrollTop = 0; // 항상 최신 코가 보이게
});

function createKnitStitch(char) {
    const units = Hangul.disassemble(char);
    if (units.length === 0) return;

    const row = document.createElement('div');
    row.className = 'knit-row';

    units.forEach((u, i) => {
        const stitch = document.createElement('div');
        stitch.className = 'stitch';
        
        // 자음 기준 색상 선택
        const base = Hangul.isConsonant(u) ? u : (units[0] || 'ㅇ');
        stitch.style.backgroundColor = palette[base] || '#ccc';

        // 모음 패턴 결정
        if (Hangul.isVowel(u)) {
            const yang = ['ㅏ', 'ㅑ', 'ㅗ', 'ㅛ', 'ㅐ', 'ㅒ', 'ㅘ', 'ㅚ', 'ㅙ'];
            stitch.classList.add(yang.includes(u) ? 'knit' : 'purl');
        } else {
            stitch.classList.add('knit');
        }

        // 받침 장식
        if (i === units.length - 1 && units.length > 2) {
            stitch.classList.add('bobble');
        }

        row.appendChild(stitch);
    });

    scarf.appendChild(row);
}

function resetKnit() {
    scarf.innerHTML = '';
    inputArea.value = '';
    lastTextLen = 0;
}
