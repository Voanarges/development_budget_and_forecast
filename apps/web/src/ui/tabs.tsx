import { NavLink } from 'react-router-dom';
import { cx, FOCUS, SOFT } from './cx';

export interface TabItem {
  label: string;
  /** Relative or absolute route; the URL is the source of truth for the active tab. */
  to: string;
}

export interface TabsProps {
  items: TabItem[];
  label: string;
}

/** Route-based tabs: a horizontal chip scroller on mobile, an underlined bar from `sm`. */
export function Tabs({ items, label }: TabsProps) {
  return (
    <nav aria-label={label} className="-mx-1 overflow-x-auto">
      <ul role="tablist" className="flex min-w-max gap-1 border-b border-line px-1">
        {items.map((item) => (
          <li key={item.to} role="presentation">
            <NavLink
              to={item.to}
              role="tab"
              className={({ isActive }) =>
                cx(
                  'relative block rounded-t-lg px-3 py-2 text-sm whitespace-nowrap',
                  SOFT,
                  FOCUS,
                  isActive
                    ? 'font-semibold text-brand-600 after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:rounded-full after:bg-brand-500'
                    : 'text-muted hover:bg-subtle hover:text-ink',
                )
              }
            >
              {({ isActive }) => <span aria-selected={isActive}>{item.label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
