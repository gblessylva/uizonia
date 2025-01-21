import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function AvatarUpload({
    className = '',
}: {
    className?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            avatar: null as File | null, // Avatar field
        });

    const [preview, setPreview] = useState<string | null>(user.avatar || null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('avatar', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data.avatar);      

        // Use `patch` to update user data with avatar upload
        patch(route('profile.update'), data);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information, email address, and avatar.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
               
                

               

                <div>
                    <InputLabel htmlFor="avatar" value="Avatar" />

                    <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        className="mt-1 block w-full text-gray-700 dark:text-gray-300"
                        onChange={handleAvatarChange}
                    />

                    {preview && (
                        <img
                            src={preview}
                            alt="Avatar Preview"
                            className="mt-4 h-24 w-24 rounded-full object-cover"
                        />
                    )}

                    <InputError className="mt-2" message={errors.avatar} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
