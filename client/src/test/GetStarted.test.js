import React from 'react';
import GetStarted from '../components/GetStarted';
import renderer from "react-test-renderer";

describe("snapshot testing", () => {

test("snapshot testing for Get Started component", () => {
    const comp = renderer.create(<GetStarted />).toJSON()
    expect(comp).toMatchSnapshot()
})
})