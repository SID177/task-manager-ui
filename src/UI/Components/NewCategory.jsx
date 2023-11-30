import { isEmpty } from 'lodash';
import { useState } from 'react';

import Alert from './Alert';
import Button from './Button';

import { createCategory } from '../../Data/categories';

const NewCategory = ({
    categories: {
        categories,
        setCategories
    },
    handles: {
        cancel
    }
}) => {

    const [category, setCategory] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    /**
     * Handle form submit for new category.
     */
    const handleSubmit = () => {
        if (isEmpty(category?.title)) {
            setError('Category title cannot be empty');
            return;
        }

        createCategory(category)
            .then(resp => {
                setSaving(false);
                setCategories([...categories, { id: resp.id, data: category }]);
                setCategory(null);
                cancel();
            })
            .catch(e => {
                setError('Error while creating new category');
                setSaving(false);
            });
    };

    return (
        <div className="card card-compact glass h-fit">
            <div className="card-body">
                {!isEmpty(error) && <Alert text={error} type="error" className="!bg-neutral !text-secondary-content" />}

                <input
                    type="text"
                    placeholder="Enter title..."
                    className="task-input !text-secondary-content placeholder:text-secondary-content"
                    value={category?.title || ''}
                    onChange={(e) => setCategory({ ...category, title: e.target.value })}
                />
                {!isEmpty(category?.title) && (
                    <>
                        <textarea
                            placeholder="Enter description..."
                            className="task-textarea !text-secondary-content placeholder:text-secondary-content"
                            value={category?.description || ''}
                            onChange={(e) => setCategory({ ...category, description: e.target.value })}
                        />
                    </>
                )}
                <div className="card-actions justify-end mt-[5px]">
                    <div className="join">
                        <Button
                            className="btn join-item btn-sm"
                            disabled={saving}
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                        <Button
                            className="btn btn-square join-item btn-sm"
                            onClick={cancel}
                            type="cancel"
                        />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default NewCategory;
