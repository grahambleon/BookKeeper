const Enzyme = require('enzyme');
import fetch from 'isomorphic-fetch'

const EnzymeAdapter = require('enzyme-adapter-react-15.4');

Enzyme.configure({ adapter: new EnzymeAdapter() });

Object.assign(global, fetch);
