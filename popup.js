//Get a random message from your jar and displays it to you.
function getRandomMessage() {
    var messages = [];
    var message = "";

    if (localStorage.messages && localStorage.messages != "") {
        messages = JSON.parse(localStorage.messages)
        var messageObject = messages[Math.floor(Math.random() * messages.length)];
        var message = messageObject.date + ": " + messageObject.text
    } else {
        message = "You have no saved happy thoughts yet.";
    } 
    return message;
}

function renderMessage(message) {
    document.getElementById("message").textContent = message;
}

function addThought() {
    $("#addMessage").show();
    document.getElementById("newMessage").value = localStorage.newMessage;
    $("#displayMessageButtons").hide();
}

function save() {
    var newMessage = document.getElementById("newMessage").value
    localStorage.newMessage = newMessage
}

function submitAndBack() {
    save();
    var newMessage = localStorage.newMessage
    var messages = localStorage.messages
    if (localStorage.messages && messages != "") {
        messages = messages.substring(1, messages.length - 1)
    }
    if (newMessage != "") {
        if (localStorage.messages && localStorage.messages != "") {
            messages = messages.concat(",")
        } else {
            messages = ""
        }
        messages = messages.concat(JSON.stringify({
            text : newMessage,
            count : updateCounter(),
            date : new Date().toLocaleDateString()
        }))

        localStorage.messages = "[" + messages + "]"
        localStorage.newMessage = ""
    }

    document.getElementById("newMessage").value = "";
    $("#addMessage").hide();
    $("#displayMessage").show();
    $("#displayMessageButtons").show();
}

function updateCounter() {
    if (localStorage.counter) {
        localStorage.counter = JSON.parse(localStorage.counter) + 1;
    } else {
        localStorage.counter = 1;
    }
    return localStorage.counter
}

$(document).ready(function(){
    $('#addButton').click(function(){
       addThought();
    });
    $('#submitAndBackButton').click(function(){
       submitAndBack();
    });
    $('#refreshButton').click(function(){
       getAndRenderMessage();
    });

});

function getAndRenderMessage() {
    renderMessage(getRandomMessage());
}
document.addEventListener('DOMContentLoaded', getAndRenderMessage);

setInterval(save, 1000);
