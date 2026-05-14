'use client';

import { Card, Button, Rate, Tag, Tooltip } from 'antd';
import { DollarOutlined, PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { Car } from '@/types/car';
import Link from 'next/link';
import Image from 'next/image';
import { useComparisonStore } from '@/stores/useComparisonStore';
import styles from './carCard.module.scss';
import { memo } from 'react';

export const CarCard = memo((car: Car) => {
  const addToComparison = useComparisonStore((state) => state.addToComparison);
  const isInComparison = useComparisonStore((state) => state.isInComparison(car.id));
  const cars = useComparisonStore((state) => state.comparisonCars);

  const handleCompare = () => {
    addToComparison(car);
  };

  const isMaxReached = cars.length >= 4 && !isInComparison;

  return (
    <Card
      hoverable
      cover={
        <div className={styles.cover}>
          <Image
            className={styles.image}
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      }
      actions={[
        <Tooltip
          key='compare'
          title={isInComparison ? 'Already in comparison list' : isMaxReached ? 'Maximum 4 cars reached' : 'Add to comparison'}
        >
          <Button
            type={isInComparison ? 'primary' : 'default'}
            icon={isInComparison ? <CheckOutlined /> : <PlusOutlined />}
            onClick={handleCompare}
            disabled={isInComparison || isMaxReached}
            aria-label={`Add ${car.brand} ${car.model} to comparison`}
          >
            {isInComparison ? 'Added' : 'Compare'}
          </Button>
        </Tooltip>,
        <Link href={`/car/${car.id}`} key='details' passHref>
          <Button type='link' aria-label={`View details of ${car.brand} ${car.model}`}>
            Details →
          </Button>
        </Link>,
      ]}
    >
      <Card.Meta
        title={
          <div className={styles.title}>
            <span>
              {car.brand} {car.model}
            </span>
            <Tag color='blue'>{car.type}</Tag>
          </div>
        }
        description={
          <div>
            <div className={styles.price}>
              <DollarOutlined className={styles.price_icon} />
              <strong>${car.price.toLocaleString()}</strong>
            </div>
            <div className={styles.rating}>
              <Rate className={styles.rate} disabled defaultValue={car.rating} allowHalf />
            </div>
          </div>
        }
      />
    </Card>
  );
});

CarCard.displayName = 'CarCard';
