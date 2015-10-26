'use strict';

angular.module('core').controller('exitFormController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    var today = new Date();
    var month = today.getMonth(); //months from 1-12
    var day = today.getDate();
    var year = today.getFullYear();
    today = new Date(year, month, day);
    $scope.endingDate = today;

    // Do they want some prepopulated values?
    $scope.patientInfo = {
        endingReason: "Reached ideal weight",
        endingReasonOther: "",
        startWeightKG: 50,
        finalWeightKG: 20,
        startWeightLB: 60,
        finalWeightLB: 40,
        startBCS: 3,
        finalBCS: 5,
        foodBrand: "",
        cups: 2,
        perDay: 3,
    };

    $scope.patientInfo.weightLossTotalKG = function () {
        var startWeight = $scope.patientInfo.startWeightKG;
        var finalWeight = $scope.patientInfo.finalWeightKG;

        return (startWeight-finalWeight).toFixed(2);
    };

    $scope.patientInfo.weightLossTotalLB = function () {
        var startWeight = $scope.patientInfo.startWeightLB;
        var finalWeight = $scope.patientInfo.finalWeightLB;

        return (startWeight-finalWeight).toFixed(2);
    };

    $scope.startToLB = function () {
        var toLB = $scope.patientInfo.startWeightKG * 2.20462;
        $scope.patientInfo.startWeightLB = Number(toLB.toFixed(2));
    };

    $scope.finalToLB = function () {
        var toLB = $scope.patientInfo.finalWeightKG * 2.20462;
        $scope.patientInfo.finalWeightLB = Number(toLB.toFixed(2));
    };

    $scope.startToKG = function () {
        var toKG = $scope.patientInfo.startWeightLB * 0.453592;
        $scope.patientInfo.startWeightKG = Number(toKG.toFixed(2));
    };

    $scope.finalToKG = function () {
        var toKG = $scope.patientInfo.finalWeightLB * 0.453592;
        $scope.patientInfo.finalWeightKG = Number(toKG.toFixed(2));
    };

    $scope.ownerQuestions = {
        name: "",
        easyToAdminister: "Somewhat easy",
        easyAdjustment: "After a few days",
        positiveImpact: "Y",
        ownerComments: "",
    };

    $scope.finalApproval = {
        technician: "",
        veterinarian: "",
        reviewer: ""
    };
  }
]);
