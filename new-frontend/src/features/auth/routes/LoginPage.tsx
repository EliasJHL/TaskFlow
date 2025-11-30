import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    LayoutGrid,
    Users,
    Bot,
    Pencil,
    Check,
    Star,
    Github,
    Disc as DiscordIcon,
    Twitter,
    GitPullRequest,
    ArrowLeftRight,
    FileText as FileTextIcon,
    Bell as BellIcon,
    Share2 as Share2Icon,
    Calendar as CalendarIcon,
    LucideMessageCircleWarning
} from 'lucide-react';

import {
    SiNestjs,
    SiReact,
    SiGraphql,
    SiPrisma,
    SiPostgresql,
    SiFastify,
    SiTailwindcss,
    SiOpenai,
    SiTypescript
} from 'react-icons/si';

// UI Components
import { Button } from '@/components/ui/button';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { Marquee } from '@/components/ui/marquee';
import { BorderBeam } from '@/components/ui/border-beam';
import { ShineBorder } from '@/components/ui/shine-border';
import { Meteors } from '@/components/ui/meteors';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { cn } from '@/lib/utils';

// Layout
import { Header } from '@/components/layouts/Header';
import { DotPattern } from '@/components/ui/dot-pattern';
import { Globe } from '@/components/ui/globe';
import { AnimatedList } from '@/components/ui/animated-list';
import { AuroraText } from '@/components/ui/aurora-text';
import { Highlighter } from '@/components/ui/highlighter';
import { Terminal } from '@/components/ui/terminal';

interface Item {
    name: string;
    description: string;
    icon: string;
    color: string;
    time: string;
}

let notifications = [
    {
        name: 'Emily updated the workspace',
        description: 'A new board has been created',
        time: '1m ago',
        icon: '💸',
        color: '#00C9A7',
        avatar: 'https://plus.unsplash.com/premium_photo-1691784778805-e1067ac42e01?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Elias joined the team',
        description: "He's been invited to the workspace",
        time: '10m ago',
        icon: '👤',
        color: '#FFB800',
        avatar: 'https://avatars.githubusercontent.com/u/145333474?v=4'
    },
    {
        name: "You're late !",
        description: 'An issue was due 2 days ago',
        time: '5m ago',
        icon: '💬',
        color: '#FF3D71',
        avatar: ''
    },
    {
        name: 'New event',
        description: 'A new event has been created',
        time: '2m ago',
        icon: '📅',
        color: '#1E86FF',
        avatar: ''
    }
];

notifications = Array.from({ length: 10 }, () => notifications).flat();
const Notification = ({
    name,
    description,
    icon,
    color,
    time,
    avatar
}: Item & { avatar?: string }) => {
    return (
        <figure
            className={cn(
                'relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4',
                'transition-all duration-200 ease-in-out hover:scale-[103%]',
                'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
                'transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]'
            )}
        >
            <div className="flex flex-row items-center gap-3 overflow-hidden">
                <div
                    className="flex size-10 items-center justify-center rounded-2xl overflow-hidden"
                    style={{
                        backgroundColor: avatar ? 'transparent' : color
                    }}
                >
                    {avatar ? (
                        <img
                            src={avatar}
                            alt={name}
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    ) : (
                        <span className="text-lg">{icon}</span>
                    )}
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white">
                        <span className="text-sm sm:text-lg">{name}</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{time}</span>
                    </figcaption>
                    <p className="text-sm font-normal dark:text-white/60">
                        {description}
                    </p>
                </div>
            </div>
        </figure>
    );
};

