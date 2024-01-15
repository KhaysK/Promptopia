'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const ProfilePage = () => {
    const {data: session} = useSession();

    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/prompts`);
            const data = await response.json();

            setPrompts(data);
        }

        if(session?.user.id) fetchPrompts();
    }, [])

    const handleEdit = () => {

    }

    const handleDelete = async () => {

    }

    return (
        <Profile
            name='My'
            desc='Welcome to your peronalized profile page'
            prompts={prompts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default ProfilePage