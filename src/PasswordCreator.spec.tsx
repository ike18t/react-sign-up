import React from "react";
import { shallow } from "enzyme";
import { ReactComponent as Key } from "tabler-icons/icons/key.svg";
import { PasswordCreator } from "./PasswordCreator";

describe("PasswordCreator", () => {
  describe("Key", () => {
    it("is not present when there is no password", () => {
      const wrapper = shallow(<PasswordCreator onChange={jest.fn()} />);

      expect(wrapper.find(Key)).toHaveLength(0);
    });

    it("is present when there is a password", () => {
      const wrapper = shallow(<PasswordCreator onChange={jest.fn()} />);

      wrapper
        .find(".password")
        .simulate("change", { target: { value: "HelloThere" } });

      expect(wrapper.find(Key)).toHaveLength(2);
    });

    it("has class matchingKey when passwords match", () => {
      const wrapper = shallow(<PasswordCreator onChange={jest.fn()} />);

      wrapper
        .find(".password")
        .simulate("change", { target: { value: "HelloThere" } });
      wrapper
        .find(".confirmPassword")
        .simulate("change", { target: { value: "HelloThere" } });

      expect(wrapper.find(".matchingKey")).toHaveLength(2);
      expect(wrapper.find(".key")).toHaveLength(0);
    });

    it("does not have class matchingKey when passwords do not match", () => {
      const wrapper = shallow(<PasswordCreator onChange={jest.fn()} />);

      wrapper
        .find(".password")
        .simulate("change", { target: { value: "Hello There" } });
      wrapper
        .find(".confirmPassword")
        .simulate("change", { target: { value: "HelloThere" } });

      expect(wrapper.find(".matchingKey")).toHaveLength(0);
      expect(wrapper.find(".key")).toHaveLength(2);
    });
  });

  describe("onChange", () => {
    it("gets called with password value when the passwords match", () => {
      const callback = jest.fn();
      const wrapper = shallow(<PasswordCreator onChange={callback} />);

      wrapper
        .find(".password")
        .simulate("change", { target: { value: "HelloThere" } });
      wrapper
        .find(".confirmPassword")
        .simulate("change", { target: { value: "HelloThere" } });

      expect(callback).toHaveBeenCalledWith("HelloThere");
    });

    it("gets called with undefined when the passwords do not match", () => {
      const callback = jest.fn();
      const wrapper = shallow(<PasswordCreator onChange={callback} />);

      wrapper
        .find(".password")
        .simulate("change", { target: { value: "HelloThere" } });
      wrapper
        .find(".confirmPassword")
        .simulate("change", { target: { value: "HelloThere" } });

      expect(callback).toHaveBeenCalledWith(undefined);
    });
  });

  describe("strength", () => {
    it("is not present when there is no password", () => {
      const wrapper = shallow(<PasswordCreator onChange={jest.fn()} />);

      expect(wrapper.find(".strength")).toHaveLength(0);
    });

    it("displays one strong when a character is in password", () => {
      const wrapper = shallow(<PasswordCreator onChange={jest.fn()} />);

      wrapper.find(".password").simulate("change", { target: { value: "h" } });

      expect(wrapper.find(".strong")).toHaveLength(1);
      expect(wrapper.find(".weak")).toHaveLength(4);
    });

    it("still displays one strong when a character that meets the same check is in password", () => {
      const wrapper = shallow(<PasswordCreator onChange={jest.fn()} />);

      wrapper.find(".password").simulate("change", { target: { value: "hi" } });

      expect(wrapper.find(".strong")).toHaveLength(1);
      expect(wrapper.find(".weak")).toHaveLength(4);
    });

    it("displays 2 strongs when an upper case and a lower case char is in password", () => {
      const wrapper = shallow(<PasswordCreator onChange={jest.fn()} />);

      wrapper.find(".password").simulate("change", { target: { value: "Hi" } });

      expect(wrapper.find(".strong")).toHaveLength(2);
      expect(wrapper.find(".weak")).toHaveLength(3);
    });

    it("displays 3 strongs when an upper case, lower case, and special char is in password", () => {
      const wrapper = shallow(<PasswordCreator onChange={jest.fn()} />);

      wrapper
        .find(".password")
        .simulate("change", { target: { value: "Hi!" } });

      expect(wrapper.find(".strong")).toHaveLength(3);
      expect(wrapper.find(".weak")).toHaveLength(2);
    });

    it("displays 4 strongs when an upper case, lower case, special char, and length is 6 is in password", () => {
      const wrapper = shallow(<PasswordCreator onChange={jest.fn()} />);

      wrapper
        .find(".password")
        .simulate("change", { target: { value: "Hello!" } });

      expect(wrapper.find(".strong")).toHaveLength(4);
      expect(wrapper.find(".weak")).toHaveLength(1);
    });

    it("displays 5 strongs when an upper case, lower case, special char, number, and length is 6 is in password", () => {
      const wrapper = shallow(<PasswordCreator onChange={jest.fn()} />);

      wrapper
        .find(".password")
        .simulate("change", { target: { value: "Hello2!" } });

      expect(wrapper.find(".strong")).toHaveLength(5);
      expect(wrapper.find(".weak")).toHaveLength(0);
    });
  });
});
