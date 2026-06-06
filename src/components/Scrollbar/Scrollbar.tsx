import { useCallback, useEffect, useState } from 'react';
import './Scrollbar.scss';

interface ThumbState {
  height: number;
  top: number;
  visible: boolean;
}

export function Scrollbar() {
  const [thumb, setThumb] = useState<ThumbState>({ height: 0, top: 0, visible: false });

  const update = useCallback(() => {
    const { scrollHeight, clientHeight } = document.documentElement;
    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll <= 8) {
      setThumb({ height: 0, top: 0, visible: false });
      return;
    }

    const viewport = window.innerHeight;
    const height = Math.max(48, Math.round((viewport / scrollHeight) * viewport));
    const top = Math.round((window.scrollY / maxScroll) * (viewport - height));

    setThumb({ height, top, visible: true });
  }, []);

  useEffect(() => {
    update();

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    const observer = new ResizeObserver(update);
    observer.observe(document.documentElement);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, [update]);

  if (!thumb.visible) return null;

  return (
    <div className="scrollbar-overlay" aria-hidden="true">
      <div
        className="scrollbar-overlay__thumb"
        style={{
          height: thumb.height,
          transform: `translate3d(0, ${thumb.top}px, 0)`,
        }}
      />
    </div>
  );
}
