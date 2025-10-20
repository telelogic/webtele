import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getConsent, setConsent } from '@/lib/consent';

export function CookieConsent() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const state = getConsent();
    setVisible(state === 'unset');
  }, []);

  const accept = () => {
    setConsent('accepted');
    setVisible(false);
  };

  const decline = () => {
    setConsent('declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-4xl rounded-lg border border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-medium">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">{t('cookie.title')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('cookie.description')}{' '}
              <Link to="/privacy" className="underline underline-offset-2 hover:text-primary">
                {t('cookie.privacy')}
              </Link>
              {' '}
              &middot;
              {' '}
              <Link to="/terms" className="underline underline-offset-2 hover:text-primary">
                {t('cookie.terms')}
              </Link>
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Button variant="outline" size="sm" onClick={decline} className="border-border">
              {t('cookie.decline')}
            </Button>
            <Button onClick={accept} className="shadow-soft hover:shadow-glow" size="sm">
              {t('cookie.accept')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
