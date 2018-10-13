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

function toggleMessageHoverEvents(mutations: Array<MutationRecord>) {
    var hadChildListMutation = mutations.some(mutation => {
        return mutation.type == 'childList';
    });

    if (hadChildListMutation === false) {
        return;
    }
    
    const messagesContainer = <HTMLUListElement>document.querySelector('ul.jewelContent');
    const messages = Array.from(messagesContainer.getElementsByTagName('li'));
    messages.forEach(message => {
        setTitleOnMessageContent(message);
    });
}

function setTitleOnMessageContent(element: HTMLElement) {
    const contentDiv = element.querySelector("div.content");
    //Get all divs, but only return the one that is not author or time
    const messageContainerDiv = contentDiv.querySelector("div:not(.author):not(.time)");
    const messageContent = messageContainerDiv.querySelector("span > span").textContent;
    contentDiv.setAttribute('title', messageContent);
}
