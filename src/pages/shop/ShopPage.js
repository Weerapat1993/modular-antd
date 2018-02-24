import React from 'react'
import { List, Card } from 'antd'
import { LinkConfirm } from '../../components'

const { Meta } = Card;

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

const ShopPage = () => {
  const confirmUrl = (url) => {
    const title = 'Do you Want to open github profile?'
    LinkConfirm(title, url)
  }
  return (
    <div>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              onClick={() => confirmUrl('http://localhost:3000')}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta
                title={item.title}
                description="www.instagram.com"
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default ShopPage;
