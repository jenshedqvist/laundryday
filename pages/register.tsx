import { useRouter } from 'next/router';
import Routes from '../data/routes';
import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import Container from '../components/container';
import Text from '../components/text';
import styleUtil from '../styles/utils/space.module.css';

export default function Login() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Log in | Laundry Day</title>
        <meta name="description" content="Log in to Laundry App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <form
          action={`/${Routes.Overview}`}
          onSubmit={() => router.push(Routes.Overview)}
        >
          <Text.Prose className={styleUtil.mt3}>
            <h1>Create account</h1>
            <p>[Username]</p>
            <p>[Password]</p>
            <button>Log in</button>
          </Text.Prose>
        </form>
      </Container>
      <Footer />
    </>
  );
}
