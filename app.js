$(document).ready(function(){


//first part
var number1 = '';
var number2 = '';
var result = "";
var bits = 8;
var remainder;

$("#input1").keyup(function(){
    
    number1 = Number($(this).val());
    number1 = addLeadingZeros(number1);
})
$("#input2").keyup(function(){
    number2 = Number($(this).val())
    number2 = addLeadingZeros(number2);
})
$("#plus").click(function(){
    $("#result").hide();
    $("#remainder").hide();
    if(checkNumbers()){
        return;
    }  
    result = "0".repeat(bits);
    result = addBinary(number1, number2);
          
    $("#result").text(removeLeadingZeros(number1) + " + " + removeLeadingZeros(number2) + " = " + result);
    $("#result").show();

})

$("#minus").click(function(){
    $("#result").hide();
    $("#remainder").hide();
    if(checkNumbers()){
        return;
    }   
     if(Number(number1) < Number(number2)){
        return;
    }
    result = addBinary(number1, twosComplement(number2));
    if(result.length > Number(bits)){
        result = result.substr(1);
        result = removeLeadingZeros(result);
    }
    if(result.length == 0){
        result = '0';
    }

    $("#result").text(removeLeadingZeros(number1) + " - " + removeLeadingZeros(number2) + " = " + result);
    $("#result").show();


})
$("#multiplication").click(function(){
    $("#result").hide();
    $("#remainder").hide();
    if(checkNumbers()){
        return;
    }  
    result = multiplyBinary(number1, number2);
    $("#result").show();
    $("#result").text(removeLeadingZeros(number1) + " * " + removeLeadingZeros(number2) + " = " + result);
})

$('#division').click(function(){
    $("#result").hide();
    $("#remainder").hide();
    if(checkNumbers()){
        return;
    }        

    result = divideBinary(number1, number2);
    
    $("#result").text(removeLeadingZeros(number1) + " : " + removeLeadingZeros(number2) + " = " + result);
    if(remainder.length === 0){
        remainder ='0';
    }
    $("#remainder").text("The remainder is: " + remainder);
    $("#result").show();
    $("#remainder").show();
})


function addLeadingZeros(num1){
    num1 = String(num1);
    bits = String(bits);
    while(num1.length < (bits)){
        num1 = "0" + num1.substr(0);
    }
    filledwithZeros = num1;
    return filledwithZeros;
}

function removeLeadingZeros(num1){
    num1 = String(num1);
    bits = String(bits);
    while(num1.charAt(0) == "0"){
        num1 = num1.substr(1);
    }
    return num1;
}

//addition, subtraction
function addBinary(num1, num2){
    num1 = addLeadingZeros(num1);
    num2 = addLeadingZeros(num2);
    num1 = String(num1);
    num2 = String(num2);
    num1 = '0'.repeat(2) + num1;
    num2 = '0'.repeat(2) + num2;
    var tempResult;
    var binaryResult = "0".repeat(num1.length);
    var remainder = 0;
    for(var i = Number(num1.length)-1; i>=0; i--){

        tempResult = Number(num1.charAt(i)) + Number(num2.charAt(i)) + remainder;
            if(tempResult == 0){
            remainder = 0;
            binaryResult = binaryResult.substring(0, i) + '0' + binaryResult.substring(i+1);
        }
        else if (tempResult == 1){
            remainder = 0;
            binaryResult = binaryResult.substring(0, i) + '1' + binaryResult.substring(i+1);
            
        }
        else if (tempResult == 2){
            remainder = 1;
            binaryResult = binaryResult.substring(0, i) + '0' + binaryResult.substring(i+1);
        }
        else if (tempResult == 3){
            remainder = 1;
            binaryResult = binaryResult.substring(0, i) + '1' + binaryResult.substring(i+1);
        }
        tempResult = 0;
    }
    binaryResult = removeLeadingZeros(binaryResult);
    return (binaryResult);
}   
//transform into twos complement
function twosComplement(num){

    num = String(num);
    for(var i = 0; i < num.length; i++){
        if(num.charAt(i) == '0'){
            num = num.substring(0, i) + '1' + num.substring(i+1);
        }
        else{
            num = num.substring(0, i) + '0' + num.substring(i+1);
        }
    }
    var one;
    one = (num.length)*'0';
    one = String(one);
    one = one.substr(0,one.length-1) + '1';
    num = addBinary(num, one)
    return num;
}

//multiplication

function multiplyBinary(num1, num2){
    var temps =[];
    num1 = removeLeadingZeros(num1);
    num2 = removeLeadingZeros(num2);
    for(var i = 0; i < num2.length; i++){
        if(num2.charAt(num2.length-i-1) == "1"){
            temps[i] = num1;
        }
        else{
            temps[i] = "0".repeat(num1.length);
        }
    }

    //add zeros after
    for(var i = num2.length-1; i >= 0; i--){
        temps[i] = temps[i] + "0".repeat(i);
    }

    // add zeros in front
    for(var i = 0; i < num2.length; i++){
        while(temps[i].length != 2*bits){
            temps[i] = "0" + temps[i];
        }
    }


    var multiplicationResult = "0".repeat(temps[0].length); 
    for(var i = 0; i < temps.length; i++){
        multiplicationResult = addBinary(multiplicationResult, temps[i]);
        while(multiplicationResult.length < temps[i].length){
            multiplicationResult = "0" + multiplicationResult;
        }
    }
    multiplicationResult = removeLeadingZeros(multiplicationResult);
    return multiplicationResult;

}

//division

function divideBinary(num1, num2){
    var num1String = String(num1);
    var num2String = String(num2);
    var divisionResult = '';
    var tempDivisionResult = '';
    var tempResult=[];
    for(var i = 0; i < num1String.length; i++){
        tempDivisionResult = tempDivisionResult + num1String.charAt(i);
        tempDivisionResult = Number(tempDivisionResult);
        if(tempDivisionResult < num2){
            tempResult[i] = 0;
        }
        else{
            num2String = String(num2);
            tempDivisionResult = String(tempDivisionResult);
            if(tempDivisionResult.length > num2String.length){
                var addZeros = tempDivisionResult.length - num2String.length;
                for(var j = 0; j <addZeros; j++){
                    num2String = '0' + num2String;
                }
            }
            tempDivisionLength = tempDivisionResult.length;
            tempDivisionResult = addBinary(tempDivisionResult, twosComplement(Number(num2String)))
            while(tempDivisionResult.length > tempDivisionLength){
                tempDivisionResult = tempDivisionResult.substring(1);
            }
            tempResult[i] = 1;
        }
        divisionResult = divisionResult + tempResult[i];
    }
    
    remainder = tempDivisionResult;
    remainder = removeLeadingZeros(remainder);
    divisionResult = removeLeadingZeros(divisionResult);
    return divisionResult;
}

//allowing only 0 and 1
$(document).ready(function(){
    $(".calculatorInput").keypress(function(event){
        var inputValue = event.which;
        if((inputValue == 48 || inputValue == 49)){
            return;
        }
        alert("You can only enter 0 and 1");
        event.preventDefault();
    });
});

//adding 0s to fill empty bits
$(document).ready(function(){
    $(".calculatorInput").attr("maxlength", "8");
    while(result.length < 8){
        result = "0" + result.substr(0);
    }
});

//changing bits

$(".bits").click(function(){
    bits = $(this).val();
    $(".calculatorInput").attr("maxlength", bits);
    while(result.length < bits){
        result = "0" + result.substr(0);
    }
    number1 = '';
    number1 = '';
    $(".calculatorInput").val('');
})

//hides remainder

$(document).ready(function(){
    $("#remainder").hide();
})

//set number1 and number2 to zeros

$(document).ready(function(){
    number1 = '0'.repeat(bits);
    number2 = '0'.repeat(bits);
})
//check whether numbers are entered

function checkNumbers(){
    if((number1 === '' && number2 === '') || (number1 === '0'.repeat(bits) && number2 === '0'.repeat(bits))){
        alert("Enter numbers")
        return true;
    }
    else if (number1 === '' || number1 === '0'.repeat(bits)){
        alert("Enter first number");
        return true;
    }
    else if(number2 === '' || number2 === '0'.repeat(bits)){
        alert("Enter second number");
        return true;
    }
    return false;
}

////////////////////////////////

//second part, IEEE
//ieee
var decimal_to_ieee;
var integerPart;
var decimalPart;
var signbit1;
var signbit2;
var biased_exponent1;
var biased_exponent2
var mantissa1;
var mantissa2;
var bias;
var ieeebits;
$("#ieee_decimal").keyup(function(){
    decimal_to_ieee = $(this).val();
})
$("#signbit").keyup(function(){
    signbit2 = $(this).val();
})
$("#biasedexponent").keyup(function(){
    biased_exponent2 = $(this).val();
})
$("#mantissa").keyup(function(){
    mantissa2 = $(this).val();
})

$("#convert1").click(function(){
    if($("#ieee_decimal").val() === ''){
        return;
    }

    signbit1 = calculateSignbit(decimal_to_ieee);
    if(signbit1 == '1'){
        decimal_to_ieee = decimal_to_ieee.substr(1);
    }
    var exponent;
    integerPart = getIntegerPart(decimal_to_ieee);
    decimalPart = getDecimalPart(decimal_to_ieee);
 
    integerPart = convertToBinary(integerPart);
    exponent = Number(integerPart.length) - 1;
    biased_exponent1 = exponent + bias;
    biased_exponent1 = convertToBinary(biased_exponent1);
    while(biased_exponent1.length != Number($("#biasedexponent").attr("maxlength"))){
        biased_exponent1 = '0' + biased_exponent1;
    }
    
    decimalPart = convertToBinaryDecimal(decimalPart, Number(ieeebits)-1-biased_exponent1.length-integerPart.length);
    decimalPart = integerPart.substr(1) + decimalPart;
    
    if(exponent < 0) {
        decimalPart = decimalPart.substr(Math.abs(exponent));
    }
    mantissa1 = decimalPart;
    result = signbit1 + biased_exponent1 + mantissa1;
    while(result.length != Number(ieeebits)){
        if(result.length > Number(ieeebits)){
            result = result.substr(0,result.length-1)
        }
        else{
            result = result + '0';
        }
    }    
    $("#result1").text("The result is: " + result);
    $("#result1").show();
})

$("#convert2").click(function(){
    if($("#signbit").val() == '' || $("#biasedexponent").val() == '' || $("#mantissa").val() == ''){
        return;
    }
    var decimalBiasedExponent;
    var result = '';
    var exponent;
    var mantissa = mantissa2;
    if(signbit2 == 0){
        result = result + '+'
    }
    else{
        result = '-';
    }
    while(biased_exponent2.length < Number($("#biasedexponent").attr("maxlength"))){
        biased_exponent2 = '0'+biased_exponent2;
    }
    while(mantissa.length < Number($("#mantissa").attr("maxlength"))) {
        mantissa = mantissa + '0';
    }  
    decimalBiasedExponent = convertToDecimal(biased_exponent2);

    exponent = decimalBiasedExponent - bias;
    mantissa = '1' + '.' + mantissa;
    if(Number(exponent)>0){
        if(Number(exponent)<mantissa.substr(2).length){
            mantissa = mantissa.substr(0,1)+mantissa.substr(2);
            mantissa = convertToDecimal(mantissa.substr(0, Number(exponent)+1)) + '.' + convertToDecimalDecimal(mantissa.substr(Number(exponent)+1));
        }
        else{
            mantissa = mantissa.substr(0,1)+mantissa.substr(2);
            mantissa = mantissa + '0'.repeat(Number(exponent)+1-mantissa.length);
            mantissa = convertToDecimal(mantissa);
        }
    }
    else if(Number(exponent)<0){
        mantissa = '0'.repeat(-(Number(exponent))-1) + '1' + mantissa.substr(2);
        mantissa = '0' + '.' + convertToDecimalDecimal(mantissa);
    }
    else if(Number(exponent) == 0){
        mantissa = mantissa;
    }
    
    result = result + mantissa;
    $("#result2").text("The result is: " + result);
    $("#result2").show();
})
function convertToDecimalDecimal(binaryNumber){
    var decimal = 0;
    for (var i = 0; i < binaryNumber.length; i++){
        decimal = decimal + Number(binaryNumber.charAt(i)) * Math.pow(2,-(i+1));
    }
    decimal = String(decimal).substr(2);
    return decimal;
}

function convertToDecimal(binaryNumber){
    var decimal = 0;
    for(var i = binaryNumber.length-1; i>=0; i--){
        decimal = decimal + Number(binaryNumber.charAt(i)) * Math.pow(2,binaryNumber.length-1-i);
    }
    return decimal;
}

function calculateSignbit(decimal_to_ieee){
    if(Number(decimal_to_ieee)>0){
        signbit1 = '0';
    }
    else{
        signbit1 = '1';
    }
    return signbit1;
}
function getIntegerPart(decimal_to_ieee){
    return Math.floor(Number(decimal_to_ieee));
}
function getDecimalPart(decimal_to_ieee){
    var decimal ='';
    for(var i = 0; i < decimal_to_ieee.length; i++){
        if(decimal_to_ieee.charAt(i) === '.'){

            decimal = decimal_to_ieee.substr(i+1);
        }
    }
    return decimal;
}

function convertToBinary(num){
    var integer = Number(num);
    var converted = '';
    var i = 0;
    while(integer != 0){
        if(integer % 2 === 1){
            converted = '1' + converted;
        }
        else{
            converted = '0' + converted;
        }
        integer = Math.floor(integer/2);
    }

    return converted;
}
function convertToBinaryDecimal(num, stop){
    num = Number ('0.' +num);
    var converted = '';
    while (num != 1 && converted.length <= stop){
        num = num * 2;
        if(num < 1){
            converted = converted + '0';
        }
        else{
            converted = converted + '1';
            num = num - 1;
        }
    }
    return converted;
}




$(document).ready(function(){
    bias = 127;
    ieeebits = '32';
})
$(".ieeebits").click(function(){
    ieeebits = String($(this).val());
    if(ieeebits == "32"){
        bias = 127;
        $("#biasedexponent").attr("maxlength", "8");
        $("#mantissa").attr("maxlength", "23");
    }
    else if (ieeebits == '64'){
        bias = 1023;
        $("#biasedexponent").attr("maxlength", "11");
        $("#mantissa").attr("maxlength", "54")
        
    }
    $("#ieee_decimal").val('')
    $("#signbit").val('')
    $("#biasedexponent").val('');
    $("#mantissa").val('');
    $("#result1").hide();
    $("#result2").hide();
})
//allowing certain characters
$(document).ready(function(){
    $("#ieee_decimal").keypress(function(){
        var inputValue = event.which;
        if(inputValue == 45 || (inputValue >= 48 && inputValue <= 57) || inputValue ===46){
            return;
        }
        alert("You can only enter 0-9 and .");
        event.preventDefault();
    })
    $(".ieeeparts").keypress(function(){
        var inputValue = event.which;
        if(inputValue==48 || inputValue == 49){
            return;
        }
        alert("You can only enter 0 and 1");
        event.preventDefault();
        
    })
    $("#signbit").attr("maxlength", "1");
    $("#biasedexponent").attr("maxlength", "8");
    $("#mantissa").attr("maxlength", "23");
})
// base converter
var base1;
var base2;
$("#selectedBase").click(function(){
    $("#numberToConvert").val("");
    base1 = $(this).val();
})
$("#desiredBase").click(function(){
    base2 = $(this).val();
})
$("#convertBase").click(function(){
    base1 = $("#selectedBase").val();
    base2 = $("#desiredBase").val();
    var number = $("#numberToConvert").val();
    var result;
    
    result = convertToDecimalFromBaseN(number, base1);
    result = convertFromDecimalToBaseN(result, base2);

    $("#result3").text("The result is: " + result);
})
function convertToDecimalFromBaseN(number, base){
    var result = 0;
    console.log("SIZE OF NUMBER: " + number.length);
    for(var i = 0; i < number.length; i++){
        result = result + Math.pow(Number(base), i) * returnNumber(number[number.length-1-i]);

    }

    return result;
}
function returnNumber (letter){
    if(letter == '1'){
        return 1;
    }
    if(letter == '2'){
        return 2;
    }
    if(letter == '3'){
        return 3;
    }
    if(letter == '4'){
        return 4;
    }
    if(letter == '5'){
        return 5;
    }
    if(letter == '6'){
        return 6;
    }
    if(letter == '7'){
        return 7;
    }
    if(letter == '8'){
        return 8;
    }
    if(letter == '9'){
        return 9;
    }
    if(letter == 'A'){
        return 10;
    }
    if(letter == 'B'){
        return 11;
    }
    if(letter == 'C'){
        return 12;
    }
    if(letter == 'D'){
        return 13;
    }
    if(letter == 'E'){
        return 14;
    }
    if(letter == 'F'){
        return 15;
    }
}
function convertFromDecimalToBaseN(number, base){
    var result = '';
    var remainders = [];
    var index = 0;
    var remainder;
    number = Number(number);
    base = Number(base);

    while(number != 0){
        remainder = number % base;
        if(remainder >= 10){
            remainders.push(returnLetter(remainder));
        }
        else{
            remainders.push(remainder);
        }
        number = Math.floor(number / base);
        index = index + 1;
    }
    
    for(var i = remainders.length - 1; i >= 0; i--){
        result = result + remainders[i];
    }
    return result;
}
function returnLetter(number){
    var letter = '';
    if(number == 10){
        letter = 'A';
    }
    else if(number == 11){
        letter = 'B';
    }
    
    else if(remainder == 12){
        letter = 'C';
    }
    else if(remainder == 13){
        letter = 'D';
    }
    else if(remainder == 14){
        letter = 'E';
    }
    else if(remainder == 15){
        letter = 'F';
    }
    return letter;
}
//allowing characters based on selected base
$(document).ready(function(){
    $("#numberToConvert").keypress(function(){
        var inputValue = event.which;
        if(Number(base1) == 2){
            if((inputValue == 48 || inputValue == 49)){
                return;
            }
        }
        else if (Number(base1) == 3){
            if((inputValue == 48 || inputValue == 49 || inputValue == 50)){
                return;
            }
        }
        else if (Number(base1) == 4){
            if((inputValue >= 48 && inputValue <= 48 + Number(base1) - 1)){
                return;
            }
        }
        else if (Number(base1) == 5){
            if((inputValue >= 48 && inputValue <= 48 + Number(base1) - 1)){
                return;
            }
        }
        else if (Number(base1) == 6){
            if((inputValue >= 48 && inputValue <= 48 + Number(base1) - 1)){
                return;
            }
        }
        else if (Number(base1) == 7){
            if((inputValue >= 48 && inputValue <= 48 + Number(base1) - 1)){
                return;
            }
        }
        else if (Number(base1) == 8){
            if((inputValue >= 48 && inputValue <= 48 + Number(base1) - 1)){
                return;
            }
        }
        else if (Number(base1) == 9){
            if((inputValue >= 48 && inputValue <= 48 + Number(base1) - 1)){
                return;
            }
        }
        else if (Number(base1) == 10){
            if((inputValue >= 48 && inputValue <= 57)){
                return;
            }
        }
        else if (Number(base1) == 11){
            if((inputValue >= 48 && inputValue <= 57) || (inputValue ==65)){
                return;
            }
        }
        else if (Number(base1) == 12){
            if((inputValue >= 48 && inputValue <= 57) || (inputValue >= 65 && inputValue<=66)){
                return;
            }
        }
        else if (Number(base1) == 13){
            if((inputValue >= 48 && inputValue <= 57) || (inputValue >= 65 && inputValue<=67)){
                return;
            }
        }
        else if (Number(base1) == 14){
            if((inputValue >= 48 && inputValue <= 57) || (inputValue >= 65 && inputValue<=68)){
                return;
            }
        }
        else if (Number(base1) == 15){
            if((inputValue >= 48 && inputValue <= 57) || (inputValue >= 65 && inputValue<=69) ){
                return;
            }
        }
        else if (Number(base1) == 16){
            if((inputValue >= 48 && inputValue <= 57) || (inputValue >= 65 && inputValue<=70)){
                return;
            }
        }
        alert("Number is not in range.");
        event.preventDefault();   
    })
})
})
