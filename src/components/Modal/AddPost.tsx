import React, { ChangeEvent, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '../ui/input';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw } from 'draft-js';
import { useCreatePost } from '@/hooks/post.hooks';
import { useGetUser } from '@/hooks/auth.hook';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Dynamically import the Editor component
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false } // Prevent server-side rendering
);

interface AddPostProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const AddPost = ({ isOpen, onOpenChange }: AddPostProps) => {
    const [category, setCategory] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const { mutate: createPost, isPending } = useCreatePost();
    const [postType, setPostType] = useState("besic");
    const { data, isLoading } = useGetUser();
    const router = useRouter();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newFiles = [...imageFiles, ...files];
        setImageFiles(newFiles);

        const previews = files.map(file => {
            const reader = new FileReader();
            return new Promise<string>((resolve) => {
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(previews).then(newPreviews => {
            setImagePreview(prev => [...prev, ...newPreviews]);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const rawContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

        const formData = new FormData();
        const postData = {
            category,
            content: rawContent,
            type: "besic"
        };
        formData.append("data", JSON.stringify(postData));

        imageFiles.forEach(image => {
            formData.append("image", image);
        });

        createPost(formData, {
            onSuccess: () => {
                onOpenChange(false);
            },
            onError: () => {
                onOpenChange(false);
            }
        });
    };

    if (isLoading) {
        return <>Loading...</>;
    }

    const user = data?.data;
    const isTimeOut = user?.membershipEnd < new Date().toISOString();
    const handlePrimum = () => {
        if (user?.membershipEnd && !isTimeOut) {
            setPostType("primum");
        } else {
            router.push("/payment");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[500px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Post</DialogTitle>
                </DialogHeader>
                <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-2">
                        <div className="w-full">
                            <Label htmlFor="category">Category</Label>
                            <Select onValueChange={setCategory}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Web Development">Web Development</SelectItem>
                                    <SelectItem value="App Development">App Development</SelectItem>
                                    <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                                    <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-full">
                            <Label htmlFor="image">Image</Label>
                            <Input
                                id="image"
                                type="file"
                                multiple
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    {imagePreview.length > 0 && (
                        <div className="flex gap-5 my-5 items-center justify-center flex-wrap">
                            {imagePreview.map((imageDataUrl, index) => (
                                <div
                                    key={index}
                                    className="relative w-32 h-32 rounded-xl border-2 border-dashed border-default-300 p-2"
                                >
                                    <Image
                                        width={400}
                                        height={400}
                                        alt={`Uploaded preview ${index + 1}`}
                                        className="h-full w-full object-cover object-center rounded-md"
                                        src={imageDataUrl}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className='mt-2 mb-2'>
                        <Label>Post Type</Label>
                        <div className='flex items-center gap-2'>
                            <div onClick={() => setPostType("besic")} className={`text-center text-sm font-semibold w-full py-2.5 cursor-pointer rounded-md ${postType === "besic" ? "border-2 border-black" : "border"}`}>
                                Besic
                            </div>
                            <div onClick={handlePrimum} className={`text-center cursor-pointer w-full flex justify-center items-end gap-1 py-2 rounded-md ${postType === "prymium" ? "border-2 border-black" : "border"}`}>
                                <span className='text-sm font-semibold'>Primum</span>
                                <span className='text-xs'>/20$ per month</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="editor">Content</Label>
                        <div className="border border-gray-300 rounded-md min-h-[200px] max-h-[300px] overflow-y-auto">
                            {/* Dynamically rendered editor */}
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={setEditorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                toolbar={{
                                    options: ['inline', 'list', 'history'],
                                    inline: { options: ['bold', 'italic', 'underline'] },
                                    blockType: { options: ['Normal', 'Blockquote', 'Code'] },
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
                        disabled={isPending}
                    >
                        {isPending ? 'Uploading...' : 'Submit Post'}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddPost;
