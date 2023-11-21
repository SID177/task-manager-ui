const Header = ( { children } ) => {
    return (
        <header className="app__header">
            <div className="app__header-container">
                { children }
            </div>
        </header>
    );
};

export default Header;
