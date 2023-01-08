const express = require("express");
const Service = require("../Models/Services");
const PetLover = require("../Models/PetLover");
const ObjectId = require("mongodb").ObjectID;

//(a) POST /petLovers/:petLoverid/services
exports.postServicesByPetLoverId = async (req, res, next) => {
	console.log(req.body);
	const service = new Service(req.body);
	const petLoverId = req.params["petLoverId"];
	await service.save();

	PetLover.findByIdAndUpdate(petLoverId, { $push: { _services: service._id } })
		.then((result) => {
			console.log(result); // debugging
			result.save();
		})
		.then(() => {
			res.status(201).json(service);
		})
		.catch((err) => {
			res.status(502).send();
			return next(err);
		});
};

//(b) GET /petLovers/:petLoverId/services
exports.getServicesByPetLoverId = (req, res, next) => {
	const petLoverId = req.params["petLoverId"];

	PetLover.findById(petLoverId)
		.populate("_services")
		.then((result) => {
			if (result === null) {
				res.status(404).send({ message: "The services not found." });
				return;
			}
			console.log(result); // debugging
			res.json(result._services);
		})
		.catch((err) => {
			res.status(404).send({ message: "The services not found." });
			return next(err);
		});
};

//(c) GET /petLovers/:petLoverId/services/:serviceId
exports.getServiceByPetLoverById = (req, res, next) => {
	const petLoverId = req.params["petLoverId"];
	const serviceId = req.params["serviceId"];

	PetLover.findById(petLoverId)
		.populate("_services")
		.then((result) => {
			if (result === null) {
				res.status(404).send({ message: "The service_Id not found." });
				return;
			}
			const servicesArray = result._services;
			var service;
			console.log(result._services); // debugging
			for (let i = 0; i < result._services.length; i++) {
				if (servicesArray[i]._id.toString() === serviceId.toString()) {
					service = servicesArray[i];
				}
			}

			res.json(service);
		})
		.catch((err) => {
			res.status(404).send({ message: "The service_Id not found." });
			return next(err);
		});
};

//(d) DELETE /petLovers/:petLoversId/services/:services_id
exports.deleteServiceByPetLoverId = (req, res, next) => {
	PetLover.findByIdAndUpdate(
		{ _id: ObjectId(req.params.petLoverId) },
		{ $pull: { _services: ObjectId(req.params.serviceId) } },
		{ new: true }
	)
		.populate("_services")
		.then((result) => {
			Service.findByIdAndDelete(req.params.serviceId).then((result) => {
				if (result === null) {
					res.status(404).send({ message: "The service_Id not found." });
					return;
				}
				res.json(result);
			});
		})
		.catch((err) => {
			res.status(502).send();
			return next(err);
		});
};

//PUT /services/:serviceId
exports.putServiceById = (req, res, next) => {
	const serviceId = req.params["serviceId"];
	Service.findByIdAndUpdate(serviceId, req.body, { new: true })
		.then((result) => {
			if (result === null) {
				res.status(404).send({ message: "The service_Id not found." });
				return;
			}
			res.json(result);
		})
		.catch((err) => {
			res.status(502).send();
			return next(err);
		});
};

//PATCH /services/:serviceId
exports.patchServiceById = ({ body, params }, res, next) => {
	console.log("test", body);
	Service.findById(params.serviceId)
		.then((result) => {
			if (result === null) {
				res.status(404).send({ message: "The service_Id not found." });
				return;
			}
			if (body.price) {
				result.price = body.price || result.price;
			}
			if (body.description) {
				result.description = body.description || result.description;
			}
			if (body.beauty) {
				result.beauty.brush = body.beauty.brush;
				result.beauty.nailclips = body.beauty.nailclips;
				result.beauty.washing = body.beauty.washing;
			}
			if (body.veterinary) {
				result.veterinary.xRay = body.veterinary.xRay;
				result.veterinary.examination = body.veterinary.examination;
				result.veterinary.examinationSubject = body.veterinary.examinationSubject || result.veterinary.examinationSubject;
			}
			if (body.hostel) {
				result.hostel = body.hostel || result.hostel;
			}
			if (body.walking) {
				result.walking.location = body.walking.location || result.walking.location;
				result.walking.hours = body.walking.hours || result.walking.hours;
			}
            return result.save();
            
		})
        .then(nextresult => {
			console.log(nextresult);
			res.json(nextresult);
        })
		.catch((err) => {
			res.status(502).send({ message: "Not found" });
			return next(err);
		});
};
