import { Routes, Route } from 'react-router-dom';

import Tasks from "../Pages/Tasks";
import Category from "../Pages/Category";
import NotFound from '../Pages/404';

const Page = ( { children } ) => {
    return (
        <div className="app__content-page">
            <Routes>
                <Route path="/" element={ <Tasks /> } />
                <Route path="/category" element={ <Category /> } />
                <Route path="*" element={ <NotFound /> } />
            </Routes>

            { children }
        </div>
    );
};

export default Page;
