const Pet = require("../Models/Pets");
const PetOwner = require("../Models/PetOwner");
const ObjectId = require("mongodb").ObjectID;

//(a) POST /petOwners/:petOwnerid/pets
exports.postPetsByPetOwnerId = async (req, res, next) => {
	const pet = new Pet(req.body);
	const petOwnerId = req.params["petOwnerId"];
	await pet.save();

	PetOwner.findByIdAndUpdate(petOwnerId, { $push: { _pets: pet._id } })
		.then((result) => {
			console.log(result); // debugging
			return result.save();
		})
		.then(() => {
			res.status(201).json(pet);
		})
		.catch((err) => {
			res.status(502).send();
			return next(err);
		});
};

//(b) GET /petOwners/:petOwner_id/pets
exports.getPetsByPetOwnerId = (req, res, next) => {
	const petOwnerId = req.params["petOwnerId"];

	PetOwner.findById(petOwnerId)
		.populate("_pets")
		.then((result) => {
			if (result === null) {
				res.status(404).send({ message: "The pets not found." });
				return;
			}
			console.log(result); // debugging
			res.json(result._pets);
		})
		.catch((err) => {
			res.status(404).send({ message: "The pets not found." });
			return next(err);
		});
};

//(c) GET /petOwners/:petOwnerid/pets/:petid
exports.getPetOwnersAndPetsById = (req, res, next) => {
	const petOwnerId = req.params["petOwnerId"];
	const petId = req.params["petId"];

	PetOwner.findById(petOwnerId)
		.populate("_pets")
		.then((result) => {
			if (result === null) {
				res.status(404).send({ message: "The pet_Id not found." });
				return;
			}
			const petsArray = result._pets;
			var pet;
			console.log(result._pets); // debugging
			for (let i = 0; i < result._pets.length; i++) {
				if (petsArray[i]._id.toString() === petId.toString()) {
					pet = petsArray[i];
				}
			}

			res.json(pet);
		})
		.catch((err) => {
			res.status(404).send({ message: "The pet_Id not found." });
			return next(err);
		});
};

//(d) DELETE /petOwners/:petOwner_id/pets/:pet_id
exports.deletePetOwnersAndPetsbyId = (req, res, next) => {
	PetOwner.findByIdAndUpdate(
		{ _id: ObjectId(req.params.petOwnerId) },
		{ $pull: { _pets: ObjectId(req.params.petId) } },
		{ new: true }
	)
		.populate("_pets")
		.then((result) => {
			Pet.findByIdAndDelete(req.params.petId).then((result) => {
				if (result === null) {
					res.status(404).send({ message: "The pet_Id not found." });
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

//PUT /pets/:petId
exports.putPetById = (req, res, next) => {
	const petId = req.params["petId"];
	Pet.findByIdAndUpdate(petId, req.body, { new: true })
		.then((result) => {
			if (result === null) {
				res.status(404).send({ message: "The pet_Id not found." });
				return;
			}
			res.json(result);
		})
		.catch((err) => {
			res.status(502).send();
			return next(err);
		});
};

//PATCH /pets/petId
exports.patchPetById = ({ body, params }, res, next) => {
	Pet.findById(params.petId)
		.then((result) => {
			if (result === null) {
				res.status(404).send({ message: "The pet_Id not found." });
				return;
			}
			if (body.name) {
				result.name = [...body.name, ...result.name];
			}
			if (body.gender) {
				result.gender = [...body.gender, ...result.gender];
			}
			if (body.type) {
				result.type = [...body.type, ...result.type];
			}
			//result._id = body._id;
			result.allergies = body.allergies || result.allergies;
			result.foodPreferences = body.foodPreferences || result.foodPreferences

			result.save();

			console.log(result);
			res.json(result);

		}).catch((err) => {
			res.status(502).send({ message: "Not found" });
			return next(err);
		});
};
