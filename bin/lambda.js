let ServiceAgreementsLambdaFunction = require('../obj/src/container/ServiceAgreementsLambdaFunction').ServiceAgreementsLambdaFunction;

module.exports = new ServiceAgreementsLambdaFunction().getHandler();