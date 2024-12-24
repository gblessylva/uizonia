import React from 'react';
import { Link } from '@inertiajs/react';

export interface BreadcrumbItem {
    name: string; // Display name of the breadcrumb
    url?: string; // URL for navigation, optional for the current/last breadcrumb
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]; // List of breadcrumb items dynamically passed
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    console.log('bread', items);
    if (!items || items.length <= 1) return null;
    return (
        <nav aria-label="breadcrumb" className="-mt-16 px-10 mb-16  breadcrumb">
            <ol className="flex flex-wrap items-center text-sm text-gray-500">
                {items.map((item, index) => (
                    <li key={index} className="flex items-top">
                        {/* Render as Link if `url` exists */}
                        {item.url ? (
                            <Link
                                href={item.url}
                                className="text-blue-600 hover:text-blue-800 transition duration-200"
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <span className="text-gray-800 font-semibold">
                                {item.name}
                            </span>
                        )}

                        {/* Separator between items except for the last one */}
                        {index < items.length - 1 && (
                            <span className="mx-2 text-gray-400">/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
