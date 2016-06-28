import 'babel-polyfill';
import assert from 'assert';
import SchemaInspector from 'schema-inspector';
import anyOf from './..';

const SubSchema1 = {
    type: 'object',
    properties: {
        customSchemaObject1: {
            type: 'string'
        }
    }
};

const SubSchema2 = {
    type: 'object',
    properties: {
        customSchemaObject2: {
            type: 'string'
        }
    }
};

const SampleSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        items: {
            type: 'array',
            $anyOf: [SubSchema1, SubSchema2],
            exec: anyOf
        }
    }
};

const sampleData = {
    name: 'MyObject',
    items: [
        {
            customSchemaObject1: 'Candidate 1'
        },
        {
            customSchemaObject2: 'Candidate 2'
        }
    ]
};

// The value of this keyword MUST be an array. This array MUST have at least one element.
// Each element of this array MUST be an object, and each object MUST be a valid JSON Schema.

describe('#any-Of', () => {
    it('candidates should be an array', () => {
        assert.equal(Array.isArray(sampleData.items), true);
    });
    it('candidates should have at least one item', () => {
        assert.equal(sampleData.items.length > 0, true);
    });
    it('each candidate item should be an object', () => {
        for (let item of sampleData.items) {
            assert.equal(item === Object(item), true);
        }
    });
    it('each object should have an valid schema', () => {
        let result1 = SchemaInspector.validate(SubSchema1, sampleData.items[0]);
        assert.equal(result1.valid, true);
        let result2 = SchemaInspector.validate(SubSchema2, sampleData.items[1]);
        assert.equal(result2.valid, true);
    });
});

describe('#custom checker', () => {
    it('result should be an object', () => {
        let result = SchemaInspector.validate(SampleSchema, sampleData);
        assert.equal(result === Object(result), true);
    });
    it('result should be valid', () => {
        let result = SchemaInspector.validate(SampleSchema, sampleData);
        assert.equal(result.valid, true);
    });
    it('result should be not valid if no schema for an item is found', () => {
        sampleData.items.push({customSchemaObject3: 'Candidate 3'});
        let result = SchemaInspector.validate(SampleSchema, sampleData);
        assert.equal(result.valid, false);
    });
});
