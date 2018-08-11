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

    var hadChildListMutation = mutations.some(mutation => {
        return mutation.type == 'childList';
    });

    if (hadChildListMutation === false) {
        return;
    }

    var didAddJewelContent = mutations.some(mutation => {
        return mutation.addedNodes.length > 0 && mutation.target.matches("ul.jewelContent") === true;
    });

    if (didAddJewelContent === true) {
        var messagesContainer = document.querySelector('ul.jewelContent');

        var messages = Array.from(messagesContainer.getElementsByTagName('li'));

        messages.forEach(message => {
            setTitleOnMessageContent(message);
        });
    }
}

function addMessageHoverEvents(mutations) {

    var messages = Array.from(messageContainer.getElementsByTagName("li"));

    messages.forEach(message => {
        setTitleOnMessageContent(message);
    });
}

function setTitleOnMessageContent(element) {
    const contentDiv = element.querySelector("div.content");

    //Get all divs, but only return the one that is not author or time
    const messageContainerDiv = contentDiv.querySelector("div:not(.author):not(.time)");

    const messageContent = messageContainerDiv.querySelector("span > span").innerText;

    contentDiv.setAttribute('title', messageContent);
}