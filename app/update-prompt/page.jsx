'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const UpdatePrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(
                `/api/prompt/${promptId}`,
                { cache: 'no-store' }
            );
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        if (promptId) getPromptDetails();
    }, []);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!promptId) return alert('Missing PromptId!');

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    updatedPrompt: post.prompt,
                    updatedTag: post.tag,
                }),
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log('Error in prompt update: ', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form
            type='Edit'
            post={post}
            setPost={setPost}
            submitting={isSubmitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default UpdatePrompt;