const techStack = [
    { name: 'NestJS', Icon: SiNestjs, color: 'text-[#E0234E]' },
    { name: 'Fastify', Icon: SiFastify, color: 'dark:text-white text-black' },
    { name: 'GraphQL', Icon: SiGraphql, color: 'text-[#E10098]' },
    { name: 'Prisma', Icon: SiPrisma, color: 'text-[#2D3748] dark:text-white' },
    { name: 'PostgreSQL', Icon: SiPostgresql, color: 'text-[#4169E1]' },
    { name: 'React', Icon: SiReact, color: 'text-[#61DAFB]' },
    { name: 'Tailwind', Icon: SiTailwindcss, color: 'text-[#06B6D4]' },
    { name: 'OpenAI', Icon: SiOpenai, color: 'text-[#10A37F]' },
    { name: 'TypeScript', Icon: SiTypescript, color: 'text-[#3178C6]' }
];
const featuress = [
    {
        Icon: LayoutGrid,
        name: 'Kanban Fluide',
        description:
            "L'expérience Trello, la puissance d'une base SQL relationnelle.",
        href: '/login',
        cta: 'Voir le board',
        className: 'col-span-3 lg:col-span-1',
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-30" />
        )
    },
    {
        Icon: Bot,
        name: 'IA Native',
        description:
            'Génération de sous-tâches, résumés de cartes et suggestions automatiques via OpenAI.',
        href: '/login',
        cta: "Tester l'IA",
        className: 'col-span-3 lg:col-span-2',
        background: (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <ShineBorder
                    className="w-full h-full bg-transparent"
                    color="#A07CFE"
                    borderWidth={2}
                />
                <div className="absolute inset-0 bg-zinc-900/50 [mask-image:radial-gradient(transparent,black)]" />
            </div>
        )
    },
    {
        Icon: Users,
        name: 'Temps Réel',
        description:
            'WebSockets performants. Voyez les curseurs et les mises à jour instantanément.',
        href: '/login',
        cta: "Inviter l'équipe",
        className: 'col-span-3 lg:col-span-2',
        background: <Globe />
    },
    {
        Icon: Pencil,
        name: 'Whiteboard (Bientôt)',
        description: 'Un canvas infini pour dessiner vos architectures.',
        href: '/login',
        cta: 'En savoir plus',
        className: 'col-span-3 lg:col-span-1 opacity-80',
        background: (
            <DotPattern className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
        )
    }
];

const files = [
    {
        name: 'presentation.pdf',
        body: 'The presentation file for the meeting with the client on Monday.'
    },
    {
        name: 'finances.xlsx',
        body: "There's the budget breakdown for Q2 and Q3."
    },
    {
        name: 'logo.svg',
        body: 'The logo to set into our new website design.'
    },
    {
        name: 'clients.xlsx',
        body: 'Client contact information and project details.'
    },
    {
        name: 'Meeting_Notes.txt',
        body: 'Meeting notes from the last client call.'
    }
];

const features = [
    {
        Icon: FileTextIcon,
        name: 'Save your files',
        description: 'We automatically save your files as you type.',
        href: '#',
        cta: 'Learn more',
        className: 'col-span-3 lg:col-span-1',
        background: (
            <Marquee
                pauseOnHover
                className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
            >
                {files.map((f, idx) => (
                    <figure
                        key={idx}
                        className={cn(
                            'relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4',
                            'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
                            'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
                            'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none'
                        )}
                    >
                        <div className="flex flex-row items-center gap-2">
                            <div className="flex flex-col">
                                <figcaption className="text-sm font-medium dark:text-white">
                                    {f.name}
                                </figcaption>
                            </div>
                        </div>
                        <blockquote className="mt-2 text-xs">
                            {f.body}
                        </blockquote>
                    </figure>
                ))}
            </Marquee>
        )
    },
    {
        Icon: BellIcon,
        name: 'Notifications',
        description: 'Get notified when something happens.',
        href: '#',
        cta: 'Learn more',
        className: 'col-span-3 lg:col-span-2',
        background: (
            <AnimatedList className="absolute inset-0 overflow-hidden p-4 [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)]">
                {notifications.map((item, idx) => (
                    <Notification {...item} key={idx} />
                ))}
            </AnimatedList>
        )
    },
    {
        Icon: Share2Icon,
        name: 'Integrations',
        description: 'Supports 100+ integrations and counting.',
        href: '#',
        cta: 'Learn more',
        className: 'col-span-3 lg:col-span-2',
        background: (
            <div className="absolute top-4 right-2 h-[300px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-lg" />
        )
    },
    {
        Icon: CalendarIcon,
        name: 'Calendar',
        description: 'Use the calendar to filter your files by date.',
        className: 'col-span-3 lg:col-span-1',
        href: '#',
        cta: 'Learn more',
        background: (
            <div className="absolute inset-0 bg-white rounded-lg shadow-inner">
                <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100" />
            </div>
        )
    }
];

