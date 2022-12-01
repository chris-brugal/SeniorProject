import React from 'react';
import TopArtists from '../components/TopArtists';
import renderer from "react-test-renderer";

describe("snapshot testing", () => {

test("snapshot testing for Top Artists component", () => {
    const comp = renderer.create(<TopArtists />).toJSON()
    expect(comp).toMatchSnapshot()
})
})