import _ from "lodash";
import { categories } from "../../utils/const";
import Button from "../Button";

const TaskEdit = ( {
    task: {
        task,
        setTask
    },
    handles: {
        save,
        cancel
    },
    isNew
} ) => {

    const { list: categoryList } = categories;

    return (
        <div className="card card-compact glass">
            <div className="card-body">
                <input
                    type="text"
                    placeholder="Enter title..."
                    className="input w-full"
                    value={ task?.title || '' }
                    onChange={ ( e ) => setTask( { ...task, title: e.target.value } ) }
                />
                { ! _.isEmpty( task?.title ) && (
                    <>
                        <textarea
                            className="textarea w-full"
                            placeholder="Task description..."
                            value={ task?.description || '' }
                            onChange={ ( e ) => setTask( { ...task, description: e.target.value } ) }
                        ></textarea>
                    </>
                ) }
                { ! isNew && (
                    <>
                        { ( categoryList && 0 === categoryList.length ) ? (
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                        ) : (
                            <select
                                defaultValue={ task?.category || '' }
                                className="select select-bordered w-full max-w-xs"
                                onChange={ ( e ) => setTask( { ...task, category: e.target.value } ) }
                            >
                                { categoryList.map( ( { title }, index ) => (
                                    <option key={ index } value={ title }>{ title }</option>
                                ) ) }
                            </select>
                        ) }
                    </>
                ) }
                <div className="card-actions justify-end">
                    <div className="join">
                        <Button
                            className="btn join-item btn-sm"
                            onClick={ save }
                        >Save</Button>
                        <Button
                            className="btn btn-square join-item btn-sm"
                            onClick={ cancel }
                            type="cancel"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskEdit;
