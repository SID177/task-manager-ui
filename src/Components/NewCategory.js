import _ from 'lodash';
import { useState } from 'react';
import Button from './Button';

const NewCategory = ( {
    category: {
        category,
        setCategory
    }
} ) => {

    const [ addNew, setAddNew ] = useState( false );

    /**
     * Handle form submit for new category.
     */
    const handleSubmit = () => {
        if ( _.isEmpty( category?.title ) ) {
            return;
        }

        setCategory( { ...category, save: true } );
        setAddNew( false );
    };

    return (
        <div className="card card-compact glass h-fit">
            <div className="card-body">
                { addNew && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter title..." 
                            className="input w-full"
                            value={ category?.title || '' }
                            onChange={ ( e ) => setCategory( { ...category, title: e.target.value } ) }
                        />
                        { ! _.isEmpty( category?.title ) && (
                            <>
                                <textarea
                                    placeholder="Enter description..."
                                    className="textarea w-full"
                                    value={ category?.description || '' }
                                    onChange={ ( e ) => setCategory( { ...category, description: e.target.value } ) }
                                />
                            </>
                        ) }
                    </>
                ) }
                <div className="card-actions justify-end">
                    { addNew ? (
                        <div className="join">
                            <Button
                                className="btn join-item btn-sm"
                                onClick={ handleSubmit }
                            >
                                Save
                            </Button>
                            <Button
                                className="btn btn-square join-item btn-sm"
                                onClick={ () => setAddNew( false ) }
                                type="cancel"
                            />
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
