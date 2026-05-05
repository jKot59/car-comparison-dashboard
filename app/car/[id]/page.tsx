import { notFound } from 'next/navigation';
import { Car } from '@/types/car';
import Image from 'next/image';
import { Card, Descriptions, Rate, Tag, Button } from 'antd';
import { DollarOutlined, ThunderboltOutlined, StarOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Metadata } from 'next';
import styles from './page.module.scss';

async function getCar(id: string): Promise<Car | null> {
  const fs = await import('fs');
  const path = await import('path');
  const filePath = path.join(process.cwd(), 'public', 'cars.json');
  const data = await fs.promises.readFile(filePath, 'utf-8');
  const cars: Car[] = JSON.parse(data);
  return cars.find((car) => car.id === id) || null;
}

export async function generateMetadata(id: string): Promise<Metadata> {
  const car = await getCar(id);
  if (!car) return { title: 'Car Not Found' };
  return {
    title: `${car.brand} ${car.model} | Specifications & Pricing`,
    description: `View detailed specifications of ${car.brand} ${car.model}. Price: $${car.price}, Rating: ${car.rating}/5, Horsepower: ${car.horsepower} HP.`,
  };
}

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const car = await getCar(id);

  if (!car) notFound();

  return (
    <div className={`container ${styles.container}`}>
      <Link href='/'>
        <Button icon={<ArrowLeftOutlined />} className={styles.back_btn}>
          Back to all cars
        </Button>
      </Link>

      <Card>
        <div className={styles.car_content}>
          <div className={styles.car_image}>
            <Image className={styles.image} src={car.image} alt={`${car.brand} ${car.model}`} fill priority />
          </div>

          <div>
            <h1 className={styles.car_title}>
              {car.brand} {car.model}
            </h1>
            <Tag color='blue' className={styles.car_type}>
              {car.type}
            </Tag>
          </div>

          <Descriptions bordered column={1}>
            <Descriptions.Item
              label={
                <>
                  <DollarOutlined /> Price
                </>
              }
            >
              <strong>${car.price.toLocaleString()}</strong>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <StarOutlined /> Rating
                </>
              }
            >
              <Rate disabled defaultValue={car.rating} allowHalf />
              <span className={styles.rating}>({car.rating}/5)</span>
            </Descriptions.Item>
            <Descriptions.Item label='Weight'>{car.weight} kg</Descriptions.Item>
          </Descriptions>
        </div>
      </Card>
    </div>
  );
}
