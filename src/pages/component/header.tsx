import Head from "next/head";
import Image from "next/image";
import logo from "/public/logo-richardtirta.png";


export default function Header() {

  return (
    <>
      <Head>
        <title>Richard is happy to help you own the world</title>
        <meta name="description" content="Front End Developer with over 8 years experience. Specialize in marketing industry." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon/favicon_base.png" />
      </Head>
      <header>
        <div className="header-container">
        <div className="logo-container">
          <a id="logo-richardtirta" href="/" className="logo-richardtirta">
            <Image alt="Richard Tirta Widjaja" src={logo} width={500} height={59} />
            <span>Richard Tirta Widjaja</span>
          </a>
        </div>
        <nav>
          <ul>
            <li><a href="#works">Works</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#thoghts">Thoughts</a></li>
          </ul>
        </nav>
        </div>
      </header>
    </>
  );
}
