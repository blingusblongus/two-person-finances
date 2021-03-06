//Prototypes
String.prototype.formatCents = function(){
    return this.slice(0, this.length - 2) + "." + this.slice(-2);
}

//Global vars
let display = "$0.00";
let value = "";
let lukeValue = 0;
let nickValue = 0;

//Set Values and colors
lukeValue = parseFloat($('#luke-value').html());
nickValue = parseFloat($('#nick-value').html());
setColors();

//Event Listeners
$("td").click(function(){
    if($(this).hasClass("clear")){
        display = "$0.00";
        value = "";
        $("#num").html(display);
        return;
    }
    const num = $(this).html()
    setNumber(num);
});

$("#submit").click(function(){
    adjustTotals(display);
    logData(display);
})

$(".selector").click(function(){
    if(!$(this).hasClass('selector-active')){
        $(this).toggleClass('selector-active').siblings().removeClass('selector-active');
    }
})

$(".direct__button").click(function(){
    if(!$(this).hasClass('direct__button--active')){
        $(this).toggleClass('direct__button--active').siblings().removeClass('direct__button--active');
    }
})

//Functions
function setNumber(number){
    value += number;
    if(value.length === 1){
        display = "0.0" + value;
    }else if(value.length === 2){
        display = "0." + value;
    }else if(value.length > 2){
        display = value;
        display = display.formatCents();
    }

    $("#num").html(parseFloat(display).toFixed(2));
}

function adjustTotals(string){
    let str = string;
    let num;

    //Check if value needs halving
    if($('.direct__button--yes').hasClass('direct__button--active')){
        num = parseFloat(str);
    }else{
        num = parseFloat(str)/2;
    }

    //Check if it's nick or luke who's paying
    if($('#nick-selector').hasClass('selector-active')){
        num = -num;
    }

    lukeValue+=num;
    nickValue-=num;

    $("#luke-value").html("$" + lukeValue.toFixed(2));
    $("#nick-value").html("$" + nickValue.toFixed(2));

    setColors();
}

function logData(string){
    let str = string;
    let num;

    //Check if value needs halving
    if($('.direct__button--yes').hasClass('direct__button--active')){
        num = parseFloat(str);
    }else{
        num = parseFloat(str)/2;
    }

    if($('#nick-selector').hasClass('selector-active')){
        num = -num;
    }

    let description = $('#description-field').val();

    google.script.run.addItem(description, num)
}

function setColors(){
    const lukeNum = parseFloat($('#luke-value').html());
    if(lukeNum == 0){
        $(".total").css("color", 'black');
    }else if(lukeNum > 0){
        $('#luke-value').css('color', 'green');
        $('#nick-value').css('color', 'red');
    }else if(lukeNum < 0){
        $('#luke-value').css('color', 'red');
        $('#nick-value').css('color', 'green');
    }
}

