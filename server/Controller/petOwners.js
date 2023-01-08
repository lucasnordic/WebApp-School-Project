const jwt = require('jsonwebtoken');
const PetOwner = require('../Models/PetOwner');
const Bcrypt = require('../utils/PasswordHandler')
const Pets = require('../Models/Pets')

// TODO: go through'em once again before front-end
//(a) POST /petOwners
exports.postPetOwners = (req, res, next) => {
    const petOwner = new PetOwner(req.body);
    const hashedPassword = Bcrypt.hashPassword(req.body.userinfo.password)

    hashedPassword
        .then((result) => {
            petOwner.userinfo.password = result
        })
        .catch((err) => {
            res.status(404).send(err)
            return next(err)
        })
        .then((result) => {
            petOwner.save(function (err, petOwner) {
                if (err) { return next(err); }
                res.status(201).json(petOwner);
            })
        })
};

//(b) GET /petOwners
exports.getPetOwners = (req, res, next) => {
    PetOwner.find().sort({ username: -1 })
        .then((result) => {
            if (result === null) {
                res.status(404).send({ message: "The petOwner_Id not found." });
                return;
            }
            res.json(result);
        })
        .catch((err) => {
            res.status(404).send();
            return next(err);
        });
};

//(c) DELETE /petOwners
exports.deletePetOwners = (req, res, next) => {
    PetOwner.deleteMany({})
        .then((result) => {
            if (result === null) {
                res.status(404).send({ message: "The petOwner_Id not found." });
                return;
            }
            res.json(result);
        })
        .catch((err) => {
            res.status(502).send();
            return next(err);
        });
};

//(d) GET /petOwners/:id
exports.getPetOwnersById = (req, res, next) => {
    PetOwner.findById(req.params.userId)
        .then((result) => {
            if (result === null) {
                res.status(404).send({ message: "The petOwner_Id not found." });
                return;
            }
            res.json(result);
        })
        .catch((err) => {
            res.status(404).send();
            return next(err);
        });
};

//(e) PUT /petOwners/:id
exports.putPetOwnersById = async (req, res, next) => {
    const password = req.body.userinfo.password
    const petOwner = req.body

    if (password) {
        // if there is a new password, try hashing it.
        try {
            const hashedPassword = await Bcrypt.hashPassword(password)
            petOwner.userinfo.password = hashedPassword
        } catch (err) {
            res.status(500).send(err)
            next(err);
        }
    }

    PetOwner.findByIdAndUpdate(req.params.userId, petOwner, { new: true })
        .then((result) => {
            if (result === null) {
                res.status(404).send({ message: "The petOwner_Id not found." });
                return;
            }
            res.json(result);
        }).catch((err) => {
            res.status(502).send();
            return next(err);
        });

};

//(f) PATCH /petOwners/:id
exports.patchPetOwnersById = async ({ body, params }, res, next) => {
    try {
        const result = await PetOwner.findById(params.userId)
        const modified = []

        if (result === null) {
            res.status(404).send({ message: "The petOwner_Id not found." });
            return;
        }
        if (body._pets) {
            modified.push('_pets')
            result._pets = [...body._pets, ...result._pets];
        }
        if (body.username) {
            modified.push('userinfo')
            result.userinfo.username = body.username
        }
        if (body.fullName) {
            modified.push('userinfo')
            result.userinfo.fullName = body.fullName
        }
        if (body.email) {
            modified.push('userinfo')
            result.userinfo.contactInfo.email = body.email
        }
        if (body.phoneNumber) {
            modified.push('userinfo')
            result.userinfo.contactInfo.phoneNumber = body.phoneNumber
        }
        if (body.address) {
            modified.push('userinfo')
            result.userinfo.contactInfo.address = body.address
        }
        if (body.password) {
            // if there is a new password, try hashing it.
            try {
                const hashedPassword = await Bcrypt.hashPassword(body.password)
                result.userinfo.password = hashedPassword
                modified.push('userinfo')
            } catch (err) {
                res.status(500).send(err)
                next(err);
            }
        }

        // Go through each marked attribute and specify them as edited for mongoose
        modified.forEach(i => {
            result.markModified(i);
        });
        await result.save();
        res.json(result);

    } catch (err) {
        res.status(502).send({ message: "Not found" });
        return next(err);
    }
};

//(g) DELETE /petOwners/:id
exports.deletePetOwnersById = (req, res, next) => {
    PetOwner.findById(req.params.userId)
        .then((result) => {
            for (var i = 0; i < result._pets.length; i++) {
                // find services and delete them as well
                Pets.findByIdAndDelete(result._pets[i])
                    .then((result) => {
                        if (result === null) {
                            res.status(404).send({ message: "The pet_Id was not found." });
                            return;
                        }
                    })
                    .catch((err) => {
                        res.status(502).send();
                        return next(err);
                    })
            }
        })
        .then(() => {
            PetOwner.findByIdAndDelete(req.params.userId)
                .then((result) => {
                    if (result === null) {
                        res.status(404).send({ message: "The petOwner_Id was not found." });
                        return;
                    }
                    res.json(result);
                }).catch((err) => {
                    res.status(502).send();
                    return next(err);
                });
        })
};

// Login PetOwner
exports.loginPetOwner = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    PetOwner.findOne({ 'userinfo.username': username }, function (err, petOwner) {
        if (err) {
            res.status(404).send({ message: "Server error" });
            return next(err);
        }
        if (petOwner === null) {
            res.status(401).send({ message: "The user was not found" }); // we don't want hackers to know what they get wrong. So, same error
            return;
        }

        Bcrypt
            .comparePassword(password, petOwner.userinfo.password)
            .then((result) => {
                if (result) {
                    console.log('The user password was a match')
                    let token = jwt.sign({ userId: petOwner._id }, 'secretkey'); // TODO: secretkey should be more complex for security reasons
                    return res.status(200).json({
                        title: 'login success',
                        token: token,
                        userId: petOwner._id,
                        userType: 'petowner'
                    })
                } else {
                    res.status(401).send({ message: "The user was not found" }); // we don't want hackers to know what they get wrong. So, same error
                }
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    })
}
