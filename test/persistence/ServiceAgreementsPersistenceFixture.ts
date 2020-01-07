let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { ServiceAgreementV1 } from '../../src/data/version1/ServiceAgreementV1';

import { IServiceAgreementsPersistence } from '../../src/persistence/IServiceAgreementsPersistence';

let AGREEMENT1: ServiceAgreementV1 = {
    id: '1',
    number: 'A',
    create_time: new Date(),
    active: true,
    start_time: new Date(2017, 2, 1),
    end_time: new Date(2017, 3, 1),
    company: 'Company 1'
};
let AGREEMENT2: ServiceAgreementV1 = {
    id: '2',
    number: 'B',
    create_time: new Date(),
    active: true,
    start_time: new Date(2017, 2, 1),
    end_time: new Date(2017, 3, 1),
    company: 'Company 2'
};
let AGREEMENT3: ServiceAgreementV1 = {
    id: '3',
    number: 'C',
    create_time: new Date(),
    active: true,
    start_time: new Date(2017, 3, 1),
    end_time: new Date(2017, 4, 1),
    company: 'Company 1'
};

export class ServiceAgreementsPersistenceFixture {
    private _persistence: IServiceAgreementsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateServiceAgreements(done) {
        async.series([
        // Create one agreement
            (callback) => {
                this._persistence.create(
                    null,
                    AGREEMENT1,
                    (err, agreement) => {
                        assert.isNull(err);

                        assert.isObject(agreement);
                        assert.equal(agreement.number, AGREEMENT1.number);
                        assert.equal(agreement.active, AGREEMENT1.active);
                        assert.equal(agreement.company, AGREEMENT1.company);

                        callback();
                    }
                );
            },
        // Create another agreement
            (callback) => {
                this._persistence.create(
                    null,
                    AGREEMENT2,
                    (err, agreement) => {
                        assert.isNull(err);

                        assert.isObject(agreement);
                        assert.equal(agreement.number, AGREEMENT2.number);
                        assert.equal(agreement.active, AGREEMENT2.active);
                        assert.equal(agreement.company, AGREEMENT2.company);

                        callback();
                    }
                );
            },
        // Create yet another agreement
            (callback) => {
                this._persistence.create(
                    null,
                    AGREEMENT3,
                    (err, agreement) => {
                        assert.isNull(err);

                        assert.isObject(agreement);
                        assert.equal(agreement.number, AGREEMENT3.number);
                        assert.equal(agreement.active, AGREEMENT3.active);
                        assert.equal(agreement.company, AGREEMENT3.company);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let agreement1: ServiceAgreementV1;

        async.series([
        // Create items
            (callback) => {
                this.testCreateServiceAgreements(callback);
            },
        // Get all agreements
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        agreement1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the agreement
            (callback) => {
                agreement1.number = 'A1';

                this._persistence.update(
                    null,
                    agreement1,
                    (err, agreement) => {
                        assert.isNull(err);

                        assert.isObject(agreement);
                        assert.equal(agreement.number, 'A1');
                        assert.equal(agreement.id, agreement1.id);

                        callback();
                    }
                );
            },
        // Delete agreement
            (callback) => {
                this._persistence.deleteById(
                    null,
                    agreement1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete agreement
            (callback) => {
                this._persistence.getOneById(
                    null,
                    agreement1.id,
                    (err, agreement) => {
                        assert.isNull(err);

                        assert.isNull(agreement || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create agreements
            (callback) => {
                this.testCreateServiceAgreements(callback);
            },
        // Get agreements filtered by search
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        search: '2'
                    }),
                    new PagingParams(),
                    (err, agreements) => {
                        assert.isNull(err);

                        assert.isObject(agreements);
                        assert.lengthOf(agreements.data, 1);

                        callback();
                    }
                );
            },
        // Get agreements for number
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        number: 'A'
                    }),
                    new PagingParams(),
                    (err, agreements) => {
                        assert.isNull(err);

                        assert.isObject(agreements);
                        assert.lengthOf(agreements.data, 1);

                        callback();
                    }
                );
            },
        // Get agreements by number/id
        (callback) => {
            this._persistence.getPageByFilter(
                null,
                FilterParams.fromValue({
                    number: '1'
                }),
                new PagingParams(),
                (err, agreements) => {
                    assert.isNull(err);

                    assert.isObject(agreements);
                    assert.lengthOf(agreements.data, 1);

                    callback();
                }
            );
        },
    // Get agreements filtered by company
        (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        company: 'Company 1'
                    }),
                    new PagingParams(),
                    (err, agreements) => {
                        assert.isNull(err);

                        assert.isObject(agreements);
                        assert.lengthOf(agreements.data, 2);

                        callback();
                    }
                );
            }
        ], done);
    }

}
