angular.module("Medfind", ['ionic'])
    .directive('ngEnter', function () {
        return function ($scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    $scope.$apply(function () {
                        $scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })
    .controller("MedFindCtrl", function ($scope, $http, $filter, $ionicPopup, $timeout){
        $scope.data = {};
        $scope.data.medications = [];

        $scope.loadMoreDisplay = true;

        $scope.data.pageNumber = 1;
        var currentQuery = "";

        $scope.GetData = function (query) {
            console.log("running " + query);
            currentQuery = query;
            $scope.data.pageNumber = 1;
            $scope.data.medications = [];
            $scope.loadMoreDisplay = true;
            doApiCall();
        };

        $scope.LoadMore = function (pageNumber, data) {
            if ($scope.data.medications == 0) {
                console.log('Alert is working');
                $scope.loadMoreDisplay = false;
            } else {
                $scope.loadMoreDisplay = true;
            }
            console.log(parseInt(pageNumber) + 1);
            $scope.data.pageNumber = parseInt(pageNumber) + 1;
            doApiCall();
        };
       

        var doApiCall = function () {
            $http.get('http://localhost:3005/api/search/' + currentQuery + '/' + $scope.data.pageNumber)
            .success(function (data) {
                if (data.medicines.length == 0) {
                    $scope.loadMoreDisplay = true;
                    var alertPopup = $ionicPopup.alert({
                        title: 'Item not listed',
                        template: 'Sorry the government has not regulated that medication yet'
                    });
                    alertPopup.then(function (res) {
                        console.log('Alert is working');
                    });
                }
                else {
                    console.log(data);
                    for (var i = 0 ; i < data.medicines.length ; i++) {
                        $scope.data.medications.push(data.medicines[i]);
                    }

                    console.log($scope.data.medications);
                    $scope.data.pageNumber = data.current_page;
                    $scope.data.perPage = data.per_page;
                    if (data.total > $scope.data.perPage * $scope.data.pageNumber) {
                        $scope.loadMoreDisplay = false;
                    }
                }
            })
            .error(function (error) {
                $scope.data.error = error;
            });
        };

    });
//.constant("dataUrl", "http://localhost:3002/api/search/p/1")
