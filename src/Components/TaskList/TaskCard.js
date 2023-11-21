import _ from "lodash";
import Button from "../Button";

const TaskCard = ( { task, setTask, handleSave, handleCancel, cancelConfirm } ) => {

    const handleCancelEvent = () => {
        if ( cancelConfirm ) {
            const confirm = window.confirm( cancelConfirm );
            if ( ! confirm ) {
                return;
            }
        }

        handleCancel();
    };

    return (
        <div className="card card-compact glass">
            <div className="card-body">
                <input
                    type="text"
                    placeholder="Enter title..."
                    className="input w-full"
                    value={ task.title }
                    onChange={ ( e ) => setTask( { ...task, title: e.target.value } ) }
                />
                { ! _.isEmpty( task.title ) && (
                    <>
                        <div className="m-[1px]"></div>
                        <textarea
                            className="textarea w-full"
                            placeholder="Task description..."
                            value={ task.description }
                            onChange={ ( e ) => setTask( { ...task, description: e.target.value } ) }
                        ></textarea>
                    </>
                ) }
                <div className="m-[1px]"></div>
                <div className="card-actions justify-end">
                    <div className="join">
                        <Button
                            className="btn join-item btn-sm"
                            onClick={ handleSave }
                        >Save</Button>
                        <Button
                            className="btn btn-square join-item btn-sm"
                            onClick={ handleCancelEvent }
                            type="cancel"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
