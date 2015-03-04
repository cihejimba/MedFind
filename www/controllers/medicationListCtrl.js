angular.module("MedFind")
    .constant("medicationListActiveClass", "btn-primary")
    .constant("medicationListPageCount", 10)
    .controller("medicationListCtrl", function($scope, $filter, medicationListPageCount, medicationListActiveClass) {
        $scope.selectedPage = 1;
        $scope.pageSize = medicationListPageCount;

        $scope.selectedPage = function(newPage) {
            $scope.selectedPage = newPage;
        }
        $scope.getPageClass = function(page) {
            return $scope.selectedPage == page ? medicationListActiveClass : "";
        }
    });