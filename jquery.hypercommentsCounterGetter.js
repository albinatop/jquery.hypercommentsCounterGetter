/*
 * jQuery Plugin: hypercommentsCounterGetter (Get Pages Comments Counters from API of Hypercomments)
 * https://bitbucket.com/renta/jquery.hypercommentsCounterGetter/
 *
 * Copyright (c) 2015, Vasiliy Toporov
 * Code license: MIT
 * https://tldrlegal.com/license/mit-license
 *
 * Author:  toporovvv@gmail.com
 * Version: 0.3
 * Date:    11.08.2015
 */
;(function ( $ ) {
 
    $.fn.hypercommentsCounterGetter = function( options ) {

        var defaults = {
            makeLinksAbsolute: true,
            testHost: '',
            hashScriptName: '',
            counterTemplate: false,
            widgetId: 0,
            counterTemplateSelector: '',
            getPasteResultCallback: function() {
                console.log('Specify callback to select element for printing the result');
            },
            currentPage: false
        };

        var opts = $.extend({}, defaults, options);

        this.each(function(){
            var thisElem = $(this);
            var properPageUrl = '';
            if(opts.currentPage === false) {
                if(opts.makeLinksAbsolute) {
                    properPageUrl = makeLinkAbsolute(thisElem.attr('href'));
                } else {
                    properPageUrl = thisElem.attr('href');
                }
            } else {
                properPageUrl = window.document.URL;
            }
            
            elemToPasteResult = opts.getPasteResultCallback(thisElem);
            getHypercommentsCouneterAndShowIt(properPageUrl, elemToPasteResult);
        }); 

        function getHash(body) {
            return $.ajax({
                dataType: 'text',
                url: opts.hashScriptName,
                data: {body: body}
            });
        }

        function makeLinkAbsolute(aLink) {
            if(aLink.indexOf(window.document.URL) > -1){
                return aLink;
            }
            if(opts.testHost !== ''){
                return opts.testHost + aLink.substring(1);
            }
            return window.document.URL + aLink.substring(1);
        }

        function makeCallToHypercommentsApi(body,signature)
        {
            return $.ajax({
                dataType: 'jsonp',
                method: "GET",
                url: "http://c1api.hypercomments.com/1.0/streams/get",
                data: { body, signature: signature}
            });
        }

        function getHypercommentsCouneterAndShowIt(pageUrl,elemToPaste) {
            var body = '{"widget_id": ' + opts.widgetId + 
                ', "link": "' + pageUrl + '"}';
            getHash(body).done(function(hash){
                var properHash = hash.replace(/"/g, "");
                makeCallToHypercommentsApi(body,properHash)
                .done(function(msg){
                    var commentsCount = msg.data[0].cm2;
                    var template = opts.counterTemplate;
                    var checkIfAlreadyPasted = elemToPaste.find(opts.counterTemplateSelector);
                    if(commentsCount > 0 && (template && template.length > 0)) {
                        if(checkIfAlreadyPasted.length > 0) {
                            checkIfAlreadyPasted.html().replace(/NUMBER/g, commentsCount);
                        } else {
                            elemToPaste.append(template.replace(/%counterApi%/g,commentsCount));
                        }
                    }
                })
                .fail(function( jqXHR, textStatus) {
                    console.log( "Request failed: " + textStatus);
                });

            })
            .fail(function( jqXHR, textStatus) {
                console.log( "Hash failed: " + textStatus);
            });
        }
    };
 
}( jQuery ));