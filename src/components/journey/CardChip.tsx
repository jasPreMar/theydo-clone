import { useState, useRef, useEffect, useCallback } from 'react';
import { db } from '../../db/database';
import type { Insight, Opportunity } from '../../types';

const chipColors: Record<string, string> = {
  insight: 'bg-red-50 border-red-200 text-red-700',
  opportunity: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  solution: 'bg-blue-50 border-blue-200 text-blue-700',
  text: 'bg-gray-50 border-gray-200 text-gray-600',
};

interface Props {
  refType: string;
  data?: Insight | Opportunity | null;
  content?: string;
  itemId?: string;
}

export function CardChip({ refType, data, content, itemId }: Props) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const colors = chipColors[refType] ?? chipColors.text;

  const title = data ? ('title' in data ? data.title : '') : content ?? '';

  const autoResize = useCallback(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = ta.scrollHeight + 'px';
    }
  }, []);

  useEffect(() => {
    if (editing) {
      const ta = textareaRef.current;
      if (ta) {
        ta.focus();
        ta.selectionStart = ta.value.length;
        autoResize();
      }
    }
  }, [editing, autoResize]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editing) {
      setEditValue(title);
      setEditing(true);
    }
  };

  const save = useCallback(async () => {
    const trimmed = editValue.trim();
    setEditing(false);
    if (trimmed === title) return;

    if (refType === 'text' && itemId) {
      await db.laneItems.update(itemId, { content: trimmed });
    } else if (refType === 'insight' && data) {
      await db.insights.update(data.id, { title: trimmed });
    } else if (refType === 'opportunity' && data) {
      await db.opportunities.update(data.id, { title: trimmed });
    }
  }, [editValue, title, refType, itemId, data]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      setEditing(false);
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      save();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full rounded border px-2 py-1 text-left text-xs cursor-pointer ${colors}`}
    >
      {editing ? (
        <textarea
          ref={textareaRef}
          value={editValue}
          onChange={(e) => {
            setEditValue(e.target.value);
            autoResize();
          }}
          onBlur={save}
          onKeyDown={handleKeyDown}
          className="w-full resize-none bg-transparent outline-none text-xs leading-normal"
          rows={1}
        />
      ) : (
        <span>{title}</span>
      )}
    </div>
  );
}
