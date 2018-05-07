/* Copyright(c) 2016 Philip Mulcahy. */
/* global window */
/* jshint strict: true, esversion: 6 */

var amazon_order_history_inject = (function() {
    "use strict";

    // Google Analytics
//    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-118834348-1']);
    _gaq.push(['_trackPageview']);
    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = 'https://ssl.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
    _gaq.push(['_trackEvent', 'inject.js', 'injected']);

//    ga('create', 'UA-118834348-1', 'auto');
//    ga('send', 'pageview');
//    ga('send', 'event', 'extension', 'start', 'inject.js');
//    ga(function(tracker) {
//      console.log('XXX: ' + tracker.get('clientId'));
//    });
    // End Google Analytics

    var request_scheduler = amazon_order_history_request_scheduler.create();

	function getYears(){
		if(typeof(getYears.years) === "undefined") {
			var snapshot = amazon_order_history_util.findMultipleNodeValues(
				"//select[@name=\"orderFilter\"]/option[@value]",
				document,
				document);
			getYears.years = snapshot.map(
				function(elem){
					return elem.textContent
                               .replace("nel", "")  // amazon.it
                               .trim();
				}
			).filter(
				function(element, index, array) {
					return(/^\d+$/).test(element);
				}
			);
		}
		return getYears.years;
	}

    function fetchAndShowOrders(years) {
//        ga('send', 'event', 'extension', 'begin', 'fetchAndShowOrders');
		return amazon_order_history_order.getOrdersByYear(
            years, request_scheduler
        ).then(
			function(orderPromises) {
				amazon_order_history_table.displayOrders(orderPromises, true);
//                ga('send', 'event', 'extension', 'end', 'fetchAndShowOrders');
				return document.querySelector("[id=\"order_table\"]");
			}
		);
    }

    function addYearButtons() {
        var years = getYears();
        if(years.length > 0) {
            amazon_order_history_util.addButton(
                "All years",
                function() {
                    fetchAndShowOrders(years);
                }
            );
        }
        years.forEach(
            function(year) {
                amazon_order_history_util.addButton(
                    [year],
                    function() {
                        fetchAndShowOrders([year]);
                    }
                );
            }
        );
    }

    function addInfoPoints() {
        var progress = document.createElement("div");
        progress.setAttribute("id", "order_reporter_progress");
        progress.setAttribute("class", "order_reporter_progress");
        progress.setAttribute(
            "style", "position:absolute; top:0; right:0; color:orange; padding:0.2em; font-size:75%");
        document.body.insertBefore(
            progress,
            document.body.firstChild
        );
    }

    addYearButtons();
    addInfoPoints();
    console.log("Starting");
})();
