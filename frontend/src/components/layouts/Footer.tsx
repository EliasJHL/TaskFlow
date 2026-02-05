/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** Footer
 */

import { Link } from 'react-router-dom';
import { Github, Disc as DiscordIcon, Twitter } from 'lucide-react';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-lg pt-16 pb-8">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/TaskFlow.svg"
                alt="TaskFlow Logo"
                className="h-12 w-12"
              />
              <span className="font-bold text-xl">TaskFlow</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs leading-relaxed">
              L'outil de gestion de projet open-source nouvelle génération pour
              les équipes techniques.
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
            <h4 className="font-semibold mb-4 text-foreground">Produit</h4>
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
            <h4 className="font-semibold mb-4 text-foreground">Ressources</h4>
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
                <a href="#" className="hover:text-foreground transition-colors">
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
                <a href="#" className="hover:text-foreground transition-colors">
                  Communauté
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Légal</h4>
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
  );
};

export default Footer;
