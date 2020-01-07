import { ConfigParams } from 'pip-services3-commons-node';

import { ServiceAgreementsMemoryPersistence } from '../../src/persistence/ServiceAgreementsMemoryPersistence';
import { ServiceAgreementsPersistenceFixture } from './ServiceAgreementsPersistenceFixture';

suite('ServiceAgreementsMemoryPersistence', ()=> {
    let persistence: ServiceAgreementsMemoryPersistence;
    let fixture: ServiceAgreementsPersistenceFixture;
    
    setup((done) => {
        persistence = new ServiceAgreementsMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new ServiceAgreementsPersistenceFixture(persistence);
        
        persistence.open(null, done);
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});