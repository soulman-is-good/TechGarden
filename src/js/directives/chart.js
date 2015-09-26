function chart() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      categories: '=ngModel',
      toggle: '='
    },
    templateUrl: "templates/dash/chart.html",
    controller: function($scope) {
      $scope.model = {
        popup: 'modal fade'
      };
      $scope.$watch('toggle', function(val) {
        if (val) {
          $scope.model.popup = 'modal show';
        } else {
          $scope.model.popup = 'modal fade';
        }
        $scope.labels = _.pluck($scope.categories, 'name');
        $scope.data = [];
        var max = 0;
        for (var i in $scope.categories) {
          if ($scope.categories[i].ccnt > max) {
            max = $scope.categories[i].ccnt;
          }
        }
        $scope.data.push(_.pluck($scope.categories, 'ccnt'));
        $scope.data.push(Array.apply(null, Array($scope.categories.length))
          .map(function(i) {
            return max
          }));
      });
      $scope.close = function() {
        $scope.toggle = false;
      };
      var cat_rec = {
        1: [
          "Возможны осложнения с поступлением в школу",
          "Ваш ребенок с легкостью поступит в образовательное учреждение",
          "Иделальное место для получение образования"
        ],
        2: [
          "Затруднение в получение медицинского обслуживания во время",
          "Средний путь кареты скорой помощи 14 минут",
          "Идеальное месть для людей, которым требуется постоянное внимание со стороны мед. служб"
        ],
        3: [
          "Не рекомендуются прогулки после 23:00",
          "Жандармерия не дремлет",
          "Время реагирования 6 минут"
        ],
        4: [
          "В данном районе наблюдается дефицит фармацевтики",
          "Средний путь до аптеки 6 минут",
          "Благоприятный район для проживание пожилых людей"
        ],
        5: [
          "Количество мест в детских садах сильно ограничено",
          "Встать в очередь за 2 года",
          "Благоприятный район для молодых семей"
        ],
        12: [
          "В Вашем районе случается очень мало ДТП",
          "Осторожно переходите дорогу",
          "Культурное возждение помогает избежать ДТП",
          "Рекомендуем купить видеорегистратор",
          "AHTUNG Нужно объезжать данный район."
        ],
        13: [
          "Уровень приступности минимален",
          "Уровень приступности приемлем",
          "Культурное возждение помогает избежать ДТП",
          "Рекомендуем купить видеорегистратор",
          "AHTUNG Нужно объезжать данный район."
        ]
      }

      $scope.recommendationForCategory = function(cat) {
        if (!cat_rec[cat.id]) {
          return '';
        }

        var r = cat_rec[cat.id];
        var l = r.length;
        var t_div = 100 / l;
        return r[parseInt(cat.ccnt / t_div) - 1] || r[l - 1];
      };

      $scope.recommendationForCateogoryAnother = function(category, percentage) {
        if (!cat_rec[cat.id]) {
          return '';
        }
        var r = cat_rec[cat.id];
        var l = r.length;
        var t_div = 100 / l;
        var val = (Math.round(cat.ccnt / t_div) - 1 <= l ? r[Math.round(cat.ccnt / t_div) - 1] : r[l - 1]);
        if (val) {
          return cat.name + ": " + val;
        }
        return '';
      };
    }
  }
}