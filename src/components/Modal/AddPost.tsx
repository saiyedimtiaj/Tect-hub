import React, { ChangeEvent, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from '../ui/input';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios'; // For handling API requests
import { useCreatePost } from '@/hooks/post.hooks';

interface AddPostProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const AddPost = ({ isOpen, onOpenChange }: AddPostProps) => {
    const [category, setCategory] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [isUploading, setIsUploading] = useState(false);
    const { mutate: createPost, isPending } = useCreatePost()

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

    const uploadImageToCloudinary = async (imageFile: File) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', "od7lpeqi");

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/ddhb3f9rg/image/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data.secure_url; // URL of uploaded image
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);
        const rawContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        const uploadedImageUrls = await Promise.all(imageFiles.map(uploadImageToCloudinary));

        if (uploadedImageUrls.some(url => url === null)) {
            console.error('Some images failed to upload.');
            setIsUploading(false);
            return;
        }
        const postData = {
            category,
            content: rawContent,
            images: uploadedImageUrls,
            type: "besic"
        };

        console.log(postData)

        createPost(postData);
        setIsUploading(false);
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
                                    <img
                                        alt={`Uploaded preview ${index + 1}`}
                                        className="h-full w-full object-cover object-center rounded-md"
                                        src={imageDataUrl}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <div>
                        <Label htmlFor="editor">Content</Label>
                        <div className="border border-gray-300 rounded-md min-h-[200px] max-h-[300px] overflow-y-auto">
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
                        disabled={isUploading}
                    >
                        {isUploading || isPending ? 'Uploading...' : 'Submit Post'}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddPost;
