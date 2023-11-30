import { isEmpty } from "lodash";
import Button from './Button';

const Modal = ({
    message,
    isAlert = false,
    successButtonText = 'Yes',
    onSuccess,
    close
}) => {

    if (isEmpty(message)) {
        return null;
    }

    return (
        <dialog className="modal modal-bottom sm:modal-middle" open>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Alert</h3>
                <p className="py-4">{message}</p>
                <div className="modal-action">
                    {!isAlert && (
                        <Button
                            className="btn btn-primary mr-1"
                            onClick={onSuccess}
                        >{successButtonText}</Button>
                    )}
                    <Button
                        className="btn"
                        onClick={close}
                    >Close</Button>
                </div>
            </div>
        </dialog>
    );
};

export default Modal;
