import Image from 'next/image';

import styles from './Footer.module.css';

export default function Footer() {
  console.log(111, process.env.NEXT_PUBLIC_GITHUB_REPO);
  console.log(222, process.env.GITHUB_REPO);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerBg}>
        <a href={process.env.NEXT_PUBLIC_GITHUB_REPO}>
          <Image src="/github-mark.png" width={24} height={24} alt="Img" draggable={false} />
          <Image src="/github-logo.png" width={54} height={24} alt="Img" draggable={false} />
          <span>go to the repo</span>
        </a>
      </div>
    </footer>
  );
}
