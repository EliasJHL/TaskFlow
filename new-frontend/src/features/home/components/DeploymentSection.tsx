/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** DeploymentSection
 */

import { useTranslation } from 'react-i18next';
import {
  Terminal,
  AnimatedSpan,
  TypingAnimation,
} from '@/components/ui/terminal';

export const DeploymentSection = () => {
  const { t } = useTranslation();

  return (
    <section className="container py-32 px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-4xl font-bold md:text-5xl leading-tight mb-6">
            {t('home.docker.title')} <br />
            <span className="text-muted-foreground">
              {t('home.docker.subtitle')}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {t('home.docker.description')}
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 text-primary font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold">
                  {t('home.docker.step1_title')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('home.docker.step1_desc')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 text-primary font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold">
                  {t('home.docker.step2_title')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('home.docker.step2_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 flex justify-center">
          <div className="relative w-full max-w-lg">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary to-blue-600 opacity-20 blur-xl" />

            <Terminal className="min-h-[400px] w-full rounded-xl border border-border bg-black/90 shadow-2xl">
              <TypingAnimation className="text-blue-500">
                &gt; docker compose up -d
              </TypingAnimation>

              <AnimatedSpan delay={1500} className="text-green-500">
                <pre className="text-[10px] leading-none sm:text-xs">
                  {`
          _______        _    ______ _
         |__   __|      | |  |  ____| |
            | | __ _ ___| | _| |__  | | _____      __
            | |/ _\` / __| |/ /  __| | |/ _ \\ \\ /\\ / /
            | | (_| \\__ \\   <| |    | | (_) \\ V  V /
            |_|\\__,_|___/_|\\_\\_|    |_|\\___/ \\_/\\_/
        `}
                </pre>
              </AnimatedSpan>
              <AnimatedSpan delay={2000} className="text-green-500">
                ✔ Network taskflow_default created
              </AnimatedSpan>
              <AnimatedSpan delay={2500} className="text-green-500">
                ✔ Container taskflow-db started
              </AnimatedSpan>
              <AnimatedSpan delay={3000} className="text-green-500">
                ✔ Container taskflow-redis started
              </AnimatedSpan>
              <AnimatedSpan delay={3500} className="text-green-500">
                ✔ Container taskflow-api started
              </AnimatedSpan>
              <AnimatedSpan delay={4000} className="text-green-500">
                ✔ Container taskflow-web started
              </AnimatedSpan>
              <AnimatedSpan delay={4500}>
                ✨ TaskFlow is ready at http://localhost:3000
              </AnimatedSpan>
            </Terminal>
          </div>
        </div>
      </div>
    </section>
  );
};
