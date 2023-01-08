const express = require('express');
const router = express.Router();
const controller = require('../Controller/petLovers');

//Public Requests
router.post('/', controller.postPetLovers);
router.get('/', controller.getPetLovers);

/**
 * Authorisation Required Requests
 */
router.get('/:userId', controller.getPetLoversById);
router.put('/:userId', controller.putPetLoversById);
router.patch('/:userId', controller.patchPetLoversById);
router.delete('/:userId', controller.deletePetLoversbyId);

//This request should require insane amounts of authorization
router.delete('/', controller.deletePetLovers);


//Export:
module.exports = router;
