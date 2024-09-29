"use client";
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const AddPost = () => {
    const editorRef = useRef(null);

    const handleImageUpload = (blobInfo, success, failure) => {
        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        // Replace with your upload URL and API key if necessary
        fetch('YOUR_IMAGE_UPLOAD_URL', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY' // If needed
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Image upload failed');
            })
            .then(data => {
                // Assuming your API returns the URL of the uploaded image
                success(data.url);
            })
            .catch(error => {
                failure('Image upload failed: ' + error.message);
            });
    };

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    return (
        <>
            <Editor
                apiKey='8tw2p75drsyct2s5q2rk9vhw39h0p8t6wky0k32d6c9v83m8'
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', "upload"
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' + 'image code' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    images_upload_handler: handleImageUpload, // Set the image upload handler
                }}
            />
            <button onClick={log}>Log editor content</button>
        </>
    );
}

export default AddPost;
