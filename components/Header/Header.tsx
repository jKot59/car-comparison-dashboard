import Link from 'next/link';
import { CarOutlined } from '@ant-design/icons';
import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href='/' className={styles.link_home}>
          <CarOutlined style={{ fontSize: 24, color: '#1677ff' }} />
          <span className={styles.link_text}>CarCompare</span>
        </Link>
      </div>
    </header>
  );
};
