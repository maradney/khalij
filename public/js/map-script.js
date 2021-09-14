function googleMap() {
  if ($('.google-map-three').length) {
    $('.google-map-three').each(function () {
      // getting options from html
      const Self = $(this);
      const mapName = Self.attr('id');
      const mapLat = Self.data('map-lat');
      const mapLng = Self.data('map-lng');
      const iconPath = Self.data('icon-path');
      var mapZoom = Self.data('map-zoom');
      const mapTitle = Self.data('map-title');

	  const styles = [
	    {
	        featureType: 'landscape',
	        elementType: 'labels',
	        stylers: [
	            {
	                visibility: 'off',
	            },
	        ],
	    },
	    {
	        featureType: 'transit',
	        elementType: 'labels',
	        stylers: [
	            {
	                visibility: 'off',
	            },
	        ],
	    },
	    {
	        featureType: 'poi',
	        elementType: 'labels',
	        stylers: [
	            {
	                visibility: 'off',
	            },
	        ],
	    },
	    {
	        featureType: 'water',
	        elementType: 'labels',
	        stylers: [
	            {
	                visibility: 'off',
	            },
	        ],
	    },
	    {
	        featureType: 'road',
	        elementType: 'labels.icon',
	        stylers: [
	            {
	                visibility: 'off',
	            },
	        ],
	    },
	    {
	        stylers: [
	            {
	                hue: '#00aaff',
	            },
	            {
	                saturation: -100,
	            },
	            {
	                gamma: 2.15,
	            },
	            {
	                lightness: 12,
	            },
	        ],
	    },
	    {
	        featureType: 'road',
	        elementType: 'labels.text.fill',
	        stylers: [
	            {
	                visibility: 'on',
	            },
	            {
	                lightness: 24,
	            },
	        ],
	    },
	    {
	        featureType: 'road',
	        elementType: 'geometry',
	        stylers: [
	            {
	                lightness: 57,
	            },
	        ],
	    },
      ];

      // if zoom not defined the zoom value will be 15;
      if (!mapZoom) {
        var mapZoom = 12;
      }
      // init map
      let map;
      map = new GMaps({
        div: `#${mapName}`,
        scrollwheel: false,
        lat: mapLat,
        lng: mapLng,
        styles,
        zoom: mapZoom,
      });
      // if icon path setted then show marker
      if (iconPath) {
        map.addMarker({
          icon: 'images/logo/map3.png',
          lat: 40.925372,
          lng: -74.276544,
          title: 'Ollo Main Office',
        });
      }
    });
  }
}

// Dom Ready Function
jQuery(document).on('ready', () => {
  (function ($) {
    // add your functions
    googleMap();
  }(jQuery));
});
