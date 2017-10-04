//Prototypes
String.prototype.formatCents = function(){
    return this.slice(0, this.length - 2) + "." + this.slice(-2);
}

//Global vars
let display = "$0.00";
let value = "";
let lukeValue = parseFloat($('#luke-value').html());
let nickValue = parseFloat($('#nick-value').html());

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
        display = "$0.0" + value;
    }else if(value.length === 2){
        display = "$0." + value;
    }else if(value.length > 2){
        display = "$" + value;
        display = display.formatCents();
    }

    $("#num").html(display);
}

function adjustTotals(string){
    let str = string.slice(1,string.length);
    let num = parseFloat(str)/2;

    if($('#nick-selector').hasClass('selector-active')){
        num = -num;
    }

    lukeValue+=num;
    nickValue-=num;

    $("#luke-value").html("$" + lukeValue);
    $("#nick-value").html("$" + nickValue);
}

function logData(string){
    let str = string.slice(1,string.length);
    let num = parseFloat(str)/2;

    if($('#nick-selector').hasClass('selector-active')){
        num = -num;
    }

    let description = $('#description-field').val();

    google.script.run.addItem(description, num)
}


