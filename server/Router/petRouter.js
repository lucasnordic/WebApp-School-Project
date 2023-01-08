const express = require('express');
const router = express.Router();
const controller = require('../Controller/petController');

//MS1 -> Task 3:
router.post('/:petOwnerId/pets', controller.postPetsByPetOwnerId);
router.get('/:petOwnerId/pets', controller.getPetsByPetOwnerId);
router.get('/:petOwnerId/pets/:petId', controller.getPetOwnersAndPetsById);
router.delete('/:petOwnerId/pets/:petId', controller.deletePetOwnersAndPetsbyId);

//Misc
router.put('/pets/:petId', controller.putPetById);
router.patch('/pets/:petId', controller.patchPetById);

module.exports = router;