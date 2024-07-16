import React from 'react';
import styles from './HeaderHomeDiscount.module.css';
import discount1 from '../../assets/discount 1.png';
import discount2 from '../../assets/discount 2.png';

const HeaderHomeDiscount = () => {
  return (
    <div style={{ width: "100%" }} className='con'>
      {/* number 1 */}
      <div className={styles.discountWrapper1}>
        <div className={styles.discountImageWrapper}>
          <img src={discount1} alt='Haircut Discount' className={styles.discountImage1} />
          <img src={discount2} alt='Haircut Discount' className={styles.discountImage2} />
        </div>
        <p className={styles.discountText}>
          Get 25% off on your first Hair cut.
        </p>
      </div>

      {/* number 2 */}
      <div className={styles.discountWrapper2}>
        <div className={styles.discountImageWrapper}>
          <img src={discount2} alt='Haircut Discount' className={styles.discountImage2} />
          <img src={discount1} alt='Haircut Discount' className={styles.discountImage1} />
        </div>
        <p className={styles.discountText}>
          Get 52% off on your first
          Shampoo treatment.
        </p>
      </div>

    </div>
  );
};

export default HeaderHomeDiscount;