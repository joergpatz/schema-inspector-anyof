import SchemaInspector from 'schema-inspector';
import anyOf from './index';

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
            customSchemaObject1: 'Just testing'
        },
        {
            customSchemaObject2: 'Just another test'
        }
    ]
};

const result = SchemaInspector.validate(SampleSchema, sampleData);
