'use client';

import { ClearOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Select, Slider, Typography } from 'antd';
import styles from './filters.module.scss';
import { FiltersProps } from '../../types/filters';

const { Title } = Typography;
const { Option } = Select;

export const Filters = (props: FiltersProps) => {
  const handlePriceChange = (value: number[]) => {
    props.onPriceChange([value[0], value[1]]);
  };

  return (
    <Card className={styles.filters}>
      <Row gutter={[24, 16]} align='middle'>
        <Col xs={24} md={6}>
          <div>
            <Title level={5}>Price Range</Title>
            <div style={{ padding: '0 8px' }}>
              <Slider
                range
                min={props.minPrice}
                max={props.maxPrice}
                value={[props.priceRange[0], props.priceRange[1]]}
                onChange={handlePriceChange}
                tooltip={{ formatter: (value) => `$${value?.toLocaleString()}` }}
                aria-label='Price range filter'
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>${props.priceRange[0].toLocaleString()}</span>
                <span>${props.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} md={5}>
          <Title level={5}>Brand</Title>
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='Select brands'
            value={props.selectedBrands}
            onChange={(values: string[]) => {
              const added = values.filter((v: string) => !props.selectedBrands.includes(v));
              const removed = props.selectedBrands.filter((v: string) => !values.includes(v));
              added.forEach(props.onBrandToggle);
              removed.forEach(props.onBrandToggle);
            }}
            aria-label='Filter by brand'
          >
            {props.availableBrands.map((brand) => (
              <Option key={brand} value={brand}>
                {brand}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} md={5}>
          <Title level={5}>Car Type</Title>
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='Select types'
            value={props.selectedTypes}
            onChange={(values: string[]) => {
              const added = values.filter((v: string) => !props.selectedTypes.includes(v));
              const removed = props.selectedTypes.filter((v: string) => !values.includes(v));
              added.forEach(props.onTypeToggle);
              removed.forEach(props.onTypeToggle);
            }}
            aria-label='Filter by car type'
          >
            {props.availableTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} md={5}>
          <Title level={5}>Sort By</Title>
          <Select style={{ width: '100%' }} value={props.sortBy} onChange={props.onSortChange} aria-label='Sort cars'>
            <Option value='rating-desc'>Highest Rating</Option>
            <Option value='price-asc'>Price: Low to High</Option>
            <Option value='price-desc'>Price: High to Low</Option>
            <Option value='weight-asc'>Lightest First</Option>
          </Select>
        </Col>

        <Col xs={24} md={3}>
          <Button icon={<ClearOutlined />} onClick={props.onReset} style={{ marginTop: 24, width: '100%' }} aria-label='Reset all filters'>
            Reset
          </Button>
        </Col>
      </Row>
    </Card>
  );
};
