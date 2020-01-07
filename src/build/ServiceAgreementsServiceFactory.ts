import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { ServiceAgreementsMongoDbPersistence } from '../persistence/ServiceAgreementsMongoDbPersistence';
import { ServiceAgreementsFilePersistence } from '../persistence/ServiceAgreementsFilePersistence';
import { ServiceAgreementsMemoryPersistence } from '../persistence/ServiceAgreementsMemoryPersistence';
import { ServiceAgreementsController } from '../logic/ServiceAgreementsController';
import { ServiceAgreementsHttpServiceV1 } from '../services/version1/ServiceAgreementsHttpServiceV1';

export class ServiceAgreementsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("iqs-services-agreements", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("iqs-services-agreements", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("iqs-services-agreements", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("iqs-services-agreements", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("iqs-services-agreements", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("iqs-services-agreements", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(ServiceAgreementsServiceFactory.MemoryPersistenceDescriptor, ServiceAgreementsMemoryPersistence);
		this.registerAsType(ServiceAgreementsServiceFactory.FilePersistenceDescriptor, ServiceAgreementsFilePersistence);
		this.registerAsType(ServiceAgreementsServiceFactory.MongoDbPersistenceDescriptor, ServiceAgreementsMongoDbPersistence);
		this.registerAsType(ServiceAgreementsServiceFactory.ControllerDescriptor, ServiceAgreementsController);
		this.registerAsType(ServiceAgreementsServiceFactory.HttpServiceDescriptor, ServiceAgreementsHttpServiceV1);
	}
	
}
