'use client';

import { Row, Col, Spin, Empty } from 'antd';
import { CarCard } from '../CarCard/CarCard';
import { Car } from '@/types/car';
import styles from './carGrid.module.scss';
interface CarGridProps {
  cars: Car[];
  loading: boolean;
}

export const CarGrid = ({ cars, loading }: CarGridProps) => {
  if (loading) {
    return (
      <div className={styles.loader}>
        <Spin size='large' description='Loading cars...' />
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className={styles.empty}>
        <Empty description='No cars match your filters' />
      </div>
    );
  }

  return (
    <Row gutter={[24, 24]} className={styles.row}>
      {cars.map((car) => (
        <Col xs={24} sm={12} lg={8} xl={6} key={car.id}>
          <CarCard {...car} />
        </Col>
      ))}
    </Row>
  );
};
