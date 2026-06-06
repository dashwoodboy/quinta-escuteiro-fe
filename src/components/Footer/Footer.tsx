import { logo, regionLogo } from '../../assets';
import { site } from '../../data/site';
import { useI18n } from '../../i18n/I18nProvider';
import './Footer.scss';

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="" width={48} height={48} />
          <div>
            <strong>{site.name}</strong>
            <p>{site.tagline}</p>
          </div>
        </div>
        <p className="footer__copy">
          © {year} {site.name} · Corpo Nacional de Escutas
        </p>
        <a
          className="footer__regional"
          href={site.links[0].href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={regionLogo} alt={t('footer.regionalLogoAlt')} width={320} height={72} />
        </a>
      </div>
    </footer>
  );
}
