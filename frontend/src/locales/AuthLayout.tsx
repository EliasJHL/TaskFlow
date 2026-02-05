import { Link } from 'react-router-dom';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkUrl: string;
  linkLabel: string;
}

export const AuthLayout = ({
  children,
  title,
  subtitle,
  linkText,
  linkUrl,
  linkLabel,
}: AuthLayoutProps) => {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 overflow-hidden bg-background">
      <div className="hidden lg:flex relative h-full flex-col justify-between bg-zinc-900 p-10 text-white border-r border-zinc-800">
        <div className="absolute inset-0 z-0 w-full h-full bg-zinc-950">
          <DotPattern
            className={cn(
              '[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]',
              'fill-white/10',
            )}
          />
        </div>

        <Link
          to="/"
          className="relative z-20 flex items-center gap-2 font-bold text-xl"
        >
          <img
            src="/TaskFlow.svg"
            alt="TaskFlow Logo"
            className="h-12 w-12"
          />
          TaskFlow
        </Link>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium leading-relaxed">
              &ldquo;N'hésitez pas à me faire des retours !&rdquo;
            </p>
            <footer className="text-sm text-zinc-400">
              Elias, développeur
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="flex h-full items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
        >
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          {children}
          <p className="px-8 text-center text-sm text-muted-foreground">
            {linkText}{' '}
            <Link
              to={linkUrl}
              className="underline underline-offset-4 hover:text-primary transition-colors"
            >
              {linkLabel}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
