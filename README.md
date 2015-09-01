This plugin will help you to get and show comments counters for your website pages from api of Hypercomments (in users browser). This is an alternative for storing comments counters in your database. All the job are done by the browser.

###Requirements

1) You need to set up Hypercomments key to api in the admin panel of the service.
2) You need to make a simple script (or controller action) for request signing. See requestSigner.php in examples folder. 

###Installation

```html
<script src="/path/to/jquery.hypercommentsCounterGetter.min.js"></script>
```

###Usage
There are several scenarious:

* You have a block with an unsorted list of links. Lets suppose that this is block "Most readed articles".

```javascript
$("#mostpopular li a").hypercommentsCounterGetter({
    testHost: "http://www.your-site.com/",
    hashScriptName: '/getHashForHc.php',
    counterTemplate: '<div class="comments-counter"><i class="fa fa-comment"></i> %counterApi%</div>',
    widgetId: 11070,
    counterTemplateSelector: '.comments-counter',
    getPasteResultCallback: function(curElement) {
        return curElement.parent();
    }
});
```

Where:

 - "mostpopular li a" - is a selector for your block;
 - testHost - hostname of your website if you are testing script on another domain;
 - hashScriptName - path to script which make hash for requiest signing;
 - counterTemplate - html-wrapper for each counter
 - counterTemplateSelector - for updating already exists values;
 - getPasteResultCallback - callback to show counter template. Variable **curElement** - is a current link in "Most readed articles" block.

 * You want to show comments counter on current article page (for example).

```javascript
$("#article-page").hypercommentsCounterGetter({
    testHost: "http://www.your-site.com/",
    hashScriptName: '/getHashForHc.php',
    counterTemplate: '<i class="fa fa-comment"></i> %counterApi%',
    widgetId: 11070,
    counterTemplateSelector: '.comments-counter',
    getPasteResultCallback: function(curElement) {
        return $("#article-statusbar .comments-counter");
    },
    currentPage: true
});
```

 Where:

 - "#article-page" - is a block on page to show comments counter;
 - getPasteResultCallback - we can paste result whenever we want;
 - currentPage - marker to get stat for current url from api;