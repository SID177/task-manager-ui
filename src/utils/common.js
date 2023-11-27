import axios from 'axios';

const get = async ( url ) => await axios.get( url );

const post = async ( url, body ) => await axios.post( url, body );

export { get, post };
