import { useState, useEffect, useRef } from 'react';
import { Layout, Icon, BackTop, Form } from 'antd';
import Head from 'next/head';
import Antd from '../styles/antd';
import '../styles/scss/main.scss';
import '../styles/scss/timeline-card.scss';
import '../styles/scss/post-detail.scss'


const MyApp = props => {
  const { Component, pageProps } = props;
  const [showComponent, setShowComponent] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowComponent(true);
    }, 200);
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    setVisible(true);
  }, []);
  return (
    <div>
      <Head>
        <title>Dummy Social Media</title>
        {/* <link rel="icon" href="/images/logo-circle.png" /> */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TCDFDS');`,
        }}>
        </script>

        <script dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '365074647742591');
            fbq('track', 'PageView');`,
        }}>
        </script>

      </Head>
      <Antd />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default MyApp
