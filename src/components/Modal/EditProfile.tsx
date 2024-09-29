import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";

interface EditProfileProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const EditProfile: FC<EditProfileProps> = ({ isOpen, onOpenChange }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => onOpenChange(false)}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfile;
