'use client';

import { Table, Tag, Rate, Button, Empty, Typography, Card, Row, Col } from 'antd';
import { DeleteOutlined, DollarOutlined, ThunderboltOutlined, StarOutlined, CarOutlined, ProfileOutlined } from '@ant-design/icons';
import { Car } from '@/types/car';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './comparisonTable.module.scss';

const { Title, Text } = Typography;

interface ComparisonTableProps {
  cars: Car[];
  onRemove: (carId: string) => void;
  onClear: () => void;
}

export const ComparisonTable = ({ cars, onRemove, onClear }: ComparisonTableProps) => {
  if (cars.length === 0) {
    return (
      <div className={styles.empty}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='No cars selected for comparison'>
          <Link href='/'>
            <Button type='primary'>Browse Cars</Button>
          </Link>
        </Empty>
      </div>
    );
  }

  // Define all specifications to compare
  const specCategories = [
    {
      key: 'image',
      label: 'Car Image',
      render: (car: Car) => (
        <div className={styles.cover}>
          <Image src={car.image} alt={`${car.brand} ${car.model}`} fill className={styles.image} />
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      icon: <DollarOutlined className={styles.price_icon} />,
      render: (car: Car) => (
        <Text strong className={styles.price_text}>
          ${car.price.toLocaleString()}
        </Text>
      ),
    },
    {
      key: 'rating',
      label: 'Rating',
      icon: <StarOutlined className={styles.rating_icon} />,
      render: (car: Car) => (
        <div>
          <Rate disabled defaultValue={car.rating} allowHalf className={styles.rate} />
          <div className={styles.rating_text}>
            <Text type='secondary'>{car.rating}/5</Text>
          </div>
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Type',
      icon: <ThunderboltOutlined />,
      render: (car: Car) => (
        <Tag color='blue' className={styles.type}>
          {car.type}
        </Tag>
      ),
    },
    {
      key: 'weight',
      label: 'Weight',
      icon: <ProfileOutlined />,
      render: (car: Car) => <Text>{car.weight} kg</Text>,
    },

    {
      key: 'actions',
      label: 'Actions',
      render: (car: Car) => (
        <div className={styles.actions}>
          <Button size='small' danger icon={<DeleteOutlined />} onClick={() => onRemove(car.id)}>
            Remove
          </Button>
          <Link href={`/car/${car.id}`}>
            <Button size='small' type='link'>
              View Details
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className={styles.title_wrapper}>
        <Title level={3} className={styles.title}>
          Side-by-Side Comparison
        </Title>
        <Button danger icon={<DeleteOutlined />} onClick={onClear}>
          Clear All
        </Button>
      </div>

      {/* Horizontal Comparison Grid */}
      <div className={styles.grid_wrapper}>
        <div
          className={styles.grid}
          style={{
            gridTemplateColumns: `200px repeat(${cars.length}, minmax(250px, 1fr))`,
            minWidth: `${200 + cars.length * 250}px`,
          }}
        >
          <div className={styles.grid_name}>Name</div>
          {cars.map((car) => (
            <div key={car.id} className={styles.car_title_wrapper}>
              <Title level={5} className={styles.car_title}>
                {car.brand} {car.model}
              </Title>
            </div>
          ))}

          {/* rows */}
          {specCategories.map((spec) => (
            <React.Fragment key={`label-${spec.key}`}>
              <div className={styles.car_label}>
                {spec.icon && spec.icon}
                <span>{spec.label}</span>
              </div>

              {/* Spec values for each car */}
              {cars.map((car) => (
                <div key={`${spec.key}-${car.id}`} className={styles.car_data}>
                  {spec.render(car)}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
