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

        const originalAssert = expectation[curr];

        expectation[curr] = function () {

            const message = arguments.length >= originalAssert.length && arguments[originalAssert.length - 1] || "Expectation";

            try {
                originalAssert.apply(originalExpectation, arguments);
                tapeInstance._assert(true, { message, operator: "expect" });
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
