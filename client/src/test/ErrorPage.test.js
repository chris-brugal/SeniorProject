import React from 'react';
import ErrorPage from '../components/ErrorPage';
import renderer from "react-test-renderer";

describe("snapshot testing", () => {

test("snapshot testing for Error Page component", () => {
    const comp = renderer.create(<ErrorPage />).toJSON()
    expect(comp).toMatchSnapshot()
})
})