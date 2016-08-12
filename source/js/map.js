'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.Map = {

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

        var _this = window.MNDMPS.Map,
            mapStyles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
            markerIcon = {
                path: 'M17,7V3.5c0-0.2-0.1-0.4-0.3-0.5c-0.2-0.1-0.4,0-0.5,0.1l-1.5,1.5L10,0L5.3,4.7L3.8,3.2C3.7,3,3.5,3,3.3,3C3.1,3.1,3,3.3,3,3.5V7l-3,3l3,3v3.5C3,16.8,3.2,17,3.5,17S4,16.8,4,16.5V14l5.5,5.5v11.9h1V19.5L16,14v2.5c0,0.3,0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5V13l3-3L17,7z M3,11.6L1.4,10L3,8.4V11.6z M10,1.4l3.9,3.9l-3.9,4l-3.9-4L10,1.4z M4,4.7l0.7,0.6L4,6V4.7zM16,12.6l-6,6l-6-6V7.4l1.3-1.3l4.3,4.3c0.2,0.2,0.5,0.2,0.7,0l4.3-4.3L16,7.4V12.6z M16,6l-0.7-0.7L16,4.7V6z M17,8.4l1.6,1.6L17,11.6V8.4z',
                fillColor: '#383838',
                fillOpacity: 1,
                anchor: new google.maps.Point(8, 32),
                strokeWeight: 0,
                scale: 2
            },
            myLatlng = new google.maps.LatLng(51.551157, -0.114799),
            mapOptions = {
                zoom: window.innerWidth < 560 ? 13 : 15,
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