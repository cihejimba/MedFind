'use strict';
/**
 * Created by Kal on 2014-11-11.
 */
var MedFindServices = angular.module('MedFindServices', [ngResource]);

MedFindServices.factory('Medication',['$resource', function ($resource) {
    return $resource('Medications/:Medication.json',{}, {
        query: {method:'GET', params:{}}
    });
}])