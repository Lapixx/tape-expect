const tape = require("tape");
const expect = require("expect");

// expectation methods to wrap
const assertions = [
    "toBeA",
    "toBeAn",
    "toNotBeA",
    "toNotBeAn",
    "toBeTruthy",
    "toExist",
    "toBeFalsy",
    "toNotExist",
    "toBeFewerThan",
    "toBeLessThan",
    "toBeMoreThan",
    "toBeGreaterThan",
    "toContain",
    "toInclude",
    "toNotContain",
    "toExclude",
    "toNotInclude",
    "toContainKeys",
    "toIncludeKeys",
    "toNotContainKeys",
    "toExcludeKeys",
    "toNotIncludeKeys",
    "toContainKey",
    "toIncludeKey",
    "toNotContainKey",
    "toNotIncludeKey",
    "toExcludeKey"
];

// add the t.expect() method
tape.Test.prototype.expect = function (sut) {

    const tapeInstance = this;
    const originalExpectation = expect(sut);

    return assertions.reduce((expectation, curr) => {

        const originalAssert = expectation[curr].bind(originalExpectation);

        expectation[curr] = (expected, message) => {

            try {
                originalAssert(expected, message);
                tapeInstance._assert(true, { message, operator: expect });
            }
            catch (err) {
                tapeInstance._assert(false, {
                    message: err.message,
                    operator: "expect"
                });
            }
        };

        return expectation;
    }, originalExpectation);
};

// export augmented tape module
module.exports = tape;
