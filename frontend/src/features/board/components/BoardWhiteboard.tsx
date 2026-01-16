import { useEffect, useMemo, useRef } from "react";
import { useMutation } from "@apollo/client";
import { Tldraw, type Editor } from "tldraw";
import "tldraw/tldraw.css";

import { UpdateBoardDocument } from "@/graphql/generated";

interface BoardWhiteboardProps {
  boardId: string;
  initialData?: string | null;
}

const SAVE_DEBOUNCE_MS = 800;

export const BoardWhiteboard = ({ boardId, initialData }: BoardWhiteboardProps) => {
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string | null>(initialData ?? null);
  const editorRef = useRef<Editor | null>(null);
  const isApplyingRemoteRef = useRef(false);

  const initialSnapshot = useMemo(() => {
    if (!initialData) return null;
    try {
      return JSON.parse(initialData);
    } catch {
      return null;
    }
  }, [initialData]);

  const handleMount = (editor: Editor) => {
    editorRef.current = editor;
    if (initialSnapshot) {
      editor.loadSnapshot(initialSnapshot);
    }

    const unsubscribe = editor.store.listen(
      () => {
        if (isApplyingRemoteRef.current) return;
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }
        saveTimeoutRef.current = setTimeout(() => {
          const snapshot = editor.getSnapshot();
          const nextValue = JSON.stringify(snapshot);
          if (nextValue === lastSavedRef.current) return;
          lastSavedRef.current = nextValue;
          updateBoard({
            variables: {
              board_id: boardId,
              input: { whiteboard_data: nextValue },
            },
          });
        }, SAVE_DEBOUNCE_MS);
      },
      { source: "user", scope: "document" }
    );

    return () => {
      unsubscribe();
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (!initialData) return;
    if (initialData === lastSavedRef.current) return;

    try {
      const snapshot = JSON.parse(initialData);
      isApplyingRemoteRef.current = true;
      editor.loadSnapshot(snapshot);
      lastSavedRef.current = initialData;
    } catch {
      return;
    } finally {
      setTimeout(() => {
        isApplyingRemoteRef.current = false;
      }, 0);
    }
  }, [initialData]);

  const licenseKey = import.meta.env.VITE_TLDRAW_LICENSE_KEY;
  const maxAssetSizeMb = Number(import.meta.env.VITE_TLDRAW_MAX_ASSET_MB ?? 50);
  const maxAssetSize = maxAssetSizeMb * 1024 * 1024;

  return (
    <div className="absolute inset-0">
      <Tldraw
        onMount={handleMount}
        licenseKey={licenseKey}
        maxAssetSize={maxAssetSize}
        acceptedVideoMimeTypes={[
          "video/mp4",
          "video/webm",
          "video/quicktime",
          "video/ogg",
          "video/mov",
          "video/avi",
        ]}
      />
    </div>
  );
};
