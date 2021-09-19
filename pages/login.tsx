import React from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { UserContext } from '../contexts/User';
import Routes from '../data/routes';
import Header from '../components/header';
import Footer from '../components/footer';
import Container from '../components/container';
import Card from '../components/card';
import spaceUtil from '../styles/utils/space.module.css';
import sizeUtil from '../styles/utils/size.module.css';
import formStyles from '../components/form/form.module.css';
import buttonStyles from '../components/button/button.module.css';

export default function Login() {
  const { setIsAuthenticated } = React.useContext(UserContext);
  const router = useRouter();
  const { redirect } = router.query;
  const hash = process.browser && document.location.hash;
  const redirectPath = redirect
    ? Array.isArray(redirect)
      ? `${redirect.join('')}${hash}`
      : `${redirect}${hash}`
    : `/${Routes.Home}`;

  return (
    <>
      <Head>
        <title>Log in | Laundry Day</title>
        <meta name="description" content="Log in to Laundry App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <Card className={classNames(sizeUtil.size1of2, spaceUtil.mt4)}>
          <form
            action={redirectPath}
            method="POST"
            onSubmit={(event) => {
              event.preventDefault();
              setIsAuthenticated(true);
              router.push(redirectPath);
            }}
          >
            <h2 className={formStyles.formHeading}>Login to manage bookings</h2>
            <div className={spaceUtil.mb3}>
              <label htmlFor="email" className={formStyles.label}>
                E-mail (user name)
              </label>
              <input
                type="email"
                id="email"
                className={formStyles.singleField}
                required
                placeholder="your.email@acme.corp"
              />
            </div>
            <div className={spaceUtil.mb3}>
              <label htmlFor="pw" className={formStyles.label}>
                Password
              </label>
              <input
                type="password"
                id="pw"
                required
                className={formStyles.singleField}
              />
            </div>
            <button className={buttonStyles.button} type="submit">
              Log in
            </button>
          </form>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
