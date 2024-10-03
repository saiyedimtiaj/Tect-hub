import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@/provider/user.provider";
import Image from "next/image";
import { FC, SyntheticEvent, useState } from "react";
import { MdEdit } from "react-icons/md"; // Import the edit icon
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { uploadImage } from "@/utils/uploadImage";
import { useUpdateUser } from "@/hooks/auth.hook";

interface EditProfileProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    refetch: any
}

const EditProfile: FC<EditProfileProps> = ({ isOpen, onOpenChange, refetch }) => {
    const { user } = useUser();
    const [image, setImage] = useState<string | undefined>(user?.profile);
    const [file, setFile] = useState<File | null>();
    const { mutate: updateUser, isPending } = useUpdateUser()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
        setFile(file);
    };

    const handleUpdate = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        let imageData;

        if (file) {
            imageData = await uploadImage(file);
        }
        const form = e.target as HTMLFormElement
        const profile = imageData ? imageData : user?.profile
        const name = (form.elements.namedItem('name') as HTMLInputElement).value
        const bio = (form.elements.namedItem('bio') as HTMLInputElement).value

        updateUser({ name, profile, bio, _id: user?._id }, {
            onSuccess: () => {
                refetch()
            }
        })
        onOpenChange(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&aposre done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpdate}>
                    <div className="flex flex-col items-center pt-4">
                        <div className="relative">
                            <input
                                type="file"
                                hidden
                                name="files"
                                className="input-Field"
                                onChange={handleFileChange}
                            />
                            <div
                                onClick={() => document.querySelector<HTMLInputElement>(".input-Field")?.click()}
                                className="cursor-pointer flex items-center justify-center"
                            >
                                {image ? (
                                    <Image
                                        className="w-[120px] h-[120px] object-cover rounded-full"
                                        width={200}
                                        height={200}
                                        src={image}
                                        alt={"Profile Image"}
                                    />
                                ) : (
                                    <Image
                                        className="w-[120px] h-[120px] object-cover rounded-full"
                                        width={200}
                                        height={200}
                                        src={user?.profile as string}
                                        alt={"Profile Image"}
                                    />
                                )}
                            </div>
                            {/* Edit Icon */}
                            <div className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md">
                                <MdEdit
                                    size={24}
                                    className="text-gray-800 cursor-pointer"
                                    onClick={() => document.querySelector<HTMLInputElement>(".input-Field")?.click()}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Label>Name</Label>
                        <Input name="name" defaultValue={user?.name} />
                    </div>
                    <div>
                        <Label>Bio</Label>
                        <Textarea name="bio" placeholder="Type your bio in 150 word." maxLength={150} />
                    </div>
                    <DialogFooter>
                        <Button className="mt-3" type="submit">{isPending ? "isPending" : "Save changes"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfile;
