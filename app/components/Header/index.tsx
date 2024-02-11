import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div />
      <div>
        <div className={styles['header-logo']}>
          <div />
          <div className={styles['header-logo-title']}>
            <span>clÈon</span>
          </div>
          <div className={styles['header-logo-subtitle']}>
            <span>l`usine incontournable pour l`automobile de demain</span>
          </div>
        </div>
      </div>
    </header>
  );
}
