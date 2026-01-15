/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** HomePage
*/

import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { HeroSection } from '../features/home/components/HeroSection';
import { TechStackSection } from '../features/home/components/TechStackSection';
import { GitHubSection } from '../features/home/components/GitHubSection';
import { BentoSection } from '../features/home/components/BentoSection';
import { DeploymentSection } from '../features/home/components/DeploymentSection';
import { JoinUsSection } from '../features/home/components/JoinUsSection';

export const HomePage = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-background font-sans antialiased">
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <TechStackSection />
        <GitHubSection />
        <BentoSection />
        <DeploymentSection />
        <JoinUsSection />
        <Footer />
      </main>
    </div>
  );
};