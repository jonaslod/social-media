import validateLength from "./validateLength.js";

describe("validateLength", () => {
    it("has a valid length", () => {
        const value = "This is a sentence";
        const minLength = 1;
        const lengthCheck = validateLength(value, minLength);
        expect(lengthCheck).toEqual(true);
    });
});
