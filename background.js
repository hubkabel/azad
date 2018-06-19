/* jshint strict: true, esversion: 6 */

function registerListener() {
    "use strict";

    const order_cache = amazon_order_history_db.create();

    chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
        console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
        if (request.action == 'cache_order') {
            order_cache.set(request.order);
        } else if (request.action == 'retrieve_order') {
            sendResponse(order_cache[request.order_id]);
        } else if (request.action == 'open_tab') {
            chrome.tabs.create(
                { url: request.url }
            );
        }
    });
}

registerListener();
