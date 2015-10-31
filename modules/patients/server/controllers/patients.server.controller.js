'use strict';


var path = require('path'),
    mongoose = require('mongoose'),
    Patient = mongoose.model('Patient'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
    

// Saves the progress form
exports.saveNewPatient = function (req, res) {
    var patient = new Patient(req.body);

    patient.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(patient);
        }
    });
};


exports.updatePatient = function (req, res) {
    var patient = req.body;


    if(patient.formSave) {
        // Adding new form reference to patient document
        //delete patient.formSave;
        console.log("Update patient 1");

        if(patient.enrollmentForm) {
            // add enrollment form
            Patient.findByIdAndUpdate(
                patient._id,
                {
                    $set: { enrollmentForm: patient.enrollmentForm } 
                },
                {
                    safe: true,
                    new: true
                },
                function(err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        res.json(patient);
                    }
                }

            );
        }
        else if(patient.exitForm) {
            // add exit form
            Patient.findByIdAndUpdate(
                patient._id,
                {
                    $set: { 'exitForm': patient.exitForm } 
                },
                {
                    safe: true,
                    new: true
                },
                function(err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        res.json(patient);
                    }
                }

            );
        }
        else if(patient.newProgressForm) {
            // push progress form
            console.log("Update patient 2");
            Patient.findByIdAndUpdate(
                patient._id,
                {
                    $push: { 'progressForms': patient.newProgressForm } 
                },
                {
                    safe: true,
                    new: true
                },
                function(err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        res.json(patient);
                        console.log("Update patient 3");
                    }
                }

            );
        }
    }
    else {
        // All other edits would be done here
    }
};

exports.getPatient = function (req, res) {
    res.json(req.patient);
};


exports.patientById = function (req, res, next, id) {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Patient Id is invalid'
        });
    }

    Patient.findById(id).populate('enrollmentForm progressForms exitForm petOwner').exec( function (err, foundPatient) {
        if (err) {
            return next(err);
        } 
        else if (!foundPatient) {
            return res.status(404).send({
                message: 'No patient found'
            });
        }
        req.patient = foundPatient;
        next();
    });





};