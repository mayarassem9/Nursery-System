const Child = require("../Model/childSchema");
const jwt = require("jsonwebtoken");

exports.getAllchilderen = (req, res, next) => {
    Child.find({})
        .then((Child) => { res.status(200).json(Child); })
        .catch((error) => {
            next(error);
        })

}

exports.getchildById = (req, res, next) => {
    const id = req.params.id;

    Child.findById({ _id: id })
        .then((Child) => {
            if (!Child) throw new Error("Envalid id");
            res.status(200).json(Child);
        }).catch((error) => {
            next(error);
        });
}

exports.insertChild = (req, res, next) => {
    const { _id, fullName, age, level, city, street, building } = req.body;
    const address = { city: city, street: street, building: building };
    const child = new Child({ _id: _id, fullName: fullName, age: age, level: level, address: address });

    child.save()
        .then((child) => {
            const token = jwt.sign({
                id: child._id,
                fullName: child.fullName,
                role: "child",
            },
                res.status(201).json({
                    message: "added successfully",
                    child,
                    token
                })
            )

        }).catch((error) => {
            next(error);
        });
}

exports.updateChild = (req, res, next) => {
    const id = req.params.id;
    Child.updateOne({ _id: id }, req.body)
        .then((child) => {
            if (child.nMODIFIED === 0) throw new Error("id not found");
            res.status(200).json({ data: "updated", child });
        }).catch((error) => {
            next(error);
        })

}

exports.deleteChild = (req, res, next) => {
    const id = req.params.id
    Child.findByIdAndDelete(id)
        .then((Child) => {
            if (!Child) {

                throw new Error("child doesn't exist")
            }
            res.status(200).json({ message: "deleted successfully" });
        }).catch((error) => {
            next(error);
        })

}