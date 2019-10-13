import sinon from 'sinon';

export const createResponseSpy = () => ({
    json: sinon.spy(),
    sendStatus: sinon.spy(),
    setHeader: sinon.spy(),
});