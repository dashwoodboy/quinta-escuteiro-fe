import {
  About,
  Activities,
  Contact,
  Footer,
  Header,
  Hero,
  Reservations,
  Scrollbar,
} from './components';
import { I18nProvider } from './i18n/I18nProvider';

export default function App() {
  return (
    <I18nProvider>
      <Scrollbar />
      <Header />
      <main>
        <Hero />
        <About />
        <Activities />
        <Reservations />
        <Contact />
      </main>
      <Footer />
    </I18nProvider>
  );
}
