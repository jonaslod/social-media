import validateEmail from "./validateEmail.js";

describe("validateEmail", () => {
    it("could be a valid email", () => {
        const email = "test@email.com";
        const valid = validateEmail(email);
        expect(valid).toBeTruthy();
    });
    it("could be a not valid email", () => {
        const email = "not an email";
        const valid = validateEmail(email);
        expect(valid).toBeFalsy();
    });
});
