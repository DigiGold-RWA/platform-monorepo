"use client";

import React, { useEffect, useRef } from "react";
let tvScriptLoadingPromise;
const ExchangeChart = () => {
    // ExchangeChart.jsx

    const onLoadScriptRef = useRef();

    useEffect(() => {
        onLoadScriptRef.current = createWidget;

        if (!tvScriptLoadingPromise) {
            tvScriptLoadingPromise = new Promise((resolve) => {
                const script = document.createElement("script");
                script.id = "tradingview-widget-loading-script";
                script.src = "https://s3.tradingview.com/tv.js";
                script.type = "text/javascript";
                script.onload = resolve;

                document.head.appendChild(script);
            });
        }

        tvScriptLoadingPromise.then(
            () => onLoadScriptRef.current && onLoadScriptRef.current()
        );

        return () => (onLoadScriptRef.current = null);

        function createWidget() {
            if (
                document.getElementById("tradingview_ad54c") &&
                "TradingView" in window
            ) {
                new window.TradingView.widget({
                    autosize: true,
                    //   width: "980",
                    //   height: "610",
                    symbol: "OANDA:XAUUSD",
                    interval: "D",
                    timezone: "Etc/UTC",
                    theme: "dark",
                    style: "1",
                    locale: "en",
                    enable_publishing: false,
                    backgroundColor: "#141414",
                    hide_top_toolbar: true,
                    container_id: "tradingview_ad54c",
                });
            }
        }
    }, []);

    return (
        <div
            className="tradingview-widget-container"
            style={{ height: "100%", width: "100%" }}
        >
            <div
                id="tradingview_ad54c"
                style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "16px",
                    borderWidth: "0px !important",
                }}
            />
            {/* <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div> */}
        </div>
    );
};

export default ExchangeChart;
