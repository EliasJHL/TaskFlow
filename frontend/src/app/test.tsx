/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** test
 */

import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

export function Test() {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw hideUi={false}>{/* <CustomUI /> */}</Tldraw>
    </div>
  );
}
