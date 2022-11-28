import React from 'react';
import AboutUs from '../components/AboutUs';
import renderer from "react-test-renderer";

describe("snapshot testing", () => {

test("snapshot testing for AboutUs component", () => {
    const comp = renderer.create(<AboutUs />).toJSON()
    expect(comp).toMatchSnapshot()
})
})