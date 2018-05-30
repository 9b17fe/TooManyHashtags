// ==UserScript==
// @name         TooManyHashtags
// @namespace    https://github.com/9b17fe/TooManyHashtags
// @version      0.1
// @description  removes tweets with too many hashtags
// @author       mxf
// @match        https://tweetdeck.twitter.com/*
// @grant        GM_log
// ==/UserScript==
'use strict';

var thisIsTooMany = 10;


var body = document.querySelector("body");

var obConf = { childList: true, subtree: true,
              attributes: false, characterData: false };

var ob = mkObserver("article", tooManyHashtags);
ob.observe(body, obConf);

function tooManyHashtags (node) {
    var hashes = node.querySelectorAll("a[rel=hashtag]");
    if (hashes.length >= thisIsTooMany) {
        GM_log("removing:", node, hashes);
        node.remove();
    }
}

function mkObserver (name, f) {
    return new MutationObserver(muts => {
        for(var mut of muts) {
            var nodes = Array.from(mut.addedNodes);
            for (var node of nodes) {
                var tn = node.tagName;
                if (tn && tn.toLowerCase() == name) {
                    f(node);
                }
            }

        }
    });
}
