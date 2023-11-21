import _ from 'lodash';
import { useState } from 'react';

const NewCategory = ( { newCategory, setNewCategory } ) => {

    const [ addNew, setAddNew ] = useState( false );
    const [ error, setError ] = useState( false );

    const handleSubmit = () => {
        if ( _.isEmpty( newCategory.title ) ) {
            setError( 'List title cannot be empty.' );
            return;
        }

        setNewCategory( { ...newCategory, save: true } );
        setAddNew( false );
    };

    return (
        <div className="card card-compact glass">
            <div className="card-body">
                { !!addNew && (
                    <>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter title..." 
                            className="input w-full max-w-xs"
                            value={ newCategory.title }
                            onChange={ ( e ) => setNewCategory( { ...newCategory, title: e.target.value } ) }
                        />
                        { ! _.isEmpty( newCategory.title ) && (
                            <>
                                <div className="divider"></div>
                                <textarea
                                    placeholder="Enter description..."
                                    className="textarea w-full max-w-xs"
                                    value={ newCategory.description }
                                    onChange={ ( e ) => setNewCategory( { ...newCategory, description: e.target.value } ) }
                                />
                            </>
                        ) }
                    </div>
                    <div className="divider"></div> 
                    </>
                ) }
                <div className="card-actions justify-end">
                    { addNew ? (
                        <div className="join">
                            <button
                                className="btn join-item"
                                onClick={ handleSubmit }
                            >
                                Save
                            </button>
                            <button
                                className="btn btn-square join-item"
                                onClick={ () => setAddNew( false ) }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    ) : (
                        <button
                            className="btn w-full justify-start"
                            onClick={ () => setAddNew( true ) }
                        >+ Add new list</button>
                    ) }
                </div>
            </div>
        </div>
        
    );
};

export default NewCategory;

{/* <div className={ className }>
            { addNew ? (
                <form onSubmit={ handleSubmit } className="new-category__form">
                    <input
                        type="text"
                        id="new-category-title"
                        placeholder="Enter list title"
                        className="w-full !bg-transparent py-[6px] px-[12px] rounded-[4px]"
                        value={newCategory.title}
                        onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                    />
                    { ! _.isEmpty( newCategory.title ) && (
                        <textarea
                            placeholder="Enter description"
                            className="w-full !bg-transparent py-[6px] px-[12px] mt-[14px] rounded-[4px]"
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                        />
                    ) }
                    <div className="flex justify-start mt-[10px] gap-[4px]">
                        <button
                            type="submit"
                            className="py-[6px] px-[12px] rounded-[3px] bg-[#579DFF] text-[#1D2125]"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="p-[6px] bg-transparent"
                            onClick={ () => setAddNew( false ) }
                        >
                            X
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    type="button"
                    className="w-full text-left h-full hover:bg-[#A6C5E229] p-[12px] rounded-[12px]"
                    onClick={ () => setAddNew( true ) }
                >+ Add List</button>
            ) }
        </div> */}
