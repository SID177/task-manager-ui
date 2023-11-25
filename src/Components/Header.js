const Header = ( { children } ) => {
    return (
        <header className="app__header bg-neutral text-neutral-content">
            <div className="app__header-container">
                { children }
            </div>
        </header>
    );
};

export default Header;
