/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** HeroSection
 */

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuroraText } from '@/components/ui/aurora-text';
import { Highlighter } from '@/components/ui/highlighter';
import {
  ArrowRight,
  Github,
  Star,
  Check,
  MessageCircleWarning as LucideMessageCircleWarning,
} from 'lucide-react';
import { BorderBeam } from '@/components/ui/border-beam';

export const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative container overflow-hidden px-4 pt-20 pb-32 md:pt-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center relative z-10">
        <div className="flex flex-col items-start text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            {t('home.hero.badge')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-extrabold tracking-tight sm:text-6xl xl:text-7xl"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
              {t('home.hero.title_prefix')} <br />
            </span>

            <AuroraText
              className="block"
              colors={['#10B981', '#059669', '#047857', '#065F46', '#064E3B']}
              speed={1}
            >
              {t('home.hero.title_suffix')}
            </AuroraText>
          </motion.h1>

          <div className="max-w-lg text-lg text-muted-foreground sm:text-xl leading-loose">
            <Highlighter
              action="underline"
              color="#FF9800"
              className="inline-block align-bottom"
              isView={true}
            >
              {t('home.hero.subtitle_highlight1')}
            </Highlighter>
            <br />
            <br />
            {t('home.hero.subtitle_text')}{' '}
            <Highlighter
              action="highlight"
              color="var(--highlighter-color)"
              className="inline-block align-bottom rounded px-1"
              isView={true}
            >
              {t('home.hero.subtitle_highlight2')}
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
              {t('common.start_free')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full px-8 text-base bg-background/50 backdrop-blur border-muted hover:bg-muted/50"
            >
              <Github className="mr-2 h-4 w-4" /> {t('common.documentation')}
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
                {t('home.hero.social_proof')}
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
            bounce: 0.3,
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
              ease: 'easeInOut',
            }}
            className="absolute -left-12 top-20 hidden lg:flex items-center gap-2 rounded-xl border border-border/50 bg-background/80 p-4 shadow-xl backdrop-blur-md"
          >
            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-bold">
                {t('home.hero.task_completed')}
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
              ease: 'easeInOut',
            }}
            className="absolute -right-0 bottom-1 hidden lg:flex items-center gap-2 rounded-xl border border-border/50 bg-background/80 p-4 shadow-xl backdrop-blur-md"
          >
            <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <LucideMessageCircleWarning className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-bold">{t('home.hero.task_overdue')}</p>
              <p className="text-xs text-muted-foreground">
                {t('home.hero.deploy_prod')} #904
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
