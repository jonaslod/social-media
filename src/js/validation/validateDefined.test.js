import validateDefined from "./validateDefined.js";

describe("validateDefined", () => {
    it("could be defined", () => {
        const value = 1;
        const validness = validateDefined(value);
        expect(validness).toEqual(value);
    });
    it("could be undefined", () => {
        const value = 0;
        const validness = validateDefined(value);
        expect(validness).not.toEqual(value);
    });
});
