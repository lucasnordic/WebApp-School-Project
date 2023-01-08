const jwt = require('jsonwebtoken');
const PetLover = require('../Models/PetLover');
const Bcrypt = require('../utils/PasswordHandler')
const Service = require("../Models/Services");

//(a) POST /petLovers
exports.postPetLovers = (req, res, next) => {
    const petLover = new PetLover(req.body);
    const hashedPassword = Bcrypt.hashPassword(req.body.userinfo.password)

    hashedPassword
        .then((result) => {
            petLover.userinfo.password = result
        })
        .catch((err) => {
            res.status(404).send(err)
            return next(err)
        })
        .then(() => {
            petLover.save(function (err, petLover) {
                if (err) { return next(err); }
                res.status(201).json(petLover);
            })
        })
};

//(b) GET /petLovers
exports.getPetLovers = (req, res, next) => {
    PetLover.find().sort({ username: -1 })
        .populate("_services")
        .then((result) => {
            if (result === null) {
                res.status(404).send({ message: "The petLover_Id not found." });
                return;
            }
            console.log(result);
            res.json(result);
        })
        .catch((err) => {
            res.status(404).send();
            return next(err);
        });
};

//(c) DELETE /petLovers
exports.deletePetLovers = (req, res, next) => {
    PetLover.deleteMany({})
        .then((result) => {
            if (result === null) {
                res.status(404).send({ message: "The petLover_Id not found." });
                return;
            }
            res.json(result);
        })
        .catch((err) => {
            res.status(502).send();
            return next(err);
        });
};

//(d) GET /petLovers/:id
exports.getPetLoversById = (req, res, next) => {
    PetLover.findById(req.params.userId)
        .then((result) => {
            if (result === null) {
                res.status(404).send({ message: "The petLover_Id not found." });
                return;
            }
            res.json(result);
        })
        .catch((err) => {
            res.status(404).send();
            return next(err);
        });
};

//(e) PUT /petLovers/:id
exports.putPetLoversById = async (req, res, next) => {
    const password = req.body.userinfo.password
    const petLover = req.body

    if (password) {
        // if there is a new password, try hashing it.
        try {
            const hashedPassword = await Bcrypt.hashPassword(password)
            petLover.userinfo.password = hashedPassword
        } catch (err) {
            res.status(500).send(err)
            next(err);
        }
    }

    PetLover.findByIdAndUpdate(req.params.userId, req.body, { new: true })
        .then((result) => {
            if (result === null) {
                res.status(404).send({ message: "The petLover_Id not found." });
                return;
            }
            res.json(result);
        }).catch((err) => {
            res.status(502).send();
            return next(err);
        });
};

//(f) PATCH /petLovers/:id
exports.patchPetLoversById = async ({ body, params }, res, next) => {
    try {
        const result = await PetLover.findById(params.userId)
        const modified = []
        console.log(body)

        if (result === null) {
            res.status(404).send({ message: "The petLover_Id not found." });
            return;
        }
        if (body.availableHours) {
            modified.push('availableHours')
            result.availableHours = [...body.availableHours, ...result.availableHours];
        }
        if (body.acceptablePets) {
            modified.push('acceptablePets')
            result.acceptablePets = [...body.acceptablePets, ...result.acceptablePets];
        }
        if (body._services) {
            modified.push('_services')
            result._services = [...body._services, ...result._services];
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

//(g) DELETE /petLovers/:id
exports.deletePetLoversbyId = (req, res, next) => {
    PetLover.findById(req.params.userId)
        .then((result) => {
            for (var i = 0; i < result._services.length; i++) {
                // find services and delete them as well
                Service.findByIdAndDelete(result._services[i])
                    .then((result) => {
                        if (result === null) {
                            res.status(404).send({ message: "The service_Id not found." });
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
            PetLover.findByIdAndDelete(req.params.userId)
                .then((result) => {
                    if (result === null) {
                        res.status(404).send({ message: "The petLover_Id not found." });
                        return;
                    }
                    res.json(result);
                }).catch((err) => {
                    res.status(502).send();
                    return next(err);
                });
        })
};

// Login PetLover
exports.loginPetLover = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    PetLover.findOne({ 'userinfo.username': username }, function (err, petLover) {
        if (err) {
            res.status(404).send({ message: "Server error" });
            return next(err);
        }
        if (petLover === null) {
            res.status(401).send({ message: "The user was not found" }); // we don't want hackers to know what they get wrong. So, same error
            return;
        }

        Bcrypt
            .comparePassword(password, petLover.userinfo.password)
            .then((result) => {
                if (result) {
                    console.log('The user password was a match')
                    let token = jwt.sign({ userId: petLover._id }, 'secretkey'); // TODO: secretkey should be more complex for security reasons
                    return res.status(200).json({
                        title: 'login success',
                        token: token,
                        userId: petLover._id,
                        userType: 'petlover'
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
