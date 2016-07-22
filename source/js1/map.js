'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.map = {

    data: {},

    center: function(map, latlng, offsetx, offsety) {
        // latlng is the apparent centre-point
        // offsetx is the distance you want that point to move to the right, in pixels
        // offsety is the distance you want that point to move upwards, in pixels
        // offset can be negative
        // offsetx and offsety are both optional

        if (!map.getBounds()) {
            return;
        }

        var scale = Math.pow(2, map.getZoom()),
            nw = new google.maps.LatLng(
                map.getBounds().getNorthEast().lat(),
                map.getBounds().getSouthWest().lng()
            ),
            worldCoordinateCenter = map.getProjection().fromLatLngToPoint(latlng),
            pixelOffset = new google.maps.Point((offsetx/scale) || 0, (offsety/scale) ||0),
            worldCoordinateNewCenter = new google.maps.Point(
                worldCoordinateCenter.x - pixelOffset.x,
                worldCoordinateCenter.y + pixelOffset.y
            ),
            newCenter = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);

        map.setCenter(newCenter);
    },

    load: function() {

        var _this = window.MNDMPS.map,
            mapStyles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
            markerIcon = {
                path: 'M15.2,5.2v9.5L20,10L15.2,5.2z M10,0L5.2,4.8L10,9.7l4.8-4.8L10,0z M0,10l4.8,4.7V5.2L0,10z M14.8,15.3l-4.4,4.4l3.4,3.4l-0.4,0.3l-8.2-8.2V5.6l4.8,4.8l4.7-4.8V15.3z',
                fillColor: '#5bc2e7',
                fillOpacity: 1,
                anchor: new google.maps.Point(12, 23),
                strokeWeight: 0,
                scale: 2
            },
            myLatlng = new google.maps.LatLng(51.551157, -0.114799),
            mapOptions = {
                zoom: window.MNDMPS.App.data.windowWidth < 560 ? 13 : 15,
                center: myLatlng,
                scrollwheel: false,
                disableDefaultUI: true,
                styles: mapStyles,
                draggable: false
            },
            map = new google.maps.Map(document.getElementsByClassName('google-map')[0], mapOptions),
            marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                icon: markerIcon,
                url: '//google.co.uk/maps/place/Mindmaps+Research+Ltd/@51.5512213,-0.1169207,17z/data=!3m1!4b1!4m2!3m1!1s0x48761b7382210035:0x9ca7d8a98838539f'
            });

        _this.data.googleMapLatLng = myLatlng;
        _this.data.googleMap = map;

        google.maps.event.addListener(marker, 'click', function() {
            window.open(marker.url, '_blank').focus();
        });

        google.maps.event.addListener(map, 'idle', function() {
            if (_this.data.windowWidth < 1000) {
                _this.center(
                    map,
                    myLatlng,
                    (_this.data.windowWidth - map.getDiv().parentNode.getElementsByClassName('info')[0].offsetWidth)/2 - (_this.data.windowWidth/2 - map.getDiv().parentNode.getElementsByClassName('info')[0].offsetWidth),
                    0);
            }
        });
    }
};