const Circle = React.forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-background p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
                className
            )}
        >
            {children}
        </div>
    );
});
Circle.displayName = 'Circle';

export const HomePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Refs pour le schéma animé
    const containerRef = useRef<HTMLDivElement>(null);
    const githubRef = useRef<HTMLDivElement>(null);
    const taskflowRef = useRef<HTMLDivElement>(null);
    const dbRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative min-h-screen w-full flex flex-col bg-background font-sans antialiased">
            <Header />
            <main className="relative z-10">
                <section className="relative container overflow-hidden px-4 pt-20 pb-32 md:pt-32">
                    <Meteors number={3000} />
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center relative z-10">
                        <div className="flex flex-col items-start text-left space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm"
                            >
                                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                                v1.0 Public Beta Launch
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl font-extrabold tracking-tight sm:text-6xl xl:text-7xl"
                            >
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                                    Gérez vos projets <br />
                                </span>

                                <AuroraText
                                    className="block"
                                    colors={[
                                        '#10B981',
                                        '#059669',
                                        '#047857',
                                        '#065F46',
                                        '#064E3B'
                                    ]}
                                    speed={1}
                                >
                                    à la vitesse de l'éclair.
                                </AuroraText>
                            </motion.h1>

                            <div className="max-w-lg text-lg text-muted-foreground sm:text-xl leading-loose">
                                <Highlighter
                                    action="underline"
                                    color="#FF9800"
                                    className="inline-block align-bottom"
                                    isView={true}
                                >
                                    L'alternative open-source à Trello et Jira.
                                </Highlighter>
                                <br />
                                <br />
                                Conçue pour les développeurs, synchronisée avec
                                GitHub,{' '}
                                <Highlighter
                                    action="highlight"
                                    color="var(--highlighter-color)"
                                    className="inline-block align-bottom rounded px-1"
                                    isView={true}
                                >
                                    propulsée par l'IA.
                                </Highlighter>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col w-full sm:flex-row gap-4"
                            >
                                <Button
                                    size="lg"
                                    className="h-12 rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/20"
                                    onClick={() => navigate('/register')}
                                >
                                    Commencer gratuitement
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-12 rounded-full px-8 text-base bg-background/50 backdrop-blur border-muted hover:bg-muted/50"
                                >
                                    <Github className="mr-2 h-4 w-4" />{' '}
                                    Documentation
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center gap-4 text-sm text-muted-foreground pt-4"
                            >
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="h-9 w-9 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-xs font-bold text-white ring-2 ring-background"
                                        >
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex text-yellow-500 mb-1">
                                        <Star className="h-4 w-4 fill-current" />
                                        <Star className="h-4 w-4 fill-current" />
                                        <Star className="h-4 w-4 fill-current" />
                                        <Star className="h-4 w-4 fill-current" />
                                        <Star className="h-4 w-4 fill-current" />
                                    </div>
                                    <span className="font-medium text-foreground">
                                        Adopté par +500 développeurs
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{
                                duration: 1,
                                type: 'spring',
                                bounce: 0.3
                            }}
                            className="relative perspective-1000 group"
                        >
                            <div className="relative rounded-2xl border border-border/50 bg-zinc-950/50 shadow-2xl backdrop-blur-xl overflow-hidden transform transition-transform group-hover:scale-[1.02]">
                                <BorderBeam
                                    size={500}
                                    duration={15}
                                    delay={0}
                                    colorFrom="hsl(var(--primary))"
                                    colorTo="hsl(var(--primary))"
                                />

                                <div className="flex items-center gap-2 border-b border-border/50 bg-muted/20 px-4 py-3">
                                    <div className="flex gap-1.5">
                                        <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                                        <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                                        <div className="h-3 w-3 rounded-full bg-[#27C93F]" />
                                    </div>
                                    <div className="mx-auto flex h-6 w-1/2 items-center justify-center rounded-md bg-muted/50 text-xs font-medium text-muted-foreground font-mono">
                                        taskflow.eliasjhl-projects.fr
                                    </div>
                                </div>

                                <div className="relative aspect-[16/10] bg-zinc-900 p-1">
                                    <img
                                        src="https://www.media.thiga.co/hs-fs/hubfs/Imported_Blog_Media/gif-trello.gif?width=1532&height=919&name=gif-trello.gif"
                                        alt="Interface TaskFlow"
                                        className="h-full w-full object-cover rounded-xl opacity-95"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-white/5 pointer-events-none rounded-xl" />
                                </div>
                            </div>

                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }}
                                className="absolute -left-12 top-20 hidden lg:flex items-center gap-2 rounded-xl border border-border/50 bg-background/80 p-4 shadow-xl backdrop-blur-md"
                            >
                                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <Check className="h-5 w-5 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">
                                        Tâche terminée
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        CVE-2020-1337 fixed #956
                                    </p>
                                </div>
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }}
                                className="absolute -right-0 bottom-1 hidden lg:flex items-center gap-2 rounded-xl border border-border/50 bg-background/80 p-4 shadow-xl backdrop-blur-md"
                            >
                                <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                    <LucideMessageCircleWarning className="h-5 w-5 text-red-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">
                                        Tâche en retard
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Déploiement en production #904
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                <div className="border-y border-border/40 bg-background/50 py-10">
                    <Marquee className="[--duration:40s]">
                        {techStack.map((tech, i) => (
                            <div
                                key={i}
                                className="mx-8 flex items-center gap-2 group cursor-default"
                            >
                                <tech.Icon
                                    className={`h-8 w-8 ${tech.color} transition-all duration-300 group-hover:scale-110`}
                                />

                                <span className="text-xl font-bold text-muted-foreground/40 transition-colors group-hover:text-foreground">
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </Marquee>
                </div>

                <section className="container py-32 px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold md:text-5xl leading-tight">
                                Synchronisation GitHub <br />
                                <span className="text-primary">
                                    Bidirectionnelle.
                                </span>
                            </h2>
                            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                Ne perdez plus de temps à copier-coller. Vos
                                Issues GitHub deviennent des cartes TaskFlow.
                                Vos Pull Requests déplacent les cartes
                                automatiquement.
                            </p>
                            <ul className="mt-8 space-y-4">
                                <li className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Check className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-foreground">
                                        Import des Issues existantes
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Check className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-foreground">
                                        Lien automatique PR ↔ Carte
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Check className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-foreground">
                                        Mises à jour en temps réel via Webhooks
                                    </span>
                                </li>
                            </ul>
                            <Button
                                className="mt-10 rounded-full"
                                size="lg"
                                variant="secondary"
                            >
                                <GitPullRequest className="mr-2 h-5 w-5" />{' '}
                                Connecter un Repository
                            </Button>
                        </div>

                        <div
                            className="relative flex h-[400px] w-full items-center justify-center rounded-3xl border border-border/50 bg-muted/20 p-10 overflow-hidden"
                            ref={containerRef}
                        >
                            <div className="flex size-full flex-col items-stretch justify-between gap-15">
                                <div className="flex flex-row items-center justify-between mt-24">
                                    <Circle
                                        ref={githubRef}
                                        className="bg-black border-zinc-800"
                                    >
                                        <Github className="h-8 w-8 text-white" />
                                    </Circle>
                                    <Circle
                                        ref={taskflowRef}
                                        className="bg-primary/20 border-primary"
                                    >
                                        <div className="text-primary font-bold text-xl">
                                            T
                                        </div>
                                    </Circle>
                                </div>
                            </div>

                            <AnimatedBeam
                                containerRef={containerRef}
                                fromRef={githubRef}
                                toRef={taskflowRef}
                                curvature={60}
                                className="stroke-muted-foreground/50"
                            />
                            <AnimatedBeam
                                containerRef={containerRef}
                                fromRef={taskflowRef}
                                toRef={githubRef}
                                curvature={-60}
                                className="stroke-primary/50"
                                reverse
                            />
                            <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-lg bg-background/80 backdrop-blur text-xs font-mono border border-border">
                                <ArrowLeftRight className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                                Webhooks & Events
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container py-32 px-4 relative">
                    <div className="mb-16 max-w-3xl mx-auto text-center relative z-10">
                        <h2 className="text-4xl font-bold md:text-5xl">
                            La puissance d'un outil unifié.
                        </h2>
                        <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                            Fini la dispersion. TaskFlow centralise la gestion
                            de projet tech avec une architecture robuste et des
                            fonctionnalités pensées pour les devs.
                        </p>
                    </div>
                    <BentoGrid className="lg:grid-rows-2 relative z-10 max-w-6xl mx-auto [&>*]:min-h-[200px] lg:[&>*]:min-h-[250px]">
                        {features.map((feature) => (
                            <BentoCard key={feature.name} {...feature} />
                        ))}
                    </BentoGrid>
                </section>

                <section className="container py-32 px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-4xl font-bold md:text-5xl leading-tight mb-6">
                                Déployez en local <br />
                                <span className="text-muted-foreground">
                                    en 30 secondes.
                                </span>
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Vous voulez garder vos données chez vous ?
                                TaskFlow est conçu pour être auto-hébergé. Un
                                simple fichier Docker Compose suffit pour lancer
                                toute la stack.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 text-primary font-bold">
                                        1
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">
                                            Clonez le repo
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Récupérez le code source complet.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 text-primary font-bold">
                                        2
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">
                                            Lancez Docker
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Une seule commande pour tout
                                            démarrer.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 flex justify-center">
                            <div className="relative w-full max-w-lg">
                                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary to-blue-600 opacity-20 blur-xl" />

                                <Terminal className="min-h-[300px] w-full rounded-xl border border-border bg-black/90 shadow-2xl">
                                    <div className="flex flex-col gap-2 p-1 font-mono text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-500">
                                                ➜
                                            </span>
                                            <span className="text-blue-400">
                                                ~/taskflow
                                            </span>
                                            <span className="tesxt-zinc-400">
                                                docker compose up -d
                                            </span>
                                        </div>

                                        <div className="pl-6 text-zinc-300 space-y-1 pt-2">
                                            <div className="text-emerald-500 font-bold">
                                                <pre className="leading-none text-[10px] sm:text-xs">
                                                    {`
  _______        _    ______ _
 |__   __|      | |  |  ____| |
    | | __ _ ___| | _| |__  | | _____      __
    | |/ _\` / __| |/ /  __| | |/ _ \\ \\ /\\ / /
    | | (_| \\__ \\   <| |    | | (_) \\ V  V /
    |_|\\__,_|___/_|\\_\\_|    |_|\\___/ \\_/\\_/
`}
                                                </pre>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-green-500">
                                                    ✔
                                                </span>{' '}
                                                Network taskflow_default created
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-green-500">
                                                    ✔
                                                </span>{' '}
                                                Container taskflow-db started
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-green-500">
                                                    ✔
                                                </span>{' '}
                                                Container taskflow-redis started
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-green-500">
                                                    ✔
                                                </span>{' '}
                                                Container taskflow-api started
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-green-500">
                                                    ✔
                                                </span>{' '}
                                                Container taskflow-web started
                                            </div>
                                            <div className="text-blue-400 mt-2">
                                                TaskFlow is ready at
                                                http://localhost:3000
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 pt-2">
                                            <span className="text-green-500">
                                                ➜
                                            </span>
                                            <span className="text-blue-400">
                                                ~/taskflow
                                            </span>
                                            <span className="w-2 h-4 bg-zinc-500 animate-pulse" />
                                        </div>
                                    </div>
                                </Terminal>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container py-24 px-4">
                    <div className="relative rounded-3xl overflow-hidden bg-background border border-border px-6 py-24 text-center sm:px-16 shadow-2xl">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
                        <h2 className="relative text-3xl font-bold text-foreground md:text-5xl">
                            Prêt à livrer plus vite ?
                        </h2>
                        <p className="relative mx-auto mt-6 max-w-xl text-muted-foreground text-lg">
                            Rejoignez la communauté open-source TaskFlow.
                        </p>
                        <div className="relative mt-10 flex flex-col sm:flex-row justify-center gap-4">
                            <Button
                                size="lg"
                                className="rounded-full px-10 h-12 text-base"
                            >
                                Créer mon compte
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full px-10 h-12 text-base"
                            >
                                <DiscordIcon className="mr-2 h-5 w-5" />
                                Rejoindre le Discord
                            </Button>
                        </div>
                    </div>
                </section>

                <footer className="border-t border-border/50 bg-background/50 backdrop-blur-lg pt-16 pb-8">
                    <div className="container px-4">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                            <div className="col-span-2">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                                        T
                                    </div>
                                    <span className="font-bold text-xl">
                                        TaskFlow
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-sm mb-6 max-w-xs leading-relaxed">
                                    L'outil de gestion de projet open-source
                                    nouvelle génération pour les équipes
                                    techniques.
                                </p>
                                <div className="flex gap-4">
                                    <a
                                        href="#"
                                        className="text-muted-foreground hover:text-foreground transition-colors bg-muted/50 p-2 rounded-full hover:bg-muted"
                                    >
                                        <Github className="h-5 w-5" />
                                    </a>
                                    <a
                                        href="#"
                                        className="text-muted-foreground hover:text-foreground transition-colors bg-muted/50 p-2 rounded-full hover:bg-muted"
                                    >
                                        <DiscordIcon className="h-5 w-5" />
                                    </a>
                                    <a
                                        href="#"
                                        className="text-muted-foreground hover:text-foreground transition-colors bg-muted/50 p-2 rounded-full hover:bg-muted"
                                    >
                                        <Twitter className="h-5 w-5" />
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-4 text-foreground">
                                    Produit
                                </h4>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li>
                                        <Link
                                            to="/features"
                                            className="hover:text-foreground transition-colors"
                                        >
                                            Fonctionnalités
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/roadmap"
                                            className="hover:text-foreground transition-colors"
                                        >
                                            Roadmap
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/pricing"
                                            className="hover:text-foreground transition-colors"
                                        >
                                            Tarifs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/changelog"
                                            className="hover:text-foreground transition-colors"
                                        >
                                            Changelog
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4 text-foreground">
                                    Ressources
                                </h4>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li>
                                        <Link
                                            to="/docs"
                                            className="hover:text-foreground transition-colors"
                                        >
                                            Documentation
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="hover:text-foreground transition-colors"
                                        >
                                            GitHub Repo
                                        </a>
                                    </li>
                                    <li>
                                        <Link
                                            to="/blog"
                                            className="hover:text-foreground transition-colors"
                                        >
                                            Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="hover:text-foreground transition-colors"
                                        >
                                            Communauté
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4 text-foreground">
                                    Légal
                                </h4>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li>
                                        <Link
                                            to="/privacy"
                                            className="hover:text-foreground transition-colors"
                                        >
                                            Politique de confidentialité
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/terms"
                                            className="hover:text-foreground transition-colors"
                                        >
                                            CGU
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
                            <p>© 2025 TaskFlow. Projet Open Source.</p>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};
