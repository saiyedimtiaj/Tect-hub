import { Dialog, DialogContent, DialogDescription, DialogHeader } from "../ui/dialog"
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    url: string
}


const ShareDialog = ({ isOpen, onClose, url }: Props) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-6">
                <DialogHeader>
                </DialogHeader>
                <DialogDescription>
                    <div className="flex items-center justify-center flex-col gap-2">
                        <h1 className="text-xl font-semibold">Share</h1>
                        <div className='flex gap-5 my-4'>
                            <FacebookShareButton url={url} className="flex items-center">
                                <FacebookIcon size={30} />
                            </FacebookShareButton>
                            <TwitterShareButton url={url} className="flex items-center">
                                <TwitterIcon size={30} />
                            </TwitterShareButton>
                        </div>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default ShareDialog
