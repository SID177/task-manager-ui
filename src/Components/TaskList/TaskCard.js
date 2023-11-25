import Button from '../Button';

const TaskCard = ( {
    task: {
        title,
        description
    },
    handles
} ) => {

    return (
        <div className="card card-compact glass">
            <div className="card-body">
                <div className="card-title justify-between">
                    <h2>{ title }</h2>
                    <div className="card-actions">
                        <Button
                            className="btn btn-square btn-xs"
                            onClick={ handles.edit }
                            type="edit"
                        />
                        <Button
                            className="btn btn-square btn-xs"
                            onClick={ handles.delete }
                            type="cancel"
                        />
                    </div>
                </div>
                <div>{ description }</div>
            </div>
        </div>
    );
};

export default TaskCard;
