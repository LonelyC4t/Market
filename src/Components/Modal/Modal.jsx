
import ReactDOM from "react-dom";

function ModalContent({}){
    return (
        <div>
            <button>close</button>
        </div>
    )
}

function Modal({isOpen = false, children}){
    
    if (isOpen = false) return null;

    return ReactDOM.createPortal(
    <div>
        <ModalContent>
            {children}
        </ModalContent>
    </div>, 
    document.getElementById('modalRoot'))
    
}

export {Modal};