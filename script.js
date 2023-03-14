const passwordDisplay = document.querySelector("[data-passwordDispay]")
const copyMsg = document.querySelector("[data-copyMsg]")
const lengthDisplay = document.querySelector("[data-lengthNumber]")
const inputSlider = document.querySelector("[data-lengthSlider]")
const indicator = document.querySelector("[data-indicator]")
const copyBtn = document.querySelector("[data-copyBtn]")
const uppercaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const numbersCheck = document.querySelector("#numbers")
const symbolsCheck = document.querySelector("#symbols")
const generateBtn = document.querySelector(".generateButton")
const allcheckBox = document.querySelectorAll("input[type=checkbox]")
const symbols ='~`!@#$%^&*()_-+={[}]|\:;"<,>./?';


let password = ''
let passwordLength = 10
let checkCount = 0
handleSlider()
//set color to grey
setIndicator("white")

// Set PasswordLength
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

}

// Set Indicator in Color
function setIndicator(color){
    indicator.style.backgroundColor = color
    // shadow
}

//Get random Integer
function getRandomInteger(min,max){
    return Math.floor(Math.random() * (max - min)) + min
}

function generateRandomNumber(){
    return getRandomInteger(0,9)
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,122))         //convert interger to character usinf ASCII value
}

function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,90))         //convert interger to character usinf ASCII value
}

function generateSymbols(){
    const randNum = getRandomInteger(0,symbols.length)
    return symbols.charAt(randNum)
}

function calcStrength(){
    let hasUpper = false
    let hasLower= false
    let hasNumber = false
    let hasSymbols = false

    if (uppercaseCheck.checked) hasUpper = true
    if (lowercaseCheck.checked) hasLower = true
    if (numbersCheck.checked) hasNumber = true
    if (symbolsCheck.checked) hasSymbols = true

    if (hasUpper && hasLower && hasNumber && hasSymbols && passwordLength >= 8){
        setIndicator("#0f0")
    }else if(
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbols) && 
        passwordLength >= 6
    ){
        setIndicator("#ff0")
    }
    else{
    setIndicator("#f00")
    }    
}

// Copy Content to Clipboard using clipboard Api
async function copyContent() {
    try{
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText = 'copied';
    }catch(e){
        copyMsg.innerText = 'failed'
    }

    copyMsg.classList.add("active")

    setTimeout( () => {
        copyMsg.classList.remove("active")
    },2000) 
}
function shufflePassword(array){
    //Fisher Yates Method to shufle the password
    for (let i = array.length -1; i > 0; i--) { 
        var j = Math.floor(Math.random() * (i+1)) 
        var temp = array[i] 
        array[i] = array[j] 
        array[j] = temp 
     } 
     let str = ''
     array.forEach((e1) => (str += e1))
     return str
}

//Event Listners
function handleCheckBoxChange(){
    checkCount = 0
    allcheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++
    })
//Special Condition
    if(passwordLength < checkCount){
    passwordLength = checkCount
    handleSlider()
}
}
allcheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change',handleCheckBoxChange)
})


inputSlider.addEventListener('input',(e) =>{
    passwordLength = e.target.value
    handleSlider()
})

copyBtn.addEventListener('click',(e) => {
    if (passwordDisplay.value)
        copyContent()
})
//GENERATE PASSWORD
generateBtn.addEventListener('click',(e) => {
    if (checkCount <= 0) return;

    if (passwordLength < checkCount){
        passwordLength = checkCount
        handleSlider()
    } 
    //Generating New Password
    password = ''
    // if(uppercaseCheck.checked){
    //     password += generateUpperCase(  )
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase(  )
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber(  )
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbols(  )
    // }
    let funnArr = []
    if (uppercaseCheck.checked)
        funnArr.push(generateUpperCase)
    if (lowercaseCheck.checked)
        funnArr.push(generateLowerCase)
    if (numbersCheck.checked)
        funnArr.push(generateRandomNumber)
    if (symbolsCheck.checked)
        funnArr.push(generateSymbols)
    
    //checked addition
    for(let i=0; i<funnArr.length; i++){
        password += funnArr[i]()
    }
    console.log('Compulsary Done')
    //Remaining letter additon
    for(let i=0; i<passwordLength-funnArr.length; i++){
        let randomIndex = getRandomInteger(0 , funnArr.length)
        console.log('random' + randomIndex)
        password += funnArr[randomIndex]()
    }
    console.log('Remining Done')

    //Shuffle the password
    password = shufflePassword(Array.from(password))
    console.log('Shuffling Done')

    passwordDisplay.value = password
    //calculate strength
    calcStrength()

})