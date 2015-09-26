function DashboardController($scope, $http, $timeout) {
  var data = [];
  var mdeg = 0.00000904363;

  $scope.categories = [];
  $scope.toggle = false;

  function measure(lat1, lon1, lat2, lon2) { // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // meters
  }
  $http.get(HOST_NAME + '/data/data.json')
    .then(function(json) {
      data = json.data;
      for (var i in data.categories) {
        var n = _.where(data.items, {
            category_id: i * 1
          })
          .length;
        $scope.categories.push({
          id: i,
          name: data.categories[i],
          ccnt: 0,
          total: n,
          count: n
        });
      }
      ready();
    }, function(err) {
      console.log(err);
    });
  $scope.model = {
    lat: 43.231933287692, // initial map center latitude
    lon: 76.888262688232, // initial map center longitude
    zoom: 14 // the zoom level
  };
  var map;
  var circle;
  var stack = [];
  var meters = 1000;
  var K = 110 / 3.14;
  var myIcons = [];
  var fonts = [
    null,
    "fa-institution",
    "fa-heartbeat",
    "fa-shield",
    "fa-plus-square",
    "fa-birthday-cake",
    "fa-binoculars",
    "fa-tree",
    "fa-umbrela",
    "fa-binoculars",
    "fa-book",
    null,
    "fa-automobile",
    "fa-exclamation-circle"
  ];
  var lastPoint;
  var drawCircle = function(e, criteria) {
    if (circle) {
      circle.remove();
    }
    lastPoint = e.latlng;
    circle = DG.circle([e.latlng.lat, e.latlng.lng], meters, {
        fill: false
      })
      .addTo(map);
    for (var i in stack) {
      stack[i].remove();
    }
    $scope.categories.forEach(function(cat) {
      cat.count = 0;
      cat.ccnt = 0;
    })
    if (data.items && data.items.length)
      for (var i = 0; i < data.items.length; i++) {
        var x = data.items[i];
        if ($scope.selected.length > 0 && $scope.selected.indexOf(x.category_id) > -1 && x.lat && x.lon &&
          measure(e.latlng.lat, e.latlng.lng, x.lat, x.lon) <= meters) {
          var ic;
          ic = myIcons[x.category_id];

          // $scope.$apply(function() {
          for (var j in $scope.categories) {
            if ($scope.categories[j].id == x.category_id) {
              $scope.categories[j].count++;
            }
          }
          // });

          stack.push(DG.marker([x.lat, x.lon], {
              icon: ic
            })
            .addTo(map)
            .bindPopup(x.name));
        }
      }

    $scope.categories.forEach(function(cat) {
      cat.ccnt = K * cat.count / cat.total * 100;
    });
  }
  var ready = function() {
    DG.then(function() {
      fonts.forEach(function(x, i) {
        myIcons[i] = DG.divIcon({
          className: 'uix fa ' + x
        });
      });
      map = DG.map('map', {
        center: [$scope.model.lat, $scope.model.lon],
        zoom: $scope.model.zoom
      });
      map.on('click', function(e) {
        $scope.toggle = true;
        $timeout(function() {
          drawCircle({
            latlng: {
              lat: e.latlng.lat,
              lng: e.latlng.lng
            }
          });
        });
      });
    });
    $scope.selected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    $scope.filter = function(idx) {
      idx = idx * 1;
      var i = $scope.selected.indexOf(idx);
      if (i > -1) {
        $scope.selected.splice(i, 1);
      } else {
        $scope.selected.push(idx);
      }
      drawCircle({
        latlng: lastPoint || {
          lat: $scope.model.lat,
          lng: $scope.model.lon
        }
      });
    };
  };
}