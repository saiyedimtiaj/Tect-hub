import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TUser } from "@/types";

interface UserStatusDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    selectedUser: TUser
}

const UserStatusDialog: React.FC<UserStatusDialogProps> = ({ isOpen, onClose, onConfirm, selectedUser }) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        Change User Status
                    </DialogTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        You are about to change the status of this user to
                        <span className={cn(selectedUser.status === "block" ? "text-red-500" : "text-green-500", "font-semibold")}>
                            {` ${selectedUser.status === "active" ? "block" : "active"}`}
                        </span>. Please confirm.
                    </p>
                </DialogHeader>
                <DialogDescription></DialogDescription>
                <DialogFooter className="flex justify-end space-x-4 mt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="default" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UserStatusDialog;
