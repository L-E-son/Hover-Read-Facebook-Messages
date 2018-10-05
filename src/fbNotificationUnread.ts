'use strict';

// Wait for messages to open before we trigger the rest.
var observer = new MutationObserver(toggleMessageHoverEvents);
var config = {
    attributes: false,
    characterData: false,
    childList: true,
    subtree: true
};

var messagesHiddenContainer = document.querySelector('div[aria-labelledby="fbMercuryJewelHeader"]');

observer.observe(messagesHiddenContainer, config);

function toggleMessageHoverEvents(mutations) {
    var hadChildListMutation = mutations.some(function (mutation) {
        return mutation.type == 'childList';
    });

    if (hadChildListMutation === false) {
        return;
    }

    var didAddJewelContent = mutations.some(function (mutation) {
        return mutation.addedNodes.length > 0 && mutation.target.matches("ul.jewelContent") === true;
    });

    if (didAddJewelContent === true) {
        let messagesContainer = document.querySelector('ul.jewelContent');
        let messages = Array.from(messagesContainer.getElementsByTagName('li'));
        messages.forEach(function (message) {
            setTitleOnMessageContent(message);
        });
    }
}

function addMessageHoverEvents(mutations) {
    let messages = Array.from(messageContainer.getElementsByTagName("li"));
    
    messages.forEach(function (message) {
        setTitleOnMessageContent(message);
    });
}

function setTitleOnMessageContent(element) {
    let contentDiv = element.querySelector("div.content");
    //Get all divs, but only return the one that is not author or time
    let messageContainerDiv = contentDiv.querySelector("div:not(.author):not(.time)");
    let messageContent = messageContainerDiv.querySelector("span > span").innerText;
    contentDiv.setAttribute('title', messageContent);
}
