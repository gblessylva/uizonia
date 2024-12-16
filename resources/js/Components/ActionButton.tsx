import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import { Link } from '@inertiajs/react';

interface Action {
    href: string;
    label: string;
    method?: string; // Optional for actions requiring methods like DELETE
}

interface ActionButtonProps {
    actions: Action[];
}

const ActionButton = ({ actions }: ActionButtonProps) => {
    return (
        <div className="relative">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton className="text-gray-600 hover:text-gray-800 focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                            />
                        </svg>
                    </MenuButton>
                </div>

                <MenuItems className="absolute right-0 -top-100 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-150 focus:outline-none">
                    <div className="py-1 z-100 -mt-90">
                        {actions.map((action, index) => (
                            <MenuItem key={index}>
                                {({ active }) => (
                                    <Link
                                        href={action.href}
                                        method={action.method || 'get'}
                                        as="button"
                                        className={`block px-4 py-2 text-sm w-full text-left ${
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        }`}
                                    >
                                        {action.label}
                                    </Link>
                                )}
                            </MenuItem>
                        ))}
                    </div>
                </MenuItems>
            </Menu>
        </div>
    );
};

export default ActionButton;
