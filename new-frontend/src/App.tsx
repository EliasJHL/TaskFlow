/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** App
 */

import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { Toaster } from "@/components/ui/sonner";

export default function App() {  
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </>
  );
}