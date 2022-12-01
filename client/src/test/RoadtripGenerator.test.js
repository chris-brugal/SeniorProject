import React from 'react';
import RoadtripGenerator from '../components/RoadtripGenerator';
import renderer from "react-test-renderer";

describe("snapshot testing", () => {

test("snapshot testing for Roadtrip Generator component", () => {
    const comp = renderer.create(<RoadtripGenerator />).toJSON()
    expect(comp).toMatchSnapshot()
})
})