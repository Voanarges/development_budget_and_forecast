import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { cx, FOCUS } from '../../ui/cx';

/** Header search input (placeholder from block 02): submits to /search?q=. ⌘K / Ctrl+K focuses it. */
export function GlobalSearch() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (term) navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <form role="search" onSubmit={onSubmit} className="relative w-full max-w-md">
      <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
      <input
        ref={inputRef}
        type="search"
        aria-label="Search"
        placeholder="Search projects, items, suppliers…  ⌘K"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className={cx('w-full rounded-lg border border-line bg-subtle py-1.5 pr-3 pl-9 text-sm placeholder:text-muted', FOCUS)}
      />
    </form>
  );
}
