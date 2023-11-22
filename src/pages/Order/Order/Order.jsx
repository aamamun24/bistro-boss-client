import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import orderImg from '../../../assets/shop/banner2.jpg';
import Cover from '../../Shared/Cover/Cover';
import { useState } from 'react';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drink']
    const { category } = useParams()
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex)

    const [menu] = useMenu()
    const salad = menu.filter(item => item.category === 'salad')
    const dessert = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const soup = menu.filter(item => item.category === 'soup')
    const drink = menu.filter(item => item.category === 'drinks')

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>
            <Cover img={orderImg} title="Order" description="Would you like to try a dish?"></Cover>
            <Tabs className='mt-6' defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soups</Tab>
                    <Tab>Desserts</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={dessert}></OrderTab>
                </TabPanel>
                <TabPanel><OrderTab items={drink}></OrderTab></TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;