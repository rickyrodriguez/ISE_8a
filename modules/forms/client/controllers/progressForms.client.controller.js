'use strict';

angular.module('forms').controller('progressFormsController', ['$scope', 'Authentication', 'ProgressFormsService', 'ActivePatient', 'PatientsService',
  function ($scope, Authentication, ProgressFormsService, ActivePatient, PatientsService) {
    
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.activePatient = ActivePatient.getActivePatient();

    console.log($scope.activePatient);
    
    // Create new progress form
    $scope.createProgressForm = function () {
        // Create new ProgressForm object

        var progressForm = new ProgressFormsService({
            weight: this.weight,
            trimauxilUse: this.trimauxilUse,
            weightLossAppropriate: this.weightLossAppropriate,
            foodChanged: this.foodChanged,
            comments: this.comments,
            techID: this.techID,
            vetID: this.vetID,
            patient: ActivePatient.getActivePatient()._id
        });

        console.log(ActivePatient.getActivePatient());


        progressForm.$save(function (progressFormResponse) {
            // Function that is executed after save
            console.log("progress form ID: " + progressFormResponse._id + "  eh?");
            console.log(progressFormResponse);

            var patient = new PatientsService( {
                    _id: $scope.activePatient._id,
                    newProgressForm: progressFormResponse._id,
                    formSave: true
                });

            patient.$update(function (patientAddFormResponse) {
                
                ActivePatient.updateActivePatient();

                // Redirect to overview
                //$location.go('/home');
            });
        });
    };

    


    // Multidimensional array to include priority
    $scope.clients = [{
        petName: "Puddle", 
        clientName: "John Doe",
        phone: "(000) 000-0000",
        contactTime: "12:00AM",
        petInitWeight: "3 lbs",
        petIdealWeight: "2 lbs"
    }];




  }
]);
