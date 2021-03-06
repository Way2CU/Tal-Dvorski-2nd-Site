/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

	// menu button and dropdown div
	Site.menu_desktop = document.querySelector('a.menu');
	Site.menu_dropdown = document.querySelector('div.drop_down');

	// click event toggle class visible
	if (Site.menu_dropdown)
		Site.menu_desktop.addEventListener('click', function(e) {
			e.preventDefault();
			Site.menu_dropdown.classList.toggle('visible');
		});

	// gallery carousel right
	Site.gallery_carousel_right = new PageControl('div.container.right', 'div.portfolio');
		Site.gallery_carousel_right
		.attachNextControl($('div.container.right a.next'))
		.attachPreviousControl($('div.container.right a.prev'))
		.setWrapAround(true);

	// gallery carousel left
	Site.gallery_carousel_left = new PageControl('div.container.left', 'div.portfolio');
		Site.gallery_carousel_left
		.attachNextControl($('div.container.left a.next'))
		.attachPreviousControl($('div.container.left a.prev'))
		.setWrapAround(true);

	// connect submission to Google Analytics
	var push_event = function(data) {
			dataLayer.push({
				event: "leadSent"
			});
			return true;
		};

	for (var index in Caracal.ContactForm.list)
		Caracal.ContactForm.list[index].events.connect('submit-success', push_event);
};


// connect document `load` event with handler function
$(Site.on_load);
