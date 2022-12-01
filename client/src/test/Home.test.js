import React from 'react';
import Home from '../components/Home';
import renderer from "react-test-renderer";

describe("snapshot testing", () => {

test("snapshot testing for Home component", () => {
    const comp = renderer.create(<Home />).toJSON()
    expect(comp).toMatchSnapshot()
})
})