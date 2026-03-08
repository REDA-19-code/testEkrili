import "../styles/footer.css";

function FooterSection() {
  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <div className="site-footer__logo-row">
              <span className="site-footer__logo-mark" aria-hidden="true">E</span>
              <strong className="site-footer__brand-name">Ekrili</strong>
            </div>
            <p className="site-footer__description">
              A smart owner dashboard for managing listings, visit requests, tenant
              activity, and property insights in one place.
            </p>
          </div>

          <nav className="site-footer__links" aria-label="Platform">
            <h3 className="site-footer__heading site-footer__heading--nav">Platform</h3>
            <a href="/" className="site-footer__link">Pricing</a>
            <a href="/" className="site-footer__link">Integrations</a>
            <a href="/" className="site-footer__link">Listing Guide</a>
          </nav>

          <nav className="site-footer__links site-footer__links--governance" aria-label="Governance">
            <h3 className="site-footer__heading site-footer__heading--nav">Governance</h3>
            <a href="/" className="site-footer__link">Privacy Policy</a>
            <a href="/" className="site-footer__link">Service Terms</a>
            <a href="/" className="site-footer__link">Security</a>
          </nav>

          <div className="site-footer__subscribe">
            <h3 className="site-footer__subscribe-title">Join Our Owner Community</h3>
            <form className="site-footer__subscribe-form">
              <input
                type="email"
                className="site-footer__input"
                placeholder="email@example.com"
                aria-label="Email address"
              />
              <button type="submit" className="site-footer__button">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            (C) 2026 EKRILI TECHNOLOGIES INC. ALL RIGHTS RESERVED.
          </p>
          <div className="site-footer__socials">
            <a href="https://www.facebook.com/raouf.zaid.50/" className="site-footer__social" target="_blank" rel="noreferrer">Facebook</a>
            <a href="/" className="site-footer__social" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/_abderraouf_zaid_/" className="site-footer__social" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
