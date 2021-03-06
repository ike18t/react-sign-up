import React from "react";
import Modal from "react-modal";
import { shallow } from "enzyme";
import App from "./App";
import { PasswordCreator } from "./PasswordCreator";

describe("App Component", () => {
  describe("sign up button", () => {
    it("is disabled by default", () => {
      const wrapper = shallow(<App />);

      const submit = wrapper.find('input[type="submit"]');

      expect(submit.prop("disabled")).toBe(true);
    });

    it("is disabled when password is set but email is not", () => {
      const wrapper = shallow(<App />);

      wrapper.find(PasswordCreator).simulate("change", "whatevs");

      const submit = wrapper.find('input[type="submit"]');

      expect(submit.prop("disabled")).toBe(true);
    });

    it("is disabled when email is set but password is not", () => {
      const wrapper = shallow(<App />);

      wrapper
        .find('input[type="email"]')
        .simulate("change", { target: { value: "ike18t@gmail.com" } });

      wrapper.find(PasswordCreator).simulate("change", undefined);

      const submit = wrapper.find('input[type="submit"]');

      expect(submit.prop("disabled")).toBe(true);
    });

    it("is enabled when the password and email are set", () => {
      const wrapper = shallow(<App />);

      wrapper.find(PasswordCreator).simulate("change", "whatevs");

      wrapper
        .find('input[type="email"]')
        .simulate("change", { target: { value: "ike18t@gmail.com" } });

      const submit = wrapper.find('input[type="submit"]');

      expect(submit.prop("disabled")).toBe(false);
    });
  });

  describe("submission", () => {
    it("shows success modal", () => {
      const wrapper = shallow(<App />);

      wrapper.find(PasswordCreator).simulate("change", "whatevs");

      wrapper
        .find('input[type="email"]')
        .simulate("change", { target: { value: "ike18t@gmail.com" } });

      wrapper
        .find("form")
        .simulate("submit", { preventDefault: () => undefined });

      expect(wrapper.find(Modal).prop("isOpen")).toBe(true);
    });
  });
});
