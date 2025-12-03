/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** getAvatarUrl
*/

export const getAvatarUrl = (username: string) => {
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${username}&backgroundColor=3ECF8E,7B61FF,FF5733`;
};