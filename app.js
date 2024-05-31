var textVPCS="";
function convertText() {
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
    showVPCSText.value=textVPCS;
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
        'm': 'm',
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
const  countViolations=(text)=> {
    var violationsCount = 0;
    var violationsWords = [
        'thuốc lá', 'mụn', 'sẹo mỡ mỡ', 'sẹo', 'ăn kiêng', 'yếu sinh lý', 'giảm cân', 'tăng cân', 'rượu',"trắng","béo","collagen","vitamin","nhật bản","nhật","nám","rạn","xạm","tàn nhan","bụng",
        'xương khớp', 'viêm', 'thực phẩm chức năng', 'ăn kiêng', 'hộ chiếu', 'bằng lái xe', 'sổ đỏ', 'sổ hộ khẩu',
        'hẹn hò', 'thuốc', 'súng', 'pháo', 'ông kia', 'nữ giới', 'nam giới',
        'nước anh', 'pháp', 'đức', 'mỹ', 'hoa kỳ', 'người da đen', 'người da trắng', 'dân tộc', 'da đen', 'da trắng',
        'mọi rợ', 'cam kết hiệu quả', '100%', 'tuyệt đối', 'chắc chắn', 'hiệu quả', 'trị dứt điểm', 'cam kết',
        'trị mụn', 'trị sẹo', 'chữa hói đầu', 'đảm bảo', 'mỹ', 'sex', 'bikini', 'áo tắm', 'da thịt', 'hở hang',
        'trước', 'sau', 'sau đó', 'trong 7 ngày', 'gucci', 'armani', 'pepsi', 'cocacola', 'puma', 'zara', 'trắng da',"nợ","da","tiền","bạc","body","kem",
    ];

    for (var i = 0; i < violationsWords.length; i++) {
        if (text.includes(violationsWords[i])) {
            violationsCount++;
            textVPCS+=violationsWords[i]+",";
            console.log(textVPCS);
        }
    }
    return violationsCount;
}

function clearText() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
    document.getElementById('violationsBeforeCount').getElementsByTagName('span')[0].innerText = '0';
    document.getElementById('violationsAfterCount').getElementsByTagName('span')[0].innerText = '0';
}

function copyToClipboard() {
    var outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
    alert('Đã sao chép kết quả!');
}
