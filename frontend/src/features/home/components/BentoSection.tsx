/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** BentoSection
 */

import { useTranslation } from 'react-i18next';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { cn } from '@/lib/utils';
import { AnimatedList } from '@/components/ui/animated-list';
import { CalendarIcon, Share2Icon, FileTextIcon, BellIcon } from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';
import { FlickeringGrid } from '@/components/ui/flickering-grid';

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

const Notification = ({
  name,
  description,
  icon,
  color,
  time,
  avatar,
}: Item & { avatar?: string }) => {
  return (
    <figure
      className={cn(
        'relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4',
        'transition-all duration-200 ease-in-out hover:scale-[103%]',
        'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        'transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]',
      )}
    >
      <div className="flex flex-row items-center gap-3 overflow-hidden">
        <div
          className="flex size-10 items-center justify-center rounded-2xl overflow-hidden"
          style={{
            backgroundColor: avatar ? 'transparent' : color,
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

export const BentoSection = () => {
  const { t } = useTranslation();

  const files = [
    {
      name: 'presentation.pdf',
      body: t('home.files.presentation'),
    },
    {
      name: 'finances.xlsx',
      body: t('home.files.finances'),
    },
    {
      name: 'logo.svg',
      body: t('home.files.logo'),
    },
    {
      name: 'clients.xlsx',
      body: t('home.files.clients'),
    },
    {
      name: 'Meeting_Notes.txt',
      body: t('home.files.meeting_notes'),
    },
  ];

  const notifications = [
    {
      name: t('home.notifications.item1.name'),
      description: t('home.notifications.item1.desc'),
      time: t('home.notifications.item1.time'),
      icon: '💸',
      color: '#00C9A7',
      avatar:
        'https://plus.unsplash.com/premium_photo-1691784778805-e1067ac42e01?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: t('home.notifications.item2.name'),
      description: t('home.notifications.item2.desc'),
      time: t('home.notifications.item2.time'),
      icon: '👤',
      color: '#FFB800',
      avatar: 'https://avatars.githubusercontent.com/u/145333474?v=4',
    },
    {
      name: t('home.notifications.item3.name'),
      description: t('home.notifications.item3.desc'),
      time: t('home.notifications.item3.time'),
      icon: '💬',
      color: '#FF3D71',
      avatar: '',
    },
    {
      name: t('home.notifications.item4.name'),
      description: t('home.notifications.item4.desc'),
      time: t('home.notifications.item4.time'),
      icon: '📅',
      color: '#1E86FF',
      avatar: '',
    },
  ];

  const displayNotifications = Array.from(
    { length: 10 },
    () => notifications,
  ).flat();

  const features = [
    {
      Icon: FileTextIcon,
      name: t('home.features.files.name'),
      description: t('home.features.files.desc'),
      href: '#',
      cta: t('home.features.files.cta'),
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
                'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none',
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col">
                  <figcaption className="text-sm font-medium dark:text-white">
                    {f.name}
                  </figcaption>
                </div>
              </div>
              <blockquote className="mt-2 text-xs">{f.body}</blockquote>
            </figure>
          ))}
        </Marquee>
      ),
    },
    {
      Icon: BellIcon,
      name: t('home.features.notifications.name'),
      description: t('home.features.notifications.desc'),
      href: '#',
      cta: t('home.features.notifications.cta'),
      className: 'col-span-3 lg:col-span-2',
      background: (
        <AnimatedList className="absolute inset-0 overflow-hidden p-4 [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)]">
          {displayNotifications.map((item, idx) => (
            <Notification {...item} key={idx} />
          ))}
        </AnimatedList>
      ),
    },
    {
      Icon: Share2Icon,
      name: t('home.features.integrations.name'),
      description: t('home.features.integrations.desc'),
      href: '#',
      cta: t('home.features.integrations.cta'),
      className: 'col-span-3 lg:col-span-2',
      background: (
        <div className="bg-background relative size-[190px] w-full overflow-hidden">
          <FlickeringGrid
            className="relative inset-0 z-0 [mask-image:radial-gradient(350px_circle_at_center,white,transparent)]"
            squareSize={4}
            gridGap={6}
            color="#60A5FA"
            maxOpacity={0.5}
            flickerChance={0.1}
            height={800}
            width={800}
          />
        </div>
      ),
    },
    {
      Icon: CalendarIcon,
      name: t('home.features.calendar.name'),
      description: t('home.features.calendar.desc'),
      className: 'col-span-3 lg:col-span-1',
      href: '#',
      cta: t('home.features.calendar.cta'),
      background: (
        <Marquee
          pauseOnHover
          className="absolute bottom-10 [mask-image:linear-gradient(to_bottom,transparent_40%,#000_100%)] [--duration:20s]"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <div
              key={n}
              className={cn(
                'flex h-20 w-20 items-center justify-center rounded-xl border',
                'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
                'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
                'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none',
              )}
            >
              <span className="text-lg font-medium dark:text-white">{n}</span>
            </div>
          ))}
        </Marquee>
      ),
    },
  ];
  return (
    <section className="container py-32 px-4 relative">
      <div className="mb-16 max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-4xl font-bold md:text-5xl">
          {t('home.features_grid.title')}
        </h2>
      </div>
      <BentoGrid className="lg:grid-rows-2 relative z-10 max-w-6xl mx-auto [&>*]:min-h-[200px] lg:[&>*]:min-h-[250px]">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </section>
  );
};
