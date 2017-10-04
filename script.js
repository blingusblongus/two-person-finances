//Prototypes
String.prototype.formatCents = function(){
    return this.slice(0, this.length - 2) + "." + this.slice(-2);
}

//Global vars
let display = "$0.00";
let value = "";
let lukeValue = 0;
let nickValue = 0;

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
    let num = parseFloat(str);
    lukeValue+=num;
    nickValue-=num;

    $("#luke-value").html("$" + lukeValue);
    $("#nick-value").html("$" + nickValue);
}

function logData(string){
    let str = string.slice(1,string.length);
    let num = parseFloat(str);
    let description = $('#description-field').val();

    //Add server-side connection here
}
