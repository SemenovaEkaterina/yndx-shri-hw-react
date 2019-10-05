module.exports = fn =>
    (req, res) => {
        Promise.resolve(fn(req, res))
            .catch((error) => {
                console.log(error);
                res.sendStatus(500);
            });
    };