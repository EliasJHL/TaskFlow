/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** GitHubSection
 */

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { GitPullRequest, Check, ArrowLeftRight, Github } from 'lucide-react';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

const Circle = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-background p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
        className,
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = 'Circle';

export const GitHubSection = () => {
  const { t } = useTranslation();

  const containerRef = useRef<HTMLDivElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);
  const taskflowRef = useRef<HTMLDivElement>(null);

  return (
    <section className="container py-32 px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold md:text-5xl leading-tight">
            {t('home.github.title')} <br />
            <span className="text-primary">{t('home.github.subtitle')}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {t('home.github.description')}
          </p>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground">{t('home.github.item1')}</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground">{t('home.github.item2')}</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground">{t('home.github.item3')}</span>
            </li>
          </ul>
          <Button className="mt-10 rounded-full" size="lg" variant="secondary">
            <GitPullRequest className="mr-2 h-5 w-5" /> {t('home.github.cta')}
          </Button>
        </div>

        <div
          className="relative flex h-[400px] w-full items-center justify-center rounded-3xl border border-border/50 bg-muted/20 p-10 overflow-hidden"
          ref={containerRef}
        >
          <div className="flex size-full flex-col items-stretch justify-between gap-15">
            <div className="flex flex-row items-center justify-between mt-24">
              <Circle ref={githubRef} className="bg-black border-zinc-800">
                <Github className="h-8 w-8 text-white" />
              </Circle>
              <Circle
                ref={taskflowRef}
                className="bg-primary/50 border-primary"
              >
                <img
                  src="/TaskFlow.svg"
                  alt="TaskFlow Logo"
                  className="h-12 w-12 dark:brightness-0 dark:invert brightness-0"
                />
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
            {t('home.github.webhooks')}
          </div>
        </div>
      </div>
    </section>
  );
};
