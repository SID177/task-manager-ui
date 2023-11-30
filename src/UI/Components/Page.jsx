import { Routes, Route } from 'react-router-dom';

import Tasks from "../Pages/Tasks";
import NotFound from '../Pages/404';

const Page = ({ children, refresh }) => {
    return (
        <div className="app__content-page">
            <Routes>
                <Route path="/" element={<Tasks refresh={refresh} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            {children}
        </div>
    );
};

export default Page;
