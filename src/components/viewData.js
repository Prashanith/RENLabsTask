import React,{useState} from 'react'
import styles from './viewData.module.css'
import { Tabs } from '@mantine/core';
import View from './lineChart';
import StyledTabs from '../globalStyledComponents/styledTabs';


function ViewData() {
    const [currentPrice, setcurrentPrice] = useState(1);
    const [previousPrice, setPreviousPrice] = useState(2);
    const [activeTab, setActiveTab] = useState(1);
    const [timePeriod, setTimePeriod] = useState(6);

    return (
        <div className={styles.viewData}>
            <div className={styles.currentPrice}>{currentPrice}<sup>USD</sup></div>
            <div className={styles.changeInPrice}>
                {
                    ((currentPrice-previousPrice)>=0 &&"+")
                    +(currentPrice - previousPrice)
                }
                ({(((currentPrice - previousPrice)/previousPrice)*100).toPrecision(5)}%)
            </div>   
            <div style={{width:'65%'}}>

                <Tabs styles={{
                        tabActive: { color: 'red' },
                    }} 
                    active={activeTab} onTabChange={setActiveTab} tabPadding="xl">
                    <Tabs.Tab label="Gallery">Gallery</Tabs.Tab>
                    <Tabs.Tab label="Chart">
                        <div className={styles.actions}>
                            <div className={styles.operations}>
                                <p className={styles.iconButton}>
                                    <span class="material-icons md-18">open_in_full</span>
                                    Full Screen
                                </p>
                                <p className={styles.iconButton}>
                                    <span class="material-icons md-18" >
                                    add_circle_outline
                                    </span>
                                    Compare
                                </p>
                            </div>
                            <div className={styles.time}>
                                <StyledTabs 
                                active={timePeriod} onTabChange={setTimePeriod}
                                
                                >
                                    <Tabs.Tab label="1d" ></Tabs.Tab>
                                    <Tabs.Tab label="3d"></Tabs.Tab>
                                    <Tabs.Tab label="1w"></Tabs.Tab>
                                    <Tabs.Tab label="1m" ></Tabs.Tab>
                                    <Tabs.Tab label="6m"></Tabs.Tab>
                                    <Tabs.Tab label="1y"></Tabs.Tab>
                                    <Tabs.Tab label="max"></Tabs.Tab>
                                </StyledTabs>                        
                            </div>
                        </div> 
                        <View setcurrentPrice={setcurrentPrice} setPreviousPrice={setPreviousPrice}
                        timePeriod={timePeriod}
                        /> 
                    </Tabs.Tab>
                    <Tabs.Tab label="Statistics">Statistics</Tabs.Tab>
                    <Tabs.Tab label="Analysis">Analysis</Tabs.Tab>
                    <Tabs.Tab label="Settings">Settings</Tabs.Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default ViewData


  
  

