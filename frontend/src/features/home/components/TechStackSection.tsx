/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** TechStackSection
 */

import { Marquee } from '@/components/ui/marquee';
import {
  SiNestjs,
  SiReact,
  SiGraphql,
  SiPrisma,
  SiPostgresql,
  SiFastify,
  SiTailwindcss,
  SiOpenai,
  SiTypescript,
} from 'react-icons/si';

const techStack = [
  { name: 'NestJS', Icon: SiNestjs, color: 'text-[#E0234E]' },
  { name: 'Fastify', Icon: SiFastify, color: 'dark:text-white text-black' },
  { name: 'GraphQL', Icon: SiGraphql, color: 'text-[#E10098]' },
  { name: 'Prisma', Icon: SiPrisma, color: 'text-[#2D3748] dark:text-white' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: 'text-[#4169E1]' },
  { name: 'React', Icon: SiReact, color: 'text-[#61DAFB]' },
  { name: 'Tailwind', Icon: SiTailwindcss, color: 'text-[#06B6D4]' },
  { name: 'OpenAI', Icon: SiOpenai, color: 'text-[#10A37F]' },
  { name: 'TypeScript', Icon: SiTypescript, color: 'text-[#3178C6]' },
];

export const TechStackSection = () => {
  return (
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
  );
};
