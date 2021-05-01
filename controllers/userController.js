User = require('./../models/userModel');
bcrypt = require('bcrypt');
jwt = require('jsonwebtoken');
fs = require('fs');


let config = JSON.parse(fs.readFileSync('app.config'));

exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};

exports.new = async function (req, res) {
    var user = new User();

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        user.email = req.body.email,
            user.userName = req.body.userName,
            user.firstName = req.body.firstName,
            user.lastName = req.body.lastName,
            user.password = hashedPassword,
            user.credLevel = req.body.credLevel // 1= system, 2=admin, 3=user, 4=unregisterdUser 

        user.save(function (err) {
            if (err)
                res.json(err);
            else {
                var token = jwt.sign({
                    id: user._id
                }, config.secret, {
                    expiresIn: 86400
                })
                res.status(200).send({
                    auth: true,
                    token: token,
                    user: user
                });
            }
        })
    } catch {
        res.status(500).send()
    }
};

exports.login = function (req, res) {
    User.findOne({
        'email': req.body.user
    }, async function (err, user) {
        if (user == null) {
            res.status(400).send("No user found")
        }
        console.log(user)
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                var token = jwt.sign({
                    id: user._id
                }, config.secret, {
                    expiresIn: 86400
                })
                res.status(200).send({
                    auth: true,
                    token: token,
                    user: user
                });
            } else {
                res.status(401).send({
                    auth: false,
                    token: null
                })
            }
        } catch {
            res.status(500).send()
        }
    })
}

exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        else{
            res.json({
                message: 'User details loading..',
                data: user
            });
        }
    });
};

exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        else {
            user.email = req.body.email,
                user.username = req.body.userName,
                user.firstName = req.body.firstName,
                user.lastName = req.body.lastName,
                user.credLevel = req.body.credLevel
            user.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'User Info updated',
                    data: user
                });
            });
        }
    });
};

exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, contact) {
        if (err)
            res.send(err);
        else{
            res.json({
                status: "success",
                message: 'User deleted'
            });
        }
    });
};