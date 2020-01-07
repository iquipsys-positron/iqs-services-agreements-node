import { ConfigParams } from 'pip-services3-commons-node';

import { ServiceAgreementsFilePersistence } from '../../src/persistence/ServiceAgreementsFilePersistence';
import { ServiceAgreementsPersistenceFixture } from './ServiceAgreementsPersistenceFixture';

suite('ServiceAgreementsFilePersistence', ()=> {
    let persistence: ServiceAgreementsFilePersistence;
    let fixture: ServiceAgreementsPersistenceFixture;
    
    setup((done) => {
        persistence = new ServiceAgreementsFilePersistence('./data/service_agreements.test.json');

        fixture = new ServiceAgreementsPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
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