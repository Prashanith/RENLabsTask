import React, { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";

export default function View({setcurrentPrice,setPreviousPrice,timePeriod}) {
  const chartRef = useRef(null);
  const chart = useRef(null);
  const stock = useRef(true);
  const setIntervalID = useRef(null);
  const [cur,setCur] = useState("RealTime")
  const data = useRef([]);

  function randomData() {
    const now = new Date();
    return {
      name: now,
      value: [now, Math.floor(Math.random() * 20 + 15)],
    };
  }

  function randomValue() {
    return Math.floor(Math.random() * 20 + 15);
  }

  useEffect(() => {   
    setPeriodData(timePeriod);
  }, [timePeriod])
  

  useEffect(() => {
    chart.current = echarts.init(chartRef.current);
    data.current.push(randomData());

    let option = {
      legend: {
        bottom: 0,
      },
      tooltip: {
        trigger: "axis",
        formatter: "Time {mm}:{ss} ",
        axisPointer: {
          animation: true,
        },
      },
      xAxis: {
        axisTick: {
          show: false,
        },
        type: "time",
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          showSymbol: false,
          color: stock.current ? "#4B40EE": "#00000000",

          data: data.current,
          type: "line",
          smooth: true,
        },
      ],
    };
    setRealTimeData();
    chart.current.setOption(option);

    return () => clearInterval(setIntervalID.current);
  }, []);

  const setWeekData = () => {
    if (setIntervalID.current) {
      clearInterval(setIntervalID.current);
    }
    const d = [21, 20, 22, 19, 21, 22, 23];

    const dx = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
    chart.current.setOption({
      xAxis: {
        type: "category",
        data: dx,
      },
      series: [
        {
          animation:false,
          data: d,
          color: stock.current ? "#4B40EE" : "#00000000",
        },
      ],
    });
    setcurrentPrice(d[d.length-1]);
      setPreviousPrice(d[d.length-2]);
  };

  const setRealTimeData = () => {
    if (setIntervalID) {
      clearInterval(setIntervalID.current);
    }
    setIntervalID.current = setInterval(function () {
        let x = randomData()
      data.current.push(x);
      setcurrentPrice(x.value[1]);
      setPreviousPrice(data.current[data.current.length-2].value[1])

      chart.current.setOption({
        xAxis: {
          type: "time",
        },
        series: [
          {
            // showSymbol: false,
            color: stock.current ? "#4B40EE" : "#00000000",
            animation:true,

            data: data.current,
            type: "line",
            smooth: true,
          },
        ],
      });
    }, 2000);
  };

  const setOneDayData = () => {
    if (setIntervalID.current) {
      console.log("CHnage");
      clearInterval(setIntervalID.current);
    }
    let d = [];
    let d1 = [];
    for (let i = 0; i < 7; i++) {
      d.push(randomValue());
      d1.push(randomValue());
    }

    chart.current.setOption({
      xAxis: {
        type: "category",
        data: [
          "00:00AM",
          "04:00AM",
          "08:00AM",
          "12:00PM",
          "16:00PM",
          "20:00PM",
          "00:00AM",
        ],
      },
      series: [
        {
          data: d,
          color: stock.current ? "#4B40EE" : "#00000000",
        },
        
      ],
    });
    setcurrentPrice(d[d.length-1]);
      setPreviousPrice(d[d.length-2]);
  };

  const setThreeDayData = () => {
    if (setIntervalID.current) {
      clearInterval(setIntervalID.current);
    }
    let d = [];
    
    for (let i = 0; i < 7; i++) {
      d.push(randomValue());
     
    }

    chart.current.setOption({
      xAxis: {
        type: "category",
        data: [
          "Day 0",
          "Day 0.5",
          "Day 1",
          "Day 1.5",
          "Day 2",
          "Day 2.5",
          "Day 3"
        ],
      },
      series: [
        {
          data: d,
          color: stock.current ? "#4B40EE" : "#00000000",
        },
        
      ],
    });
    setcurrentPrice(d[d.length-1]);
    setPreviousPrice(d[d.length-2]);
  };

  const setYearlyData = () => {
    if (setIntervalID.current) {
      clearInterval(setIntervalID.current);
    }
    let d = [];
    let d1 = [];

    const months = new Array(12).fill(0).map((_, i) => {
      d.push(randomValue());
      setcurrentPrice(d[d.length-1]);
      setPreviousPrice(d[d.length-2]);
      d1.push(randomValue());

      return new Date(`${i + 1}/1`).toLocaleDateString(undefined, {
        month: "long",
      });
    });
    console.log(d);
    chart.current.setOption({
      xAxis: {
        axisLabel: {
          interval: 0,
          margin: 12,
        },
        type: "category",
        data: months,
      },
      series: [
        {
            data: d,
            color: stock.current ? "#4B40EE" : "#00000000",
        },
        
      ],
    });
    setcurrentPrice(d[d.length-1]);
      setPreviousPrice(d[d.length-2]);
  };

  const setMontlyData = () => {
    if (setIntervalID.current) {
      clearInterval(setIntervalID.current);
    }
    let d = [];
    let d1 = [];
    let d2 = [];
    const now = new Date();
    const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    for (let i = 0; i < days; i++) {
      d.push(randomValue());
      
      d1.push(randomValue());
      d2.push(i + 1 + " Day");
    }
    console.log(d);
    chart.current.setOption({
      xAxis: {
        type: "category",
        data: d2,
      },
      series: [
        {
          // animation:false,
          data: d,
          color: stock.current ? "#4B40EE":"#00000000",
        },
        
      ],
    });
    setcurrentPrice(d[d.length-1]);
      setPreviousPrice(d[d.length-2]);
  };

  const setPeriodData = (v)=>{
    const info = ["1 Day","3 Day","1 Week","1 Month","6 Month","1 Year","RealTime"];
    setCur(info[v])
    // if(!v) v = cur

    console.log(v,10101);
    if (v === 0) {
      console.log("Fuck");
      setOneDayData();
    } 
    else if(v===1){
      setThreeDayData();
    }
    else if (v ===2) {
      setWeekData();
    }
    else if(v===3) {
      setMontlyData();
    }
    else if(v=== 4) {
      setMontlyData();
    }
    else if (v === 5) {
      setYearlyData();
    } 
    else if(v === 6) {
      setRealTimeData();
    }       
  }

  return (
    <div style={{}}>
      {/* {timePeriod} */}
      <div id="chart" ref={chartRef} style={{height: 400 ,paddingInline:'0px', width:'100%'}}></div>
    </div>
  );
}