import React from 'react';
import LandingPage from '../components/LandingPage';
import renderer from "react-test-renderer";

describe("snapshot testing", () => {

test("snapshot testing for Landing Page component", () => {
    const comp = renderer.create(<LandingPage />).toJSON()
    expect(comp).toMatchSnapshot()
})
})