import React from 'react'
import { EditorState, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

const ShowContent = ({ content }: { content: string }) => {
    const contentState = convertFromRaw(JSON.parse(content));
    const editorState = EditorState.createWithContent(contentState);
    return (
        <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }} />
    )
}

export default ShowContent
