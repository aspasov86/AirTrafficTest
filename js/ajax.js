//The easiest way to go around CORS
function Ajax() {
    this.getData = function(lat, lng) {
      return $.ajax({
        method: 'GET',
        url: `https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${lat}&lng=${lng}&fDstL=0&fDstU=100`,
        dataType: 'jsonp',
        success: (res) => res
      })
    }

}

let data = new Ajax();
