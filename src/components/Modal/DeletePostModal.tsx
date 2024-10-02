import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}


const DeletePostModal = ({ isOpen, onClose, onConfirm }: Props) => {

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        Are you sure?
                    </DialogTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Are you sure to delete this post
                    </p>
                </DialogHeader>
                <DialogDescription></DialogDescription>
                <DialogFooter className="flex justify-end gap-4 mt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="default" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeletePostModal
