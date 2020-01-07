let ServiceAgreementsProcess = require('../obj/src/container/ServiceAgreementsProcess').ServiceAgreementsProcess;

try {
    new ServiceAgreementsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
