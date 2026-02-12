import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Lightbulb, Zap, Wrench, FileText,
  Mail, MessageSquare, Monitor, Smartphone,
  LayoutDashboard, ClipboardList, Database, Shield,
  Users, BookOpen, Eye, FolderOpen, PenLine, Presentation,
  GraduationCap, GitBranch, X,
  Table, Calendar, Video, Rss, Globe,
} from 'lucide-react';
import { db } from '../../db/database';
import type { Insight, Opportunity } from '../../types';

const chipColors: Record<string, string> = {
  insight: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-200',
  opportunity: 'bg-violet-50 border-violet-200 text-violet-800 dark:bg-violet-900/30 dark:border-violet-800 dark:text-violet-200',
  solution: 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-200',
  text: 'bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300',
};

const typeIcons: Record<string, React.ReactNode> = {
  insight: <Lightbulb className="h-3.5 w-3.5 shrink-0 text-red-400" />,
  opportunity: <Zap className="h-3.5 w-3.5 shrink-0 text-violet-400" />,
  solution: <Wrench className="h-3.5 w-3.5 shrink-0 text-blue-400" />,
};

// Keyword → icon mapping for touchpoint/text cards
const touchpointIcons: [RegExp, React.ReactNode][] = [
  [/email/i, <Mail className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/slack|chat|messag/i, <MessageSquare className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/cms|live.*monitor|asset.*monitor/i, <Eye className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/dashboard|queue/i, <LayoutDashboard className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/jira/i, <ClipboardList className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/ticket|project.*manage|assign/i, <ClipboardList className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/database|substantiat|precedent.*lib/i, <Database className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/regulat|compliance|legal|risk|escalat/i, <Shield className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/meeting/i, <Users className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/presentation/i, <Presentation className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/training/i, <GraduationCap className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/docs|document|acrobat|pdf|word/i, <PenLine className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/review.*tool|document.*editor|shared.*doc|review.*comment/i, <PenLine className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/drive|shared.*drive/i, <FolderOpen className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/archive/i, <FolderOpen className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/playbook|framework|guidance|notes/i, <BookOpen className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/brief|template/i, <BookOpen className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/approv/i, <GitBranch className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/spreadsheet|airtable|excel/i, <Table className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/calendar/i, <Calendar className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/video.*call|zoom|teams/i, <Video className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/rss|feed|newsletter/i, <Rss className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/website|linkedin|facebook|social/i, <Globe className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/figma|hubspot/i, <Monitor className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/creative|platform|tool/i, <Monitor className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
  [/app|mobile/i, <Smartphone className="h-3.5 w-3.5 shrink-0 text-gray-400" />],
];

function getTextIcon(content: string): React.ReactNode {
  for (const [pattern, icon] of touchpointIcons) {
    if (pattern.test(content)) return icon;
  }
  return <FileText className="h-3.5 w-3.5 shrink-0 text-gray-400" />;
}

interface Props {
  refType: string;
  data?: Insight | Opportunity | null;
  content?: string;
  itemId?: string;
  onDelete?: () => void;
}

export function CardChip({ refType, data, content, itemId, onDelete }: Props) {
  const title = data ? ('title' in data ? data.title : '') : content ?? '';

  const [editing, setEditing] = useState(title === '');
  const [editValue, setEditValue] = useState(title === '' ? '' : title);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const colors = chipColors[refType] ?? chipColors.text;

  const icon = refType === 'text' ? getTextIcon(title) : typeIcons[refType];

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

    // Blank save = delete the card
    if (trimmed === '' && onDelete) {
      onDelete();
      return;
    }

    if (trimmed === title) return;

    if (refType === 'text' && itemId) {
      await db.laneItems.update(itemId, { content: trimmed });
    } else if (refType === 'insight' && data) {
      await db.insights.update(data.id, { title: trimmed });
    } else if (refType === 'opportunity' && data) {
      await db.opportunities.update(data.id, { title: trimmed });
    }
  }, [editValue, title, refType, itemId, data, onDelete]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      // If content was empty (new card), treat escape as delete
      if (title === '' && onDelete) {
        setEditing(false);
        onDelete();
      } else {
        setEditing(false);
      }
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      save();
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <div
      onClick={handleClick}
      className={`group/chip relative w-full rounded-lg border px-3 py-2.5 text-left text-sm cursor-pointer ${colors}`}
    >
      {onDelete && !editing && (
        <button
          onClick={handleDeleteClick}
          className="absolute -right-1.5 -top-1.5 hidden h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-red-200 hover:text-red-600 group-hover/chip:flex dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-red-900 dark:hover:text-red-300"
          title="Remove card"
        >
          <X className="h-3 w-3" />
        </button>
      )}
      <div className="flex items-start gap-1.5">
        {icon}
        <div className="min-w-0 flex-1">
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
              className="w-full resize-none bg-transparent outline-none text-sm leading-normal font-medium"
              rows={1}
              placeholder="Type touchpoint name..."
            />
          ) : (
            <span className="font-medium leading-snug">{title}</span>
          )}
        </div>
      </div>
    </div>
  );
}
