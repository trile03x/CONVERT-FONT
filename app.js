var textVPCS;
var containOutput = document.querySelector('.outputContainer');
var containTextVPCS = document.querySelector('.showVPCS');
function convertText() {
    textVPCS='';
    var inputText = document.getElementById('inputText').value;
    var outputText = document.getElementById('outputText');
    var violationsBeforeCount = document.getElementById('violationsBeforeCount').getElementsByTagName('span')[0];
    var violationsAfterCount = document.getElementById('violationsAfterCount').getElementsByTagName('span')[0];
    // Đếm số từ vi phạm trước chuyển đổi
    inputText = inputText.toLowerCase();
    var countBefore = countViolations(inputText);
    violationsBeforeCount.innerText = countBefore;
    var convertedText = convertToSpecialCharacters(inputText);
    // Đếm số từ vi phạm sau chuyển đổi
    var countAfter = countViolations(convertedText);
    violationsAfterCount.innerText = countAfter;
    outputText.value = convertedText;
}
var outputTextVPCS = document.getElementById('outputTextVPCS');
function showVPCS(){
    containOutput.classList.add("active");
    containTextVPCS.classList.add("active");
    outputTextVPCS.value = textVPCS;
}
function Exit(){
    containOutput.classList.remove("active");
    containTextVPCS.classList.remove("active");
}
const convertToSpecialCharacters =(text) =>{
    var charMap = {
        'a': 'а',
        'b': 'b',
        'c': 'с',
        'd': 'ԁ',
        'e': 'е',
        'f': 'f',
        'g': 'ɡ',
        'h': 'һ',
        'i': 'Ꭵ',
        'j': 'j',
        'k': 'k',
        'l': 'ⅼ',
        'm': 'ᴍ',
        'n': 'ɴ',
        'o': 'о',
        'p': 'р',
        'q': 'q',
        'r': 'ɾ',
        's': 'ѕ',
        't': 't',
        'u': 'u',
        'v': 'v',
        'w': 'w',
        'x': 'х',
        'y': 'у',
        'z': 'z',
        'ĩ': 'ĩ',
        'ì': 'ì',
        'ỉ': 'ỉ',
        'í':'ɪ́',
        '%': '.%',
    };
    var convertedText = '';
    for (var i = 0; i < text.length; i++) {
        var char = text.charAt(i).toLowerCase();
        if (charMap[char]) {
            convertedText += charMap[char];
        } else {
            convertedText += char;
        }
    }
    return convertedText;
}
let violationsWords = [];
const fetchViolationsWords = async()=>{
  try{
    const response = await fetch('./keyVPCS.json');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    violationsWords = data.keyCheckVPCS;
    console.log(violationsWords);
  }catch(error){
    console.error('Có lỗi xảy ra khi tải tệp JSON:', error);
  }
}
const  countViolations=(text)=> {
    var violationsCount = 0;
    for (var i = 0; i < violationsWords.length; i++) {
        if (text.includes(violationsWords[i])) {
            violationsCount++;
            textVPCS+=violationsWords[i]+",";
        }
    }
    return violationsCount;
}

function clearText() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
    document.getElementById('violationsBeforeCount').getElementsByTagName('span')[0].innerText = '0';
    document.getElementById('violationsAfterCount').getElementsByTagName('span')[0].innerText = '0';
    outputTextVPCS.value="";

}

function copyToClipboard() {
    var outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
    alert('Đã sao chép kết quả!');
}
document.addEventListener("DOMContentLoaded",async()=>{
    await fetchViolationsWords();
})