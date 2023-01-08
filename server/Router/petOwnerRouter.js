const express = require('express');
const router = express.Router();
const controller = require('../Controller/petOwners');

//Public Requests
router.post('/', controller.postPetOwners);
router.get('/', controller.getPetOwners);

/**
 * Authorisation Required Requests
 */
router.get('/:userId', controller.getPetOwnersById);
router.put('/:userId', controller.putPetOwnersById);
router.patch('/:userId', controller.patchPetOwnersById);
router.delete('/:userId', controller.deletePetOwnersById);

//This request should require insane amounts of authorization
router.delete('/', controller.deletePetOwners);


//Export:
module.exports = router;