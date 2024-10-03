import { SyntheticEvent } from "react";
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    createAdmin: any;
    refetch: any
}


const AddAdmin = ({ isOpen, onClose, createAdmin, refetch }: Props) => {

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const name = (form.elements.namedItem('name') as HTMLInputElement).value
        const email = (form.elements.namedItem('email') as HTMLInputElement).value
        const password = (form.elements.namedItem('password') as HTMLInputElement).value

        createAdmin({ name, email, password }, {
            onSuccess: () => {
                refetch()
                onClose()
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        Create An Admin
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">User Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="*******"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Create an Admin
                        </Button>
                    </form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default AddAdmin
