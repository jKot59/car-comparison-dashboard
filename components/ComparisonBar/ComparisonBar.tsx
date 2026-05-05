'use client';

import { useComparisonStore } from '@/stores/useComparisonStore';
import { DeleteOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Space, Tag, Typography } from 'antd';
import Link from 'next/link';
import styles from './comparisonBar.module.scss';
const { Text } = Typography;

export const ComparisonBar = () => {
  const comparisonCars = useComparisonStore((state) => state.comparisonCars);
  const removeFromComparison = useComparisonStore((state) => state.removeFromComparison);
  const clearComparison = useComparisonStore((state) => state.clearComparison);

  if (comparisonCars.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className='container'>
        <div className={styles.content}>
          <div>
            <Text strong className={styles.compare}>
              Compare ({comparisonCars.length}/4):
            </Text>
            <Space wrap>
              {comparisonCars.map((car) => (
                <Tag key={car.id} closable onClose={() => removeFromComparison(car.id)} color='blue' className={styles.tag}>
                  {car.brand} {car.model}
                </Tag>
              ))}
            </Space>
          </div>
          <Space>
            {comparisonCars.length > 0 && (
              <Button size='small' icon={<DeleteOutlined />} onClick={clearComparison}>
                Clear all
              </Button>
            )}
            <Link href='/compare' passHref>
              <Button type='primary' icon={<SwapOutlined />}>
                View Comparison
              </Button>
            </Link>
          </Space>
        </div>
      </div>
    </div>
  );
};
