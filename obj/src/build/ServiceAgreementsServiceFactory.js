"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const ServiceAgreementsMongoDbPersistence_1 = require("../persistence/ServiceAgreementsMongoDbPersistence");
const ServiceAgreementsFilePersistence_1 = require("../persistence/ServiceAgreementsFilePersistence");
const ServiceAgreementsMemoryPersistence_1 = require("../persistence/ServiceAgreementsMemoryPersistence");
const ServiceAgreementsController_1 = require("../logic/ServiceAgreementsController");
const ServiceAgreementsHttpServiceV1_1 = require("../services/version1/ServiceAgreementsHttpServiceV1");
class ServiceAgreementsServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(ServiceAgreementsServiceFactory.MemoryPersistenceDescriptor, ServiceAgreementsMemoryPersistence_1.ServiceAgreementsMemoryPersistence);
        this.registerAsType(ServiceAgreementsServiceFactory.FilePersistenceDescriptor, ServiceAgreementsFilePersistence_1.ServiceAgreementsFilePersistence);
        this.registerAsType(ServiceAgreementsServiceFactory.MongoDbPersistenceDescriptor, ServiceAgreementsMongoDbPersistence_1.ServiceAgreementsMongoDbPersistence);
        this.registerAsType(ServiceAgreementsServiceFactory.ControllerDescriptor, ServiceAgreementsController_1.ServiceAgreementsController);
        this.registerAsType(ServiceAgreementsServiceFactory.HttpServiceDescriptor, ServiceAgreementsHttpServiceV1_1.ServiceAgreementsHttpServiceV1);
    }
}
exports.ServiceAgreementsServiceFactory = ServiceAgreementsServiceFactory;
ServiceAgreementsServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-agreements", "factory", "default", "default", "1.0");
ServiceAgreementsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-agreements", "persistence", "memory", "*", "1.0");
ServiceAgreementsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-agreements", "persistence", "file", "*", "1.0");
ServiceAgreementsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-agreements", "persistence", "mongodb", "*", "1.0");
ServiceAgreementsServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-agreements", "controller", "default", "*", "1.0");
ServiceAgreementsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-agreements", "service", "http", "*", "1.0");
//# sourceMappingURL=ServiceAgreementsServiceFactory.js.map