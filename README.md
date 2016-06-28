# schema-inspector-anyOf
Custom-Checker "anyOf" for [Schema-Inspector](http://atinux.github.io/schema-inspector/)

This ES6 module will give you the ability to validate a collection of items against [any-of](http://spacetelescope.github.io/understanding-json-schema/reference/combining.html#anyof) sub schemas.

## Install

```bash
$ npm i schema-inspector-anyof
```

## Example:

```javascript
import SchemaInspector from 'schema-inspector';
import anyOf from 'schema-inspector-anyOf';

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

SchemaInspector.validate(SampleSchema, sampleData); // Valid

sampleData.items.push({customSchemaObject3: 'Candidate 3'});
SchemaInspector.validate(SampleSchema, sampleData); // Invalid: candidate at index 2 Property @.customSchemaObject2: is missing and not optional
```

## Test

```bash
$ npm test
```
