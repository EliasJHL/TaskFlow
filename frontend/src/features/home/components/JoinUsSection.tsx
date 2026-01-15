/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** JoinUsSection
 */

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Disc } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const JoinUsSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="container py-24 px-4">
      <div className="relative rounded-3xl overflow-hidden bg-background border border-border px-6 py-24 text-center sm:px-16 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <h2 className="relative text-3xl font-bold text-foreground md:text-5xl">
          {t('home.cta.title')}
        </h2>
        <p className="relative mx-auto mt-6 max-w-xl text-muted-foreground text-lg">
          {t('home.cta.description')}
        </p>
        <div className="relative mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full px-10 h-12 text-base"
            onClick={() => navigate('/register')}
          >
            {t('common.create_account')}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-10 h-12 text-base"
          >
            <Disc className="mr-2 h-5 w-5" />
            {t('common.join_discord')}
          </Button>
        </div>
      </div>
    </section>
  );
};
