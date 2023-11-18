// LandingChart.jsx
import React, { useEffect, useRef, memo } from 'react';

function HomeChart({range}) {
  const container = useRef();

  console.log(range, 'range111');

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    console.log(range, 'range');
    script.innerHTML = `
        {
          "symbols": [
            [
              "OANDA:XAUUSD|${range}"
            ]
          ],
          "chartOnly": true,
          "width": "100%",
          "height": "100%",
          "locale": "en",
          "colorTheme": "dark",
          "autosize": true,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": true,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "no",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "line",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "backgroundColor": "#1b1b1b",
          "lineWidth": 3,
          "lineType": 0,
          "dateRanges": [
            "ytd|1M",
            "12m|1M",
            "60m|6M",
            "all|1M"
          ],
          "color": "rgba(13, 196, 110, 1)"
        }`;
    container.current.appendChild(script);
  }, [range]);

  return (
    <div  className="tradingview-widget-container" ref={container}>
      <div
        className="tradingview-widget-container__widget"
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '16px',
          borderWidth: '0px !important',
        }}
      ></div>
    </div>
  );
}

export default memo(HomeChart);
