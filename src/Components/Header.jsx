const Header = ( { children } ) => {
    return (
        <header className="w-full p-0 bg-neutral text-neutral-content glass z-[10] relative">
            <div className="flex justify-between">
                { children }
            </div>
        </header>
    );
};

export default Header;
