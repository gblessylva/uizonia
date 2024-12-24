import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Public/Footer';
import HeroSection from '@/Components/Public/HeroSection';
import HeaderSection from '@/Components/Public/Header';
import FeaturesSection from '@/Components/Public/FeaturesSection';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="uIzonia Achieve your Academic Goals" />
            <HeaderSection auth={{
                user: auth.user
            }} />
            <HeroSection />
            <FeaturesSection /> 
            <Footer />
        </>
    );
}
