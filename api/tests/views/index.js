const sinon = require("sinon");

const createResponseSpy = () => ({
    json: sinon.spy(),
    sendStatus: sinon.spy(),
});

module.exports = {createResponseSpy};