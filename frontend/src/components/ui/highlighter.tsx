import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { annotate } from "rough-notation";
import { type RoughAnnotation } from "rough-notation/lib/model";
import { cn } from "@/lib/utils";

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket";

interface HighlighterProps {
  children: React.ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  className?: string;
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  className,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  });

  const shouldShow = isInView;

  useEffect(() => {
    if (!shouldShow) return;

    const element = elementRef.current;
    if (!element) return;

    const annotationConfig = {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    };

    const annotation = annotate(element, annotationConfig);

    annotationRef.current = annotation;
    annotationRef.current.show();

    const resizeObserver = new ResizeObserver(() => {
      if (annotationRef.current) {
        annotationRef.current.hide();
        setTimeout(() => annotationRef.current?.show(), 100);
      }
    });

    resizeObserver.observe(element);
    
    return () => {
      if (annotationRef.current) {
        annotationRef.current.remove();
      }
      resizeObserver.disconnect();
    };
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ]);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
        setIsReady(true);
    });
  }, []);

  return (
    <span
      ref={elementRef}
      className={cn(
        "relative inline-block py-1",
        !isReady && "invisible", 
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </span>
  );
}
