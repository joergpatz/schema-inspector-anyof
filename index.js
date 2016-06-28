import SchemaInspector from 'schema-inspector';

// The value of this keyword MUST be an array. This array MUST have at least one element.
// Each element of this array MUST be an object, and each object MUST be a valid JSON Schema.

const resultGenerator = function* (schemas, candidates) {

    //destructure in for-of loop to get the indices of the candidates
    for (let [key, candidate] of candidates.entries()) {

        let initResult = {index: key};
        let result = {};
        for (let schema of schemas['$anyOf']) {

            let r = SchemaInspector.validate(schema, candidate);
            result = Object.assign(initResult, r);
            if (r.valid) break;
        }

        yield result;
    }

};

export default function (schemas, candidates) {

    if (!(candidates instanceof Array) || candidates.length == 0) {
        this.report('candidates must be an array with at least one element');
        return false;
    }

    for (let result of resultGenerator(schemas, candidates)) {
        if (!result.valid) {
            this.report('candidate at index ' + result.index + ' ' + result.format());
            return false;
        }
    }

